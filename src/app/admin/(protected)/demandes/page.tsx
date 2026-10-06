import Link from "next/link";
import { db } from "@/lib/db";
import { StatusBadge } from "@/components/ui/badge";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteSupportRequest } from "@/features/admin/actions";
import { REQUEST_STATUS_LABELS, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminRequestsPage() {
  const requests = await db.supportRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { offer: { select: { title: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Demandes</h1>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3">Référence</th>
              <th className="px-5 py-3">Nom</th>
              <th className="px-5 py-3">E-mail</th>
              <th className="px-5 py-3">Offre liée</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {requests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-muted">Aucune demande.</td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr key={r.id} className="hover:bg-background">
                  <td className="px-5 py-3 font-medium">
                    <Link href={`/admin/demandes/${r.id}`} className="text-trust hover:underline">
                      {r.reference}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{r.firstName} {r.lastName}</td>
                  <td className="px-5 py-3 text-muted">{r.email}</td>
                  <td className="px-5 py-3 text-muted">{r.offer?.title ?? "—"}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={r.status} label={REQUEST_STATUS_LABELS[r.status] ?? r.status} />
                  </td>
                  <td className="px-5 py-3 text-muted">{formatDate(r.createdAt)}</td>
                  <td className="px-5 py-3 text-right">
                    <DeleteButton id={r.id} action={deleteSupportRequest} confirmLabel={`Supprimer la demande ${r.reference} ?`} />
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
