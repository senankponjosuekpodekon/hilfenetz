import type { Metadata } from "next";
import { Search } from "lucide-react";
import type { Category, Prisma } from "@prisma/client";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { db } from "@/lib/db";
import { localeAlternates } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { OfferCard } from "@/components/offers/offer-card";
import { Reveal } from "@/components/ui/reveal";
import { FilterSheet } from "@/components/offers/filter-sheet";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale();
  return { title: t("offers"), description: t("offersDesc") , alternates: localeAlternates(locale, "/offres") };
}

const AMOUNT_RANGES: Record<string, { gte?: number; lt?: number }> = {
  all: {},
  low: { lt: 1000 },
  mid: { gte: 1000, lt: 5000 },
  high: { gte: 5000, lt: 10000 },
  max: { gte: 10000 },
};

const CATEGORIES = ["SOCIAL", "PROFESSIONAL", "COMMUNITY"] as const;

export default async function OffersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const t = await getTranslations("offers");
  const tc = await getTranslations("common");
  const locale = await getLocale();

  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const validCategories = new Set<string>(CATEGORIES);
  const categories = (typeof params.category === "string" ? params.category : "")
    .split(",")
    .filter((c): c is Category => validCategories.has(c));
  const amount = typeof params.amount === "string" ? params.amount : "all";

  const where: Prisma.DonationOfferWhereInput = { status: "PUBLISHED" };
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }
  if (categories.length > 0) where.category = { in: categories };
  const range = AMOUNT_RANGES[amount];
  if (range && (range.gte || range.lt)) {
    where.amount = { gte: range.gte, lt: range.lt };
  }

  let offers = await db.donationOffer.findMany({
    where: { ...where, locale },
    orderBy: { publishedAt: "desc" },
  });
  // Aucune offre dans la langue courante : on affiche toutes les langues
  // plutôt qu'une vitrine vide.
  if (offers.length === 0) {
    offers = await db.donationOffer.findMany({ where, orderBy: { publishedAt: "desc" } });
  }

  const buildHref = (next: Record<string, string>) => {
    const sp = new URLSearchParams({ q, category: categories.join(","), amount, ...next });
    if (!sp.get("q")) sp.delete("q");
    if (!sp.get("category")) sp.delete("category");
    if (sp.get("amount") === "all") sp.delete("amount");
    const qs = sp.toString();
    return `/offres${qs ? `?${qs}` : ""}`;
  };

  const toggleCategory = (value: Category) => {
    const next = categories.includes(value)
      ? categories.filter((c) => c !== value)
      : [...categories, value];
    return buildHref({ category: next.join(",") });
  };

  const pill = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
      active
        ? "border-trust bg-trust text-white"
        : "border-border bg-surface text-muted hover:border-trust hover:text-trust"
    }`;

  return (
    <div className="py-14 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{t("sub")}</p>
        </div>

        {/* Recherche */}
        <form action={buildHref({})} method="get" className="mt-10 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder={t("searchPlaceholder")}
              className="h-12 w-full rounded-[10px] border border-border bg-surface pl-11 pr-4 text-sm focus:border-trust focus:outline-2 focus:outline-trust/20"
            />
          </div>
          <Button type="submit" size="lg">{t("search")}</Button>
        </form>

        {/* Filtres — bottom sheet sur mobile */}
        <div className="mt-4 md:hidden">
          <FilterSheet q={q} categories={categories} amount={amount} />
        </div>

        {/* Filtres — pills sur desktop */}
        <div className="mt-6 hidden flex-wrap items-center gap-x-8 gap-y-4 md:flex">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">{t("domain")}</span>
            <Link href={buildHref({ category: "" })} className={pill(categories.length === 0)}>
              {t("all")}
            </Link>
            {CATEGORIES.map((c) => (
              <Link key={c} href={toggleCategory(c)} className={pill(categories.includes(c))}>
                {tc(`categories.${c}`)}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">{t("amount")}</span>
            {Object.keys(AMOUNT_RANGES).map((value) => (
              <Link
                key={value}
                href={buildHref({ amount: value })}
                className={pill(amount === value)}
              >
                {value === "all" ? t("all") : t(`amounts.${value}`)}
              </Link>
            ))}
          </div>
          {q || categories.length > 0 || amount !== "all" ? (
            <Link href="/offres" className="text-sm font-medium text-trust hover:underline">
              {t("reset")}
            </Link>
          ) : null}
        </div>

        {/* Résultats */}
        {offers.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer, i) => (
              <Reveal key={offer.id} delay={Math.min(i, 8) * 60}>
                <OfferCard offer={offer} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
            <h2 className="text-lg font-semibold text-navy">{t("emptyTitle")}</h2>
            <p className="mt-2 text-sm text-muted">{t("emptyDesc")}</p>
            <Button href="/offres" variant="secondary" className="mt-6">
              {t("emptyReset")}
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
