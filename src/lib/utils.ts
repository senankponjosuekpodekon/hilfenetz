const LOCALE_TAGS: Record<string, string> = {
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
  es: "es-ES",
  pt: "pt-PT",
};

export function intlTag(locale: string): string {
  return LOCALE_TAGS[locale] ?? "de-DE";
}

export function formatAmount(amount: number | string, currency = "EUR", locale = "de"): string {
  return new Intl.NumberFormat(intlTag(locale), {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount));
}

export function formatDate(date: Date | string | null | undefined, locale = "de"): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat(intlTag(locale), {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export const LOCALE_LABELS: Record<string, string> = {
  de: "Allemand",
  fr: "Français",
  it: "Italien",
  es: "Espagnol",
  pt: "Portugais",
};

export const CATEGORY_LABELS: Record<string, string> = {
  SOCIAL: "Social",
  PROFESSIONAL: "Professionnel",
  COMMUNITY: "Communautaire",
};

export const OFFER_STATUS_LABELS: Record<string, string> = {
  DRAFT: "Brouillon",
  PENDING_REVIEW: "En attente",
  PUBLISHED: "Publiée",
  SUSPENDED: "Suspendue",
  CLOSED: "Clôturée",
  ARCHIVED: "Archivée",
};

export const REQUEST_STATUS_LABELS: Record<string, string> = {
  RECEIVED: "Reçue",
  UNDER_REVIEW: "En examen",
  VALIDATED: "Validée",
  PRESENTED: "Présentée",
  MATCHED: "Mise en relation",
  CLOSED: "Clôturée",
  REJECTED: "Refusée",
};

export const PROPOSAL_STATUS_LABELS: Record<string, string> = {
  NEW: "Nouvelle",
  UNDER_REVIEW: "En examen",
  PROCESSED: "Traitée",
  REJECTED: "Rejetée",
};

export const REPORT_STATUS_LABELS: Record<string, string> = {
  NEW: "Nouveau",
  UNDER_REVIEW: "En examen",
  RESOLVED: "Traité",
  REJECTED: "Rejeté",
};

export const REPORT_REASON_LABELS: Record<string, string> = {
  MISLEADING_INFO: "Informations trompeuses",
  PAYMENT_REQUEST: "Demande de paiement",
  SUSPICIOUS_BEHAVIOR: "Comportement suspect",
  SUSPECTED_FRAUD: "Fraude présumée",
  OTHER: "Autre",
};

export function generateReference(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `HN-${year}-${rand}`;
}
