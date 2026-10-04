import { db } from "./db";
import { FAQ_ITEMS } from "./faq-data";

export async function getSiteSettings(): Promise<{ contactEmail: string; contactPhone: string }> {
  const rows = await db.siteSetting.findMany({
    where: { key: { in: ["contactEmail", "contactPhone"] } },
  });
  const map = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return {
    contactEmail: map.contactEmail || "contact@hilfenetz.example",
    contactPhone: map.contactPhone || "",
  };
}

export async function getFaqItems(locale = "de"): Promise<{ q: string; a: string }[]> {
  const items = await db.faqItem.findMany({
    where: { published: true, locale: { in: [locale, "fr"] } },
    orderBy: { order: "asc" },
  });
  const localized = items.filter((i) => i.locale === locale);
  const source = localized.length > 0 ? localized : items.filter((i) => i.locale === "fr");
  if (source.length === 0) return FAQ_ITEMS;
  return source.map((i) => ({ q: i.question, a: i.answer }));
}
