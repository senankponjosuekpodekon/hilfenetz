import { BarChart3, MousePointerClick, Users } from "lucide-react";
import { db } from "@/lib/db";
import { Container } from "@/components/ui/container";

export const dynamic = "force-dynamic";

function startOfDay(daysAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default async function AdminStatsPage() {
  const [total, today, last7, last30, topPages, topLocales, recent] = await Promise.all([
    db.analyticsEvent.count(),
    db.analyticsEvent.count({ where: { createdAt: { gte: startOfDay(0) } } }),
    db.analyticsEvent.count({ where: { createdAt: { gte: startOfDay(7) } } }),
    db.analyticsEvent.count({ where: { createdAt: { gte: startOfDay(30) } } }),
    db.analyticsEvent.groupBy({
      by: ["path"],
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),
    db.analyticsEvent.groupBy({
      by: ["locale"],
      _count: { locale: true },
      orderBy: { _count: { locale: "desc" } },
      take: 5,
    }),
    db.analyticsEvent.findMany({ orderBy: { createdAt: "desc" }, take: 25 }),
  ]);

  const uniqueVisitors = await db.analyticsEvent.groupBy({
    by: ["ipHash"],
    where: { createdAt: { gte: startOfDay(30) } },
    _count: { ipHash: true },
    orderBy: { _count: { ipHash: "desc" } },
    take: 10000,
  }).then(rows => rows.length);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Statistiques de trafic</h1>
      <p className="mt-1 text-sm text-muted">Données collectées localement après consentement cookies.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={MousePointerClick} label="Pages vues (total)" value={total} />
        <StatCard icon={BarChart3} label="Pages vues (aujourd'hui)" value={today} />
        <StatCard icon={BarChart3} label="Pages vues (7 jours)" value={last7} />
        <StatCard icon={Users} label="Visiteurs uniques (30 jours)" value={uniqueVisitors} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
          <h2 className="font-display text-lg font-semibold text-ink">Pages les plus vues</h2>
          {topPages.length === 0 ? (
            <p className="mt-4 text-sm text-muted">Aucune donnée.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {topPages.map((p) => (
                <li key={p.path} className="flex items-center justify-between text-sm">
                  <span className="truncate text-ink/90">{p.path}</span>
                  <span className="ml-3 shrink-0 rounded-full bg-trust/10 px-2 py-0.5 text-xs font-semibold text-trust">
                    {p._count.path}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
          <h2 className="font-display text-lg font-semibold text-ink">Langues</h2>
          {topLocales.length === 0 ? (
            <p className="mt-4 text-sm text-muted">Aucune donnée.</p>
          ) : (
            <ul className="mt-4 space-y-2">
              {topLocales.map((l) => (
                <li key={l.locale ?? "inconnu"} className="flex items-center justify-between text-sm">
                  <span className="text-ink/90">{l.locale?.toUpperCase() ?? "Inconnu"}</span>
                  <span className="ml-3 shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                    {l._count.locale}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-surface p-5 shadow-card">
        <h2 className="font-display text-lg font-semibold text-ink">Dernières pages vues</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-muted">
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Page</th>
                <th className="px-3 py-2">Langue</th>
                <th className="px-3 py-2">Referrer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-8 text-center text-muted">
                    Aucune page vue enregistrée.
                  </td>
                </tr>
              ) : (
                recent.map((r) => (
                  <tr key={r.id}>
                    <td className="px-3 py-2 text-muted">{r.createdAt.toLocaleString("fr-FR")}</td>
                    <td className="px-3 py-2 font-medium text-ink">{r.path}</td>
                    <td className="px-3 py-2 text-muted">{r.locale?.toUpperCase() ?? "—"}</td>
                    <td className="max-w-xs truncate px-3 py-2 text-muted" title={r.referrer ?? undefined}>
                      {r.referrer || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof BarChart3; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center gap-2 text-muted">
        <Icon className="size-4" aria-hidden />
        <p className="text-sm">{label}</p>
      </div>
      <p className="mt-3 text-3xl font-semibold text-ink">{value.toLocaleString("fr-FR")}</p>
    </div>
  );
}
