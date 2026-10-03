"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import type { OfferStatus, ProposalStatus, ReportStatus, RequestStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { createSession, destroySession, requireAdmin, verifyPassword } from "@/lib/auth";
import { offerSchema } from "@/lib/validation";

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
    title: formData.get("title"),
    description: formData.get("description"),
    donorMessage: formData.get("donorMessage") || undefined,
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
  const data = {
    ...parsed.data,
    publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null,
  };

  if (id) {
    await db.donationOffer.update({ where: { id }, data });
  } else {
    await db.donationOffer.create({ data });
  }

  revalidatePath("/admin/offres");
  revalidatePath("/offres");
  return { status: "success" };
}

export async function setOfferStatus(id: string, status: OfferStatus): Promise<void> {
  await requireAdmin();
  await db.donationOffer.update({
    where: { id },
    data: { status, publishedAt: status === "PUBLISHED" ? new Date() : undefined },
  });
  revalidatePath("/admin/offres");
  revalidatePath("/offres");
}

export async function setRequestStatus(id: string, status: RequestStatus, internalNote?: string): Promise<void> {
  await requireAdmin();
  await db.supportRequest.update({
    where: { id },
    data: { status, ...(internalNote !== undefined ? { internalNote } : {}) },
  });
  revalidatePath("/admin/demandes");
}

export async function setProposalStatus(id: string, status: ProposalStatus): Promise<void> {
  await requireAdmin();
  await db.donationProposal.update({ where: { id }, data: { status } });
  revalidatePath("/admin/propositions");
}

export async function setReportStatus(id: string, status: ReportStatus): Promise<void> {
  await requireAdmin();
  await db.report.update({
    where: { id },
    data: { status, resolvedAt: status === "RESOLVED" || status === "REJECTED" ? new Date() : null },
  });
  revalidatePath("/admin/signalements");
}
