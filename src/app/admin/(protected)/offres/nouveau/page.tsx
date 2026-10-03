import { OfferForm } from "@/components/admin/offer-form";

export default function NewOfferPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-navy">Nouvelle offre</h1>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <OfferForm />
      </div>
    </div>
  );
}
