import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [requests, requestsToReview, offersActive, offersPending, reportsNew, proposalsNew, messages] =
    await Promise.all([
      db.supportRequest.count(),
      db.supportRequest.count({ where: { status: { in: ["RECEIVED", "UNDER_REVIEW"] } } }),
      db.donationOffer.count({ where: { status: "PUBLISHED" } }),
      db.donationOffer.count({ where: { status: "PENDING_REVIEW" } }),
      db.report.count({ where: { status: "NEW" } }),
      db.donationProposal.count({ where: { status: "NEW" } }),
      db.contactMessage.count(),
    ]);

  const kpis = [
    { label: "Demandes reçues", value: requests, href: "/admin/demandes" },
    { label: "Demandes à examiner", value: requestsToReview, href: "/admin/demandes" },
    { label: "Offres actives", value: offersActive, href: "/admin/offres" },
    { label: "Offres en attente", value: offersPending, href: "/admin/offres" },
    { label: "Propositions nouvelles", value: proposalsNew, href: "/admin/propositions" },
    { label: "Signalements", value: reportsNew, href: "/admin/signalements" },
    { label: "Messages", value: messages, href: "/admin/messages" },
  ];

  const latestRequests = await db.supportRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            href={kpi.href}
            className="rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-trust"
          >
            <p className="text-sm text-muted">{kpi.label}</p>
            <p className="mt-2 text-3xl font-semibold text-ink">{kpi.value}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold text-navy">Dernières demandes</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-surface">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
              <th className="px-5 py-3">Référence</th>
              <th className="px-5 py-3">Nom</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {latestRequests.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-muted">
                  Aucune demande pour le moment.
                </td>
              </tr>
            ) : (
              latestRequests.map((r) => (
                <tr key={r.id} className="hover:bg-background">
                  <td className="px-5 py-3 font-medium">
                    <Link href={`/admin/demandes/${r.id}`} className="text-trust hover:underline">
                      {r.reference}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{r.firstName} {r.lastName}</td>
                  <td className="px-5 py-3 text-muted">{r.status}</td>
                  <td className="px-5 py-3 text-muted">{r.createdAt.toLocaleDateString("fr-FR")}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
