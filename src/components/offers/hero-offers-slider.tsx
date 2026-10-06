"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import type { DonationOffer } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatAmount } from "@/lib/utils";

type Offer = Pick<DonationOffer, "id" | "title" | "donorName" | "amount" | "currency" | "donorMessage">;

export function HeroOffersSlider({
  offers,
  labels,
  locale,
}: {
  offers: Offer[];
  locale: string;
  labels: {
    offerBadge: string;
    offerSubtitle: string;
    verified: string;
    donor: string;
    anonymous: string;
    amountProposed: string;
    submitRequest: string;
    decisionDonor: string;
    noOffers: string;
  };
}) {
  const [index, setIndex] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % offers.length);
  }, [offers.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + offers.length) % offers.length);
  }, [offers.length]);

  useEffect(() => {
    if (offers.length <= 1 || prefersReduced) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [offers.length, prefersReduced, next]);

  if (offers.length === 0) {
    return (
      <div className="relative ml-auto rounded-[var(--radius-card)] border border-border bg-surface p-7 shadow-card-hover">
        <p className="text-sm text-muted">{labels.noOffers}</p>
      </div>
    );
  }

  const offer = offers[index];

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface shadow-card-hover">
        <div
          className="flex transition-transform duration-500 ease-out-expo"
          style={{ transform: `translateX(-${index * 100}%)` }}
          aria-live="polite"
        >
          {offers.map((o) => (
            <article key={o.id} className="w-full shrink-0 p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <Badge tone="accent">{labels.offerBadge}</Badge>
                <span className="flex items-center gap-1.5 text-xs font-medium text-positive">
                  <Check className="size-3.5" aria-hidden /> {labels.verified}
                </span>
              </div>
              <h2 className="mt-5 font-display text-lg font-semibold text-ink">{labels.offerSubtitle}</h2>
              <p className="mt-1.5 text-sm text-muted">
                {labels.donor} : {o.donorName || labels.anonymous}
              </p>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted">{labels.amountProposed}</p>
              <p className="mt-1 font-display text-4xl font-semibold tracking-tight text-ink">
                {formatAmount(Number(o.amount), o.currency, locale)}
              </p>
              <div className="mt-4 rounded-xl border-l-4 border-violet bg-violet-soft/60 px-4 py-3">
                <p className="text-sm italic leading-relaxed text-muted line-clamp-3">{o.donorMessage || o.title}</p>
              </div>
              <Button href={`/demande?offre=${o.id}`} className="mt-6 w-full" arrow>
                {labels.submitRequest}
              </Button>
              <p className="mt-3 text-center text-xs text-muted">{labels.decisionDonor}</p>
            </article>
          ))}
        </div>
      </div>

      {offers.length > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3 px-1">
          <button
            type="button"
            onClick={prev}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-violet hover:text-violet"
            aria-label="Offre précédente"
          >
            <ChevronLeft className="size-4" />
          </button>
          <div className="flex gap-1.5">
            {offers.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`size-2 rounded-full transition-colors ${i === index ? "bg-accent" : "bg-border hover:bg-muted"}`}
                aria-label={`Offre ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-violet hover:text-violet"
            aria-label="Offre suivante"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
