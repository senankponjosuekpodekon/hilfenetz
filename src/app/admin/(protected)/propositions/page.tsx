import { db } from "@/lib/db";
import { StatusBadge } from "@/components/ui/badge";
import { StatusSelect } from "@/components/admin/status-select";
import { setProposalStatus } from "@/features/admin/actions";
import { PROPOSAL_STATUS_LABELS, formatAmount, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminProposalsPage() {
  const proposals = await db.donationProposal.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Propositions de don</h1>
      <div className="mt-6 space-y-4">
        {proposals.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface px-5 py-8 text-center text-muted">
            Aucune proposition.
          </p>
        ) : (
          proposals.map((p) => (
            <div key={p.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-navy">
                    {p.name}
                    {p.organization ? <span className="font-normal text-muted"> · {p.organization}</span> : null}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">
                    {p.email}
                    {p.phone ? ` · ${p.phone}` : ""} · {formatDate(p.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-ink">{formatAmount(Number(p.amount), p.currency)}</span>
                  <StatusBadge status={p.status} label={PROPOSAL_STATUS_LABELS[p.status] ?? p.status} />
                  <StatusSelect id={p.id} value={p.status} options={PROPOSAL_STATUS_LABELS} action={setProposalStatus} />
                </div>
              </div>
              <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">Type de soutien</dt>
                  <dd className="mt-1 text-ink">{p.supportType}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-muted">Critères</dt>
                  <dd className="mt-1 text-ink">{p.criteria}</dd>
                </div>
              </dl>
              <p className="mt-3 rounded-xl bg-background px-4 py-3 text-sm text-muted">{p.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
