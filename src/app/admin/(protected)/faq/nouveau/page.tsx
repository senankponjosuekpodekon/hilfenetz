import { FaqForm } from "@/components/admin/faq-form";

export default function NewFaqPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-navy">Nouvelle question</h1>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <FaqForm />
      </div>
    </div>
  );
}
