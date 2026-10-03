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

export async function getFaqItems(): Promise<{ q: string; a: string }[]> {
  const items = await db.faqItem.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  if (items.length === 0) return FAQ_ITEMS;
  return items.map((i) => ({ q: i.question, a: i.answer }));
}
