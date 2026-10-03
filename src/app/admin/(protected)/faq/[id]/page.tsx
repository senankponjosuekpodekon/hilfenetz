import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { FaqForm } from "@/components/admin/faq-form";

export const dynamic = "force-dynamic";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.faqItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-navy">Modifier la question</h1>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <FaqForm item={item} />
      </div>
    </div>
  );
}
