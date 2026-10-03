import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS, formatAmount, formatDate } from "@/lib/utils";

export function OfferCard({
  offer,
}: {
  offer: {
    id: string;
    title: string;
    donorName: string | null;
    amount: unknown;
    currency: string;
    category: string;
    publishedAt: Date | null;
  };
}) {
  return (
    <Link
      href={`/offres/${offer.id}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-trust"
    >
      <Badge tone="navy" className="w-fit">Offre de don</Badge>
      <h3 className="mt-4 text-base font-semibold text-navy">
        Un donateur souhaite proposer son soutien
      </h3>
      <p className="mt-1.5 text-sm text-muted">
        Donateur : {offer.donorName || "Donateur anonyme"}
      </p>
      <p className="mt-4 text-xs uppercase tracking-wide text-muted">Montant du don proposé</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
        {formatAmount(Number(offer.amount), offer.currency)}
      </p>
      <p className="mt-3 text-sm text-muted">
        {offer.title} · {CATEGORY_LABELS[offer.category] ?? offer.category}
      </p>
      <p className="mt-1 text-xs text-muted">Publié le {formatDate(offer.publishedAt)}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-trust">
        Voir les détails
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
