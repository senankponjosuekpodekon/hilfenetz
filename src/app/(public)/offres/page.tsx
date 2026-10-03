import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Category, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { OfferCard } from "@/components/offers/offer-card";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Offres de dons",
  description:
    "Parcourez les propositions de don publiées sur HilfeNetz et vérifiez les critères avant de présenter votre demande.",
};

const AMOUNT_RANGES: Record<string, { gte?: number; lt?: number; label: string }> = {
  all: { label: "Tous" },
  low: { lt: 1000, label: "Moins de 1 000 €" },
  mid: { gte: 1000, lt: 5000, label: "1 000 – 5 000 €" },
  high: { gte: 5000, lt: 10000, label: "5 000 – 10 000 €" },
  max: { gte: 10000, label: "Plus de 10 000 €" },
};

const CATEGORIES = [
  { value: "all", label: "Tous" },
  { value: "SOCIAL", label: "Social" },
  { value: "PROFESSIONAL", label: "Professionnel" },
  { value: "COMMUNITY", label: "Communautaire" },
];

export default async function OffersPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const category = typeof params.category === "string" ? params.category : "all";
  const amount = typeof params.amount === "string" ? params.amount : "all";

  const where: Prisma.DonationOfferWhereInput = { status: "PUBLISHED" };
  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }
  if (category !== "all") where.category = category as Category;
  const range = AMOUNT_RANGES[amount];
  if (range && (range.gte || range.lt)) {
    where.amount = { gte: range.gte, lt: range.lt };
  }

  const offers = await db.donationOffer.findMany({
    where,
    orderBy: { publishedAt: "desc" },
  });

  const buildHref = (next: Record<string, string>) => {
    const sp = new URLSearchParams({ q, category, amount, ...next });
    if (!sp.get("q")) sp.delete("q");
    for (const key of ["category", "amount"]) {
      if (sp.get(key) === "all") sp.delete(key);
    }
    const qs = sp.toString();
    return `/offres${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="py-14 md:py-20">
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-navy md:text-5xl">
            Découvrez les offres de soutien
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Parcourez les propositions de don publiées sur HilfeNetz et vérifiez les critères avant
            de présenter votre demande.
          </p>
        </div>

        {/* Recherche */}
        <form action="/offres" method="get" className="mt-10 flex gap-3">
          {category !== "all" ? <input type="hidden" name="category" value={category} /> : null}
          {amount !== "all" ? <input type="hidden" name="amount" value={amount} /> : null}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" aria-hidden />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Rechercher une offre…"
              className="h-12 w-full rounded-[10px] border border-border bg-surface pl-11 pr-4 text-sm focus:border-trust focus:outline-2 focus:outline-trust/20"
            />
          </div>
          <Button type="submit" size="lg">Rechercher</Button>
        </form>

        {/* Filtres */}
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Domaine</span>
            {CATEGORIES.map((c) => (
              <Link
                key={c.value}
                href={buildHref({ category: c.value })}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  category === c.value
                    ? "border-trust bg-trust text-white"
                    : "border-border bg-surface text-muted hover:border-trust hover:text-trust"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted">Montant</span>
            {Object.entries(AMOUNT_RANGES).map(([value, r]) => (
              <Link
                key={value}
                href={buildHref({ amount: value })}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  amount === value
                    ? "border-trust bg-trust text-white"
                    : "border-border bg-surface text-muted hover:border-trust hover:text-trust"
                }`}
              >
                {r.label}
              </Link>
            ))}
          </div>
          {q || category !== "all" || amount !== "all" ? (
            <Link href="/offres" className="text-sm font-medium text-trust hover:underline">
              Réinitialiser
            </Link>
          ) : null}
        </div>

        {/* Résultats */}
        {offers.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-border bg-surface p-12 text-center">
            <h2 className="text-lg font-semibold text-navy">Aucune offre disponible pour le moment.</h2>
            <p className="mt-2 text-sm text-muted">
              Revenez prochainement pour découvrir les nouvelles propositions de soutien.
            </p>
            <Button href="/offres" variant="secondary" className="mt-6">
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
