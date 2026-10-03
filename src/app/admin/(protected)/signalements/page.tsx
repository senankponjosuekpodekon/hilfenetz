import { db } from "@/lib/db";
import { StatusBadge } from "@/components/ui/badge";
import { StatusSelect } from "@/components/admin/status-select";
import { setReportStatus } from "@/features/admin/actions";
import { REPORT_REASON_LABELS, REPORT_STATUS_LABELS, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminReportsPage() {
  const reports = await db.report.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Signalements</h1>
      <div className="mt-6 space-y-4">
        {reports.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface px-5 py-8 text-center text-muted">
            Aucun signalement.
          </p>
        ) : (
          reports.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-navy">{r.offerName}</p>
                  <p className="mt-0.5 break-all text-sm text-muted">{r.offerUrl}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={r.status} label={REPORT_STATUS_LABELS[r.status] ?? r.status} />
                  <StatusSelect id={r.id} value={r.status} options={REPORT_STATUS_LABELS} action={setReportStatus} />
                </div>
              </div>
              <p className="mt-3 text-sm">
                <span className="font-medium text-danger">{REPORT_REASON_LABELS[r.reason] ?? r.reason}</span>
              </p>
              <p className="mt-2 rounded-xl bg-background px-4 py-3 text-sm text-muted">{r.description}</p>
              <p className="mt-3 text-xs text-muted">
                Signalé par {r.email} le {formatDate(r.createdAt)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
