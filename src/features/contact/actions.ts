"use server";

import { headers } from "next/headers";
import { db } from "@/lib/db";
import { notifyAdmin } from "@/lib/email";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { contactSchema } from "@/lib/validation";
import type { FormState } from "@/features/requests/actions";

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const headersList = await headers();
  if (!rateLimit(clientKey(headersList, "contact"), 5, 60_000)) {
    return { status: "error", message: "Trop de tentatives. Veuillez réessayer dans un instant." };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return { status: "error", errors: parsed.error.flatten().fieldErrors };
  }

  if (parsed.data.website) {
    return { status: "success" };
  }

  const { website: _w, ...data } = parsed.data;
  await db.contactMessage.create({ data });

  await notifyAdmin(`Message de contact — ${data.subject}`, [
    ["Nom", data.name],
    ["E-mail", data.email],
    ["Sujet", data.subject],
    ["Message", data.message],
  ]);

  return { status: "success" };
}
