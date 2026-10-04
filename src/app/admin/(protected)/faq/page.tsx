import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteFaqButton } from "@/components/admin/faq-form";
import { LOCALE_LABELS } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const items = await db.faqItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-navy">FAQ</h1>
        <Button href="/admin/faq/nouveau" size="sm">
          <Plus className="size-4" aria-hidden /> Nouvelle question
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {items.length === 0 ? (
          <p className="rounded-2xl border border-border bg-surface px-5 py-8 text-center text-muted">
            Aucune question.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 rounded-2xl border border-border bg-surface p-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase text-muted">#{item.order} · {LOCALE_LABELS[item.locale] ?? item.locale}</span>
                  <p className="font-medium text-navy">{item.question}</p>
                  {!item.published ? <Badge tone="warning">Non publiée</Badge> : null}
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm text-muted">{item.answer}</p>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <Link href={`/admin/faq/${item.id}`} className="text-sm font-medium text-trust hover:underline">
                  Modifier
                </Link>
                <DeleteFaqButton id={item.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
