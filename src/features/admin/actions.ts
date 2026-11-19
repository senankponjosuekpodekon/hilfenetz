"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { OfferStatus, ReportStatus, RequestStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { createSession, destroySession, requireAdmin, verifyPassword } from "@/lib/auth";
import { offerSchema, OFFER_LOCALES } from "@/lib/validation";
import { DEMO_OFFERS } from "@/lib/demo-offers";
import { isValidImageFile, removeImageFile, saveImageFile } from "@/lib/uploads";

export type LoginState = { status: "idle" | "error"; message?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const headersList = await headers();
  if (!rateLimit(clientKey(headersList, "login"), 5, 60_000)) {
    return { status: "error", message: "Trop de tentatives. Réessayez plus tard." };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const user = await db.user.findUnique({ where: { email } });
  if (!user || user.role !== "ADMIN" || !verifyPassword(password, user.passwordHash)) {
    return { status: "error", message: "Identifiants incorrects." };
  }

  await createSession(user.email);
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/connexion");
}

export async function saveOffer(_prev: unknown, formData: FormData): Promise<{ status: string; errors?: Record<string, string[]> }> {
  await requireAdmin();

  const parsed = offerSchema.safeParse({
    locale: formData.get("locale"),
    title: formData.get("title"),
    donorName: formData.get("donorName") || undefined,
    description: formData.get("description"),
    donorMessage: formData.get("donorMessage") || undefined,
    donorEmail: formData.get("donorEmail") || undefined,
    donorPhone: formData.get("donorPhone") || undefined,
    amount: formData.get("amount"),
    currency: formData.get("currency"),
    category: formData.get("category"),
    criteria: formData.get("criteria") || undefined,
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return { status: "error", errors: parsed.error.flatten().fieldErrors };
  }

  const id = String(formData.get("id") ?? "");

  const donorPhoto = formData.get("donorPhoto");
  const invalidPhoto = donorPhoto instanceof File && donorPhoto.size > 0 && !isValidImageFile(donorPhoto);
  if (invalidPhoto) {
    return { status: "error", errors: { donorPhoto: ["Image invalide (JPEG, PNG, WebP ou AVIF, 5 Mo max)."] } };
  }

  const images = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (images.some((f) => !isValidImageFile(f))) {
    return { status: "error", errors: { images: ["Chaque image doit être en JPEG, PNG, WebP ou AVIF, 5 Mo max."] } };
  }

  let donorPhotoUrl: string | undefined;
  if (donorPhoto instanceof File && donorPhoto.size > 0) {
    const saved = await saveImageFile(donorPhoto);
    if (!saved) {
      return { status: "error", errors: { donorPhoto: ["Impossible d'enregistrer la photo."] } };
    }
    donorPhotoUrl = saved;
  }

  const data = {
    ...parsed.data,
    ...(donorPhotoUrl ? { donorPhotoUrl } : {}),
    publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
  };

  let offerId = id;
  let previousPhotoUrl: string | null = null;
  if (id) {
    const existing = await db.donationOffer.findUnique({ where: { id }, select: { donorPhotoUrl: true } });
    previousPhotoUrl = existing?.donorPhotoUrl ?? null;
    await db.donationOffer.update({ where: { id }, data });
  } else {
    const created = await db.donationOffer.create({ data });
    offerId = created.id;
  }

  if (donorPhotoUrl && previousPhotoUrl && previousPhotoUrl !== donorPhotoUrl) {
    await removeImageFile(previousPhotoUrl);
  }

  if (images.length > 0) {
    const maxPosition = await db.offerImage.aggregate({ where: { offerId }, _max: { position: true } });
    let position = (maxPosition._max.position ?? -1) + 1;
    for (const file of images.slice(0, 10)) {
      const url = await saveImageFile(file);
      if (!url) {
        return { status: "error", errors: { images: ["Impossible d'enregistrer une image. L'offre a été enregistrée."] } };
      }
      await db.offerImage.create({ data: { offerId, url, position: position++ } });
    }
  }

  revalidatePath("/admin/offres");
  revalidatePath("/[locale]/offres", "page");
  revalidatePath(`/[locale]/offres/${offerId}`, "page");
  return { status: "success" };
}

export async function deleteOfferImage(imageId: string): Promise<void> {
  await requireAdmin();
  const image = await db.offerImage.delete({ where: { id: imageId } });
  await removeImageFile(image.url);
  revalidatePath("/admin/offres");
  revalidatePath(`/[locale]/offres/${image.offerId}`, "page");
}

export async function setOfferStatus(id: string, status: OfferStatus): Promise<void> {
  await requireAdmin();
  await db.donationOffer.update({
    where: { id },
    data: { status, publishedAt: status === "PUBLISHED" ? new Date() : undefined },
  });
  revalidatePath("/admin/offres");
  revalidatePath("/[locale]/offres", "page");
}

export async function setRequestStatus(id: string, status: RequestStatus, internalNote?: string): Promise<void> {
  await requireAdmin();
  await db.supportRequest.update({
    where: { id },
    data: { status, ...(internalNote !== undefined ? { internalNote } : {}) },
  });
  revalidatePath("/admin/demandes");
}

export async function setReportStatus(id: string, status: ReportStatus): Promise<void> {
  await requireAdmin();
  await db.report.update({
    where: { id },
    data: { status, resolvedAt: status === "RESOLVED" || status === "REJECTED" ? new Date() : null },
  });
  revalidatePath("/admin/signalements");
}

export async function saveSettings(_prev: unknown, formData: FormData): Promise<{ status: string }> {
  await requireAdmin();
  const entries: [string, string][] = [
    ["contactEmail", String(formData.get("contactEmail") ?? "").trim()],
    ["contactPhone", String(formData.get("contactPhone") ?? "").trim()],
  ];
  for (const [key, value] of entries) {
    await db.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
  revalidatePath("/[locale]/contact", "page");
  revalidatePath("/admin/parametres");
  return { status: "success" };
}

export async function saveFaqItem(_prev: unknown, formData: FormData): Promise<{ status: string; errors?: Record<string, string[]> }> {
  await requireAdmin();
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  const order = Number(formData.get("order") ?? 0);
  const published = formData.get("published") === "on";
  const id = String(formData.get("id") ?? "");
  const localeRaw = String(formData.get("locale") ?? "fr");
  const locale = OFFER_LOCALES.includes(localeRaw as (typeof OFFER_LOCALES)[number]) ? localeRaw : "fr";

  const errors: Record<string, string[]> = {};
  if (!question) errors.question = ["Ce champ est obligatoire."];
  if (!answer) errors.answer = ["Ce champ est obligatoire."];
  if (Object.keys(errors).length > 0) return { status: "error", errors };

  if (id) {
    await db.faqItem.update({ where: { id }, data: { question, answer, order, published, locale } });
  } else {
    await db.faqItem.create({ data: { question, answer, order, published, locale } });
  }
  revalidatePath("/[locale]/faq", "page");
  revalidatePath("/[locale]", "page");
  revalidatePath("/admin/faq");
  return { status: "success" };
}

export async function seedDemoOffers(): Promise<{ created: number }> {
  await requireAdmin();
  let created = 0;
  for (const locale of OFFER_LOCALES) {
    const count = await db.donationOffer.count({ where: { locale } });
    if (count > 0) continue;
    const data = DEMO_OFFERS.filter((o) => o.locale === locale);
    if (data.length > 0) {
      await db.donationOffer.createMany({ data });
      created += data.length;
    }
  }
  revalidatePath("/admin/offres");
  revalidatePath("/[locale]/offres", "page");
  return { created };
}

export async function deleteFaqItem(id: string): Promise<void> {
  await requireAdmin();
  await db.faqItem.delete({ where: { id } });
  revalidatePath("/[locale]/faq", "page");
  revalidatePath("/[locale]", "page");
  revalidatePath("/admin/faq");
}

export async function deleteOffer(id: string): Promise<void> {
  await requireAdmin();
  const offer = await db.donationOffer.delete({ where: { id }, include: { images: true } });
  if (offer.donorPhotoUrl) await removeImageFile(offer.donorPhotoUrl);
  for (const image of offer.images) {
    await removeImageFile(image.url);
  }
  revalidatePath("/admin/offres");
  revalidatePath("/[locale]/offres", "page");
}

export async function deleteSupportRequest(id: string): Promise<void> {
  await requireAdmin();
  await db.supportRequest.delete({ where: { id } });
  revalidatePath("/admin/demandes");
}

export async function deleteReport(id: string): Promise<void> {
  await requireAdmin();
  await db.report.delete({ where: { id } });
  revalidatePath("/admin/signalements");
}

export async function deleteContactMessage(id: string): Promise<void> {
  await requireAdmin();
  await db.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
