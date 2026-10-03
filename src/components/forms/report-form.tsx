"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitReport } from "@/features/reports/actions";
import { Field, Input, Textarea, Select, Honeypot } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { REPORT_REASON_LABELS } from "@/lib/utils";
import type { FormState } from "@/features/requests/actions";

const initial: FormState = { status: "idle" };

export function ReportForm() {
  const [state, action, pending] = useActionState(submitReport, initial);
  const errors = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-positive/30 bg-positive-soft p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-positive" aria-hidden />
        <p className="mt-4 text-lg font-semibold text-navy">Merci. Votre signalement a été transmis à l&apos;équipe HilfeNetz.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <Field label="Nom de l'annonce" required error={errors.offerName?.[0]}>
        <Input name="offerName" error={!!errors.offerName} />
      </Field>
      <Field label="Lien de l'annonce" required error={errors.offerUrl?.[0]}>
        <Input name="offerUrl" error={!!errors.offerUrl} placeholder="https://…" />
      </Field>
      <Field label="Motif du signalement" required error={errors.reason?.[0]}>
        <Select name="reason" error={!!errors.reason} defaultValue="">
          <option value="" disabled>Sélectionnez un motif</option>
          {Object.entries(REPORT_REASON_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Select>
      </Field>
      <Field label="Description" required error={errors.description?.[0]}>
        <Textarea name="description" error={!!errors.description} rows={5} maxLength={2000} />
      </Field>
      <Field label="Votre e-mail" required error={errors.email?.[0]}>
        <Input type="email" name="email" error={!!errors.email} autoComplete="email" />
      </Field>
      <Honeypot />
      {state.message ? (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">{state.message}</p>
      ) : null}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Envoi en cours…" : "Envoyer le signalement"}
      </Button>
    </form>
  );
}
