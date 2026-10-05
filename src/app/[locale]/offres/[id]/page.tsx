import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { db } from "@/lib/db";
import { localeAlternates } from "@/lib/seo";
import { Container, Alert } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatAmount, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const offer = await db.donationOffer.findUnique({ where: { id } });
  const t = await getTranslations("offerDetail");
  if (!offer) return { title: t("notFound"), robots: { index: false } };
  const locale = await getLocale();
  return {
    title: offer.title,
    description: offer.description.slice(0, 160),
    alternates: localeAlternates(locale, `/offres/${id}`),
  };
}

export default async function OfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await getTranslations("offerDetail");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const offer = await db.donationOffer.findUnique({ where: { id } });
  if (!offer || offer.status !== "PUBLISHED") notFound();

  const criteria = [
    { label: t("criteria.type"), value: t("criteria.typeValue") },
    { label: t("criteria.domain"), value: tc(`categories.${offer.category}`) },
    { label: t("criteria.amount"), value: formatAmount(Number(offer.amount), offer.currency, locale) },
    { label: t("criteria.decision"), value: t("criteria.decisionValue") },
    { label: t("criteria.published"), value: formatDate(offer.publishedAt, locale) },
  ];

  return (
    <div className="py-10 pb-28 md:py-16 md:pb-16">
      <Container className="max-w-3xl">
        <Link href="/offres" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-navy">
          <ArrowLeft className="size-4" aria-hidden />
          {tc("backToOffers")}
        </Link>

        <div className="mt-8">
          <Badge tone="accent">{tc("offerBadge")}</Badge>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">{offer.title}</h1>
          <p className="mt-3 text-lg text-muted">{tc("offerSubtitle")}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-sm text-muted">
              {tc("donor")} : <span className="font-medium text-ink">{offer.donorName || tc("anonymous")}</span>
            </p>
            <Badge tone="positive">
              <Check className="size-3.5" aria-hidden />
              {t("available")}
            </Badge>
          </div>
          <div className="mt-6 rounded-[var(--radius-card)] border border-violet/20 bg-violet-soft/50 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{tc("amountProposed")}</p>
            <p className="mt-1 font-display text-4xl font-semibold tracking-tight text-violet">
              {formatAmount(Number(offer.amount), offer.currency, locale)}
            </p>
          </div>
        </div>

        <p className="mt-8 text-base leading-relaxed text-ink/90">{offer.description}</p>

        <blockquote className="mt-8 rounded-2xl border-l-4 border-trust bg-surface p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">{t("donorMessageLabel")}</p>
          <p className="mt-3 text-base leading-relaxed text-ink/90">
            {offer.donorMessage || tc("donorMessageDefault")}
          </p>
        </blockquote>

        <dl className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
          {criteria.map((item) => (
            <div key={item.label} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="text-sm font-medium text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        {offer.criteria ? (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-navy">{t("criteriaTitle")}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{offer.criteria}</p>
          </div>
        ) : null}

        <div className="mt-8">
          <Alert tone="warning">
            <strong>{t("warningStrong")}</strong>
            <br />
            {t("warningBody")}
          </Alert>
        </div>

        <div className="mt-10 hidden md:block">
          <Button href={`/demande?offre=${offer.id}`} size="lg" arrow>
            {tc("submitRequest")}
          </Button>
        </div>
      </Container>

      {/* CTA sticky mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 p-4 backdrop-blur md:hidden">
        <Button href={`/demande?offre=${offer.id}`} className="w-full" size="lg">
          {tc("submitRequest")}
        </Button>
      </div>
    </div>
  );
}
