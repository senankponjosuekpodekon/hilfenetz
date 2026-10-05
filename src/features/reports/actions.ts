"use server";

import { headers } from "next/headers";
import { db } from "@/lib/db";
import { notifyAdmin } from "@/lib/email";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { reportSchema } from "@/lib/validation";
import type { FormState } from "@/features/requests/actions";

export async function submitReport(_prev: FormState, formData: FormData): Promise<FormState> {
  const headersList = await headers();
  if (!rateLimit(clientKey(headersList, "report"), 5, 60_000)) {
    return { status: "error", message: "Trop de tentatives. Veuillez réessayer dans un instant." };
  }

  const parsed = reportSchema.safeParse({
    offerName: formData.get("offerName"),
    offerUrl: formData.get("offerUrl"),
    reason: formData.get("reason"),
    description: formData.get("description"),
    email: formData.get("email"),
    website: formData.get("website") || "",
  });

  if (!parsed.success) {
    return { status: "error", errors: parsed.error.flatten().fieldErrors };
  }

  if (parsed.data.website) {
    return { status: "success" };
  }

  const { website: _w, ...data } = parsed.data;
  await db.report.create({ data });

  await notifyAdmin(`Nouveau signalement — ${data.offerName}`, [
    ["Annonce", data.offerName],
    ["Lien", data.offerUrl],
    ["Motif", data.reason],
    ["Description", data.description],
    ["Signalé par", data.email],
  ], data.email);

  return { status: "success" };
}
