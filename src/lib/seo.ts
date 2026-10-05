import { routing } from "@/i18n/routing";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hilfenetz.com").replace(/\/$/, "");

/** Canonical + hreflang pour une page localisée (path sans locale, ex. "/offres"). */
export function localeAlternates(locale: string, path = "") {
  const p = path === "/" ? "" : path;
  return {
    canonical: `${SITE_URL}/${locale}${p}`,
    languages: Object.fromEntries([
      ...routing.locales.map((l) => [l, `${SITE_URL}/${l}${p}`] as const),
      ["x-default", `${SITE_URL}/${routing.defaultLocale}${p}`] as const,
    ]),
  };
}
