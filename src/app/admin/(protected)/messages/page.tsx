import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await db.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy">Messages de contact</h1>
      <div className="mt-6 space-y-4">
        {messages.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface px-5 py-8 text-center text-muted">
            Aucun message.
          </p>
        ) : (
          messages.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-navy">{m.subject}</p>
                <p className="text-xs text-muted">{formatDate(m.createdAt)}</p>
              </div>
              <p className="mt-0.5 text-sm text-muted">
                {m.name} · {m.email}
              </p>
              <p className="mt-3 whitespace-pre-wrap rounded-xl bg-background px-4 py-3 text-sm text-ink">{m.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
