"use server";

import { headers } from "next/headers";
import { db } from "@/lib/db";
import { notifyAdmin, notifyUserConfirmation } from "@/lib/email";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { generateReference } from "@/lib/utils";
import { supportRequestSchema } from "@/lib/validation";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  reference?: string;
  errors?: Record<string, string[]>;
};

export async function submitSupportRequest(_prev: FormState, formData: FormData): Promise<FormState> {
  const headersList = await headers();
  if (!rateLimit(clientKey(headersList, "request"), 5, 60_000)) {
    return { status: "error", message: "Trop de tentatives. Veuillez réessayer dans un instant." };
  }

  const parsed = supportRequestSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    projectDescription: formData.get("projectDescription"),
    donorMessage: formData.get("donorMessage") || undefined,
    offerId: formData.get("offerId") || undefined,
    confirmAccuracy: formData.get("confirmAccuracy") === "on",
    acceptProcessing: formData.get("acceptProcessing") === "on",
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return { status: "error", errors: parsed.error.flatten().fieldErrors };
  }

  // Honeypot rempli : on simule un succès sans enregistrer.
  if (parsed.data.website) {
    return { status: "success", reference: generateReference() };
  }

  const { confirmAccuracy: _c, acceptProcessing: _a, website: _w, ...data } = parsed.data;
  const reference = generateReference();

  await db.supportRequest.create({ data: { ...data, reference } });

  await notifyAdmin(`Nouvelle demande reçue — ${reference}`, [
    ["Référence", reference],
    ["Nom", `${data.firstName} ${data.lastName}`],
    ["E-mail", data.email],
    ["Téléphone", data.phone],
    ["Pays", data.country],
    ["Offre liée", data.offerId ?? "—"],
    ["Situation / projet", data.projectDescription],
    ["Message au donateur", data.donorMessage || "—"],
  ]);

  const locale = String(formData.get("locale") ?? "de");
  await notifyUserConfirmation(data.email, locale, reference);

  return { status: "success", reference };
}
