import { z } from "zod";

export const supportRequestSchema = z.object({
  firstName: z.string().trim().min(1, "Ce champ est obligatoire.").max(80),
  lastName: z.string().trim().min(1, "Ce champ est obligatoire.").max(80),
  email: z.string().trim().email("Adresse e-mail invalide.").max(160),
  phone: z.string().trim().min(6, "Numéro invalide.").max(30),
  country: z.string().trim().min(1, "Ce champ est obligatoire.").max(80),
  projectDescription: z
    .string()
    .trim()
    .min(50, "Décrivez votre situation en au moins 50 caractères.")
    .max(2000, "Maximum 2 000 caractères."),
  donorMessage: z.string().trim().max(2000, "Maximum 2 000 caractères.").optional(),
  offerId: z.string().trim().optional(),
  confirmAccuracy: z
    .boolean()
    .refine((v) => v === true, "Vous devez confirmer l'exactitude des informations."),
  acceptProcessing: z
    .boolean()
    .refine((v) => v === true, "Vous devez accepter le traitement de vos informations."),
  website: z.string().max(0).optional().or(z.literal("")),
});

export const reportSchema = z.object({
  offerName: z.string().trim().min(1, "Ce champ est obligatoire.").max(200),
  offerUrl: z.string().trim().min(1, "Ce champ est obligatoire.").max(500),
  reason: z.enum([
    "MISLEADING_INFO",
    "PAYMENT_REQUEST",
    "SUSPICIOUS_BEHAVIOR",
    "SUSPECTED_FRAUD",
    "OTHER",
  ]),
  description: z.string().trim().min(10, "Décrivez le problème.").max(2000),
  email: z.string().trim().email("Adresse e-mail invalide.").max(160),
  website: z.string().max(0).optional().or(z.literal("")),
});

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Ce champ est obligatoire.").max(120),
  email: z.string().trim().email("Adresse e-mail invalide.").max(160),
  subject: z.string().trim().min(1, "Ce champ est obligatoire.").max(200),
  message: z.string().trim().min(10, "Rédigez un message.").max(2000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export const offerSchema = z.object({
  title: z.string().trim().min(1, "Ce champ est obligatoire.").max(200),
  description: z.string().trim().min(10, "Décrivez l'offre.").max(5000),
  donorMessage: z.string().trim().max(2000).optional(),
  amount: z.coerce.number().positive("Montant invalide.").max(10_000_000),
  currency: z.enum(["EUR", "USD", "CHF", "GBP"]),
  category: z.enum(["SOCIAL", "PROFESSIONAL", "COMMUNITY"]),
  criteria: z.string().trim().max(2000).optional(),
  status: z.enum(["DRAFT", "PENDING_REVIEW", "PUBLISHED", "SUSPENDED", "CLOSED", "ARCHIVED"]),
});

export type SupportRequestInput = z.infer<typeof supportRequestSchema>;
export type ReportInput = z.infer<typeof reportSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type OfferInput = z.infer<typeof offerSchema>;
