"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitDonationProposal } from "@/features/donations/actions";
import { Field, Input, Textarea, Select, Honeypot } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import type { FormState } from "@/features/requests/actions";

const initial: FormState = { status: "idle" };

export function DonationForm() {
  const [state, action, pending] = useActionState(submitDonationProposal, initial);
  const errors = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-positive/30 bg-positive-soft p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-positive" aria-hidden />
        <p className="mt-4 text-lg font-semibold text-navy">Votre proposition a été transmise à l&apos;équipe HilfeNetz.</p>
        <p className="mt-2 text-sm text-muted">Elle sera examinée avant toute éventuelle publication.</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" required error={errors.name?.[0]}>
          <Input name="name" error={!!errors.name} autoComplete="name" />
        </Field>
        <Field label="Organisation (facultatif)" error={errors.organization?.[0]}>
          <Input name="organization" error={!!errors.organization} autoComplete="organization" />
        </Field>
        <Field label="E-mail" required error={errors.email?.[0]}>
          <Input type="email" name="email" error={!!errors.email} autoComplete="email" />
        </Field>
        <Field label="Téléphone / WhatsApp" error={errors.phone?.[0]}>
          <Input type="tel" name="phone" error={!!errors.phone} autoComplete="tel" />
        </Field>
        <Field label="Montant proposé" required error={errors.amount?.[0]}>
          <Input type="number" name="amount" min="1" step="1" error={!!errors.amount} />
        </Field>
        <Field label="Devise" required error={errors.currency?.[0]}>
          <Select name="currency" error={!!errors.currency} defaultValue="EUR">
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
            <option value="CHF">CHF</option>
            <option value="GBP">GBP (£)</option>
          </Select>
        </Field>
      </div>
      <Field label="Type de soutien" required error={errors.supportType?.[0]} hint="Ex. : projet professionnel, initiative communautaire, situation sociale">
        <Input name="supportType" error={!!errors.supportType} />
      </Field>
      <Field label="Critères souhaités" required error={errors.criteria?.[0]}>
        <Textarea name="criteria" error={!!errors.criteria} rows={4} maxLength={2000} />
      </Field>
      <Field label="Message" required error={errors.message?.[0]}>
        <Textarea name="message" error={!!errors.message} rows={5} maxLength={2000} />
      </Field>
      <Honeypot />
      {state.message ? (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">{state.message}</p>
      ) : null}
      <p className="text-xs text-muted">La transmission d&apos;une proposition ne garantit pas sa publication.</p>
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Envoi en cours…" : "Envoyer ma proposition"}
      </Button>
    </form>
  );
}
