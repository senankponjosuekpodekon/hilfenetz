"use server";

import { headers } from "next/headers";
import { db } from "@/lib/db";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { donationProposalSchema } from "@/lib/validation";
import type { FormState } from "@/features/requests/actions";

export async function submitDonationProposal(_prev: FormState, formData: FormData): Promise<FormState> {
  const headersList = await headers();
  if (!rateLimit(clientKey(headersList, "proposal"), 5, 60_000)) {
    return { status: "error", message: "Trop de tentatives. Veuillez réessayer dans un instant." };
  }

  const parsed = donationProposalSchema.safeParse({
    name: formData.get("name"),
    organization: formData.get("organization") || undefined,
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    amount: formData.get("amount"),
    currency: formData.get("currency"),
    supportType: formData.get("supportType"),
    criteria: formData.get("criteria"),
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
  await db.donationProposal.create({ data });

  return { status: "success" };
}
