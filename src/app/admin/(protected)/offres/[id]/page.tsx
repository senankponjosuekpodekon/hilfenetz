import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { OfferForm } from "@/components/admin/offer-form";

export const dynamic = "force-dynamic";

export default async function EditOfferPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offer = await db.donationOffer.findUnique({ where: { id } });
  if (!offer) notFound();

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-navy">Modifier l&apos;offre</h1>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <OfferForm offer={offer} />
      </div>
    </div>
  );
}
