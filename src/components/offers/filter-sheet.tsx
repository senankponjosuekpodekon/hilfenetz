"use client";

import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, X } from "lucide-react";

const CATEGORIES = [
  { value: "all", label: "Tous" },
  { value: "SOCIAL", label: "Social" },
  { value: "PROFESSIONAL", label: "Professionnel" },
  { value: "COMMUNITY", label: "Communautaire" },
];

const AMOUNTS = [
  { value: "all", label: "Tous" },
  { value: "low", label: "Moins de 1 000 €" },
  { value: "mid", label: "1 000 – 5 000 €" },
  { value: "high", label: "5 000 – 10 000 €" },
  { value: "max", label: "Plus de 10 000 €" },
];

export function FilterSheet({
  q,
  category,
  amount,
}: {
  q: string;
  category: string;
  amount: string;
}) {
  const [open, setOpen] = useState(false);
  const activeCount = (category !== "all" ? 1 : 0) + (amount !== "all" ? 1 : 0);

  function buildHref(next: Record<string, string>) {
    const sp = new URLSearchParams({ q, category, amount, ...next });
    if (!sp.get("q")) sp.delete("q");
    for (const key of ["category", "amount"]) {
      if (sp.get(key) === "all") sp.delete(key);
    }
    const qs = sp.toString();
    return `/offres${qs ? `?${qs}` : ""}`;
  }

  const pill = (active: boolean) =>
    `rounded-full border px-3.5 py-2 text-sm transition-colors ${
      active
        ? "border-trust bg-trust text-white"
        : "border-border bg-surface text-muted"
    }`;

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-border bg-surface text-sm font-medium text-ink"
        aria-expanded={open}
      >
        <SlidersHorizontal className="size-4" aria-hidden />
        Filtrer
        {activeCount > 0 ? (
          <span className="flex size-5 items-center justify-center rounded-full bg-trust text-xs font-semibold text-white">
            {activeCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col justify-end" role="dialog" aria-modal="true" aria-label="Filtres">
          <button
            type="button"
            aria-label="Fermer les filtres"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-navy-dark/50"
          />
          <div className="relative max-h-[80vh] overflow-y-auto rounded-t-3xl bg-surface p-6 pb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-navy">Filtres</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="flex size-11 items-center justify-center rounded-[10px] text-muted hover:bg-background"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted">Domaine</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link key={c.value} href={buildHref({ category: c.value })} className={pill(category === c.value)}>
                  {c.label}
                </Link>
              ))}
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted">Montant</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {AMOUNTS.map((a) => (
                <Link key={a.value} href={buildHref({ amount: a.value })} className={pill(amount === a.value)}>
                  {a.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Link
                href="/offres"
                className="flex h-11 flex-1 items-center justify-center rounded-[10px] border border-border text-sm font-medium text-ink"
              >
                Réinitialiser
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 flex-1 items-center justify-center rounded-[10px] bg-trust text-sm font-medium text-white"
              >
                Voir les résultats
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
