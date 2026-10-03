import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { db } from "@/lib/db";
import { StatusBadge } from "@/components/ui/badge";
import { RequestStatusForm } from "@/components/admin/request-status-form";
import { REQUEST_STATUS_LABELS, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = await db.supportRequest.findUnique({
    where: { id },
    include: { offer: { select: { title: true, id: true } } },
  });
  if (!request) notFound();

  const fields = [
    { label: "Référence", value: request.reference },
    { label: "Nom", value: `${request.firstName} ${request.lastName}` },
    { label: "E-mail", value: request.email },
    { label: "Téléphone", value: request.phone },
    { label: "Pays", value: request.country },
    { label: "Offre liée", value: request.offer?.title ?? "—" },
    { label: "Reçue le", value: formatDate(request.createdAt) },
  ];

  return (
    <div className="max-w-3xl">
      <Link href="/admin/demandes" className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-navy">
        <ArrowLeft className="size-4" aria-hidden /> Retour aux demandes
      </Link>
      <div className="mt-5 flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-navy">{request.reference}</h1>
        <StatusBadge status={request.status} label={REQUEST_STATUS_LABELS[request.status] ?? request.status} />
      </div>

      <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
        {fields.map((f) => (
          <div key={f.label} className="flex flex-col gap-0.5 px-5 py-3.5 sm:flex-row sm:justify-between">
            <dt className="text-sm text-muted">{f.label}</dt>
            <dd className="text-sm font-medium text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-8 text-lg font-semibold text-navy">Situation / projet</h2>
      <p className="mt-3 whitespace-pre-wrap rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-ink">
        {request.projectDescription}
      </p>

      {request.donorMessage ? (
        <>
          <h2 className="mt-8 text-lg font-semibold text-navy">Message au donateur</h2>
          <p className="mt-3 whitespace-pre-wrap rounded-2xl border border-border bg-surface p-5 text-sm leading-relaxed text-ink">
            {request.donorMessage}
          </p>
        </>
      ) : null}

      <h2 className="mt-8 text-lg font-semibold text-navy">Traitement</h2>
      <div className="mt-3">
        <RequestStatusForm id={request.id} status={request.status} internalNote={request.internalNote} />
      </div>
    </div>
  );
}
