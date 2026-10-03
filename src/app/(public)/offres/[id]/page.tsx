import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { db } from "@/lib/db";
import { Container, Alert } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS, formatAmount, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const offer = await db.donationOffer.findUnique({ where: { id } });
  if (!offer) return { title: "Offre introuvable" };
  return { title: offer.title, description: offer.description.slice(0, 160) };
}

export default async function OfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offer = await db.donationOffer.findUnique({ where: { id } });
  if (!offer || offer.status !== "PUBLISHED") notFound();

  const criteria = [
    { label: "Type de soutien", value: "Projet / Initiative / Situation" },
    { label: "Domaine", value: CATEGORY_LABELS[offer.category] ?? offer.category },
    { label: "Montant proposé", value: formatAmount(Number(offer.amount), offer.currency) },
    { label: "Décision", value: "Donateur" },
    { label: "Publié le", value: formatDate(offer.publishedAt) },
  ];

  return (
    <div className="py-10 pb-28 md:py-16 md:pb-16">
      <Container className="max-w-3xl">
        <Link href="/offres" className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-navy">
          <ArrowLeft className="size-4" aria-hidden />
          Retour aux offres
        </Link>

        <div className="mt-8">
          <Badge tone="navy">Offre de don</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-navy md:text-4xl">{offer.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <p className="text-4xl font-semibold tracking-tight text-ink">
              {formatAmount(Number(offer.amount), offer.currency)}
            </p>
            <Badge tone="positive">
              <Check className="size-3.5" aria-hidden />
              Offre actuellement disponible
            </Badge>
          </div>
        </div>

        <p className="mt-8 text-base leading-relaxed text-ink/90">{offer.description}</p>

        {offer.donorMessage ? (
          <blockquote className="mt-8 rounded-2xl border border-border bg-surface p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">Message du donateur</p>
            <p className="mt-3 text-base leading-relaxed text-ink/90">{offer.donorMessage}</p>
          </blockquote>
        ) : null}

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
            <h2 className="text-lg font-semibold text-navy">Critères du donateur</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{offer.criteria}</p>
          </div>
        ) : null}

        <div className="mt-8">
          <Alert tone="warning">
            <strong>Cette offre ne constitue pas une garantie de financement.</strong>
            <br />
            Les demandes sont examinées selon les critères définis par le donateur. La décision
            finale appartient exclusivement au donateur.
          </Alert>
        </div>

        <div className="mt-10 hidden md:block">
          <Button href={`/demande?offre=${offer.id}`} size="lg" arrow>
            Présenter ma demande
          </Button>
        </div>
      </Container>

      {/* CTA sticky mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 p-4 backdrop-blur md:hidden">
        <Button href={`/demande?offre=${offer.id}`} className="w-full" size="lg">
          Présenter ma demande
        </Button>
      </div>
    </div>
  );
}
