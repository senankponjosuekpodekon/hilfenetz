import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { StatusSelect } from "@/components/admin/status-select";
import { setOfferStatus } from "@/features/admin/actions";
import { CATEGORY_LABELS, OFFER_STATUS_LABELS, formatAmount, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminOffersPage() {
  const offers = await db.donationOffer.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy">Offres</h1>
        <Button href="/admin/offres/nouveau" size="sm">
          <Plus className="size-4" aria-hidden /> Nouvelle offre
        </Button>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3">Titre</th>
              <th className="px-5 py-3">Montant</th>
              <th className="px-5 py-3">Domaine</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3">Publiée le</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {offers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted">Aucune offre.</td>
              </tr>
            ) : (
              offers.map((o) => (
                <tr key={o.id} className="hover:bg-background">
                  <td className="px-5 py-3 font-medium">
                    <Link href={`/admin/offres/${o.id}`} className="text-navy hover:text-trust">
                      {o.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{formatAmount(Number(o.amount), o.currency)}</td>
                  <td className="px-5 py-3 text-muted">{CATEGORY_LABELS[o.category]}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={o.status} label={OFFER_STATUS_LABELS[o.status] ?? o.status} />
                      <StatusSelect id={o.id} value={o.status} options={OFFER_STATUS_LABELS} action={setOfferStatus} />
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted">{formatDate(o.publishedAt)}</td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/offres/${o.id}`} className="text-sm font-medium text-trust hover:underline">
                      Modifier
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
