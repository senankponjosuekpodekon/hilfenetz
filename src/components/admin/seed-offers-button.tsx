"use client";

import { useState, useTransition } from "react";
import { DatabaseBackup } from "lucide-react";
import { seedDemoOffers } from "@/features/admin/actions";

export function SeedOffersButton() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);

  return (
    <div className="flex items-center gap-3">
      {result ? <span className="text-sm text-muted">{result}</span> : null}
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          startTransition(async () => {
            const { created } = await seedDemoOffers();
            setResult(created > 0 ? `${created} offres de démo créées.` : "Aucune offre manquante.");
          })
        }
        className="inline-flex h-9 items-center gap-2 rounded-[10px] border border-border bg-surface px-4 text-sm font-medium text-ink transition-colors hover:border-trust hover:text-trust disabled:opacity-50"
      >
        <DatabaseBackup className="size-4" aria-hidden />
        {pending ? "Création…" : "Compléter les démos"}
      </button>
    </div>
  );
}
