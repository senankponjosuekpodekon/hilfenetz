import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { db } from "@/lib/db";
import { SITE_URL, localeAlternates } from "@/lib/seo";

const STATIC_PATHS = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/offres", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/demande", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/comment-ca-marche", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/a-propos", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/signaler", priority: 0.4, changeFrequency: "yearly" as const },
  { path: "/conditions", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/confidentialite", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
      alternates: { languages: localeAlternates(locale, path).languages },
    }))
  );

  const offers = await db.donationOffer.findMany({
    where: { status: "PUBLISHED" },
    select: { id: true, updatedAt: true },
    orderBy: { publishedAt: "desc" },
    take: 500,
  });

  for (const offer of offers) {
    for (const locale of routing.locales) {
      const path = `/offres/${offer.id}`;
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        lastModified: offer.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: { languages: localeAlternates(locale, path).languages },
      });
    }
  }

  return entries;
}
