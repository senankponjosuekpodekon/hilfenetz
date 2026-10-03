"use client";

import { useActionState } from "react";
import { saveOffer } from "@/features/admin/actions";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, OFFER_STATUS_LABELS } from "@/lib/utils";

type OfferData = {
  id?: string;
  title: string;
  donorName: string | null;
  description: string;
  donorMessage: string | null;
  amount: unknown;
  currency: string;
  category: string;
  criteria: string | null;
  status: string;
};

export function OfferForm({ offer }: { offer?: OfferData }) {
  const [state, action, pending] = useActionState(saveOffer, { status: "idle" } as { status: string; errors?: Record<string, string[]> });
  const errors = state.errors ?? {};

  return (
    <form action={action} className="space-y-5">
      {offer?.id ? <input type="hidden" name="id" value={offer.id} /> : null}
      <Field label="Titre" required error={errors.title?.[0]}>
        <Input name="title" defaultValue={offer?.title} error={!!errors.title} />
      </Field>
      <Field label="Donateur" hint="Nom affiché publiquement. Laissez vide pour « Donateur anonyme ».">
        <Input name="donorName" defaultValue={offer?.donorName ?? ""} placeholder="Ex. : Laurent D." />
      </Field>
      <Field label="Description" required error={errors.description?.[0]}>
        <Textarea name="description" defaultValue={offer?.description} error={!!errors.description} rows={5} />
      </Field>
      <Field label="Message du donateur" error={errors.donorMessage?.[0]}>
        <Textarea name="donorMessage" defaultValue={offer?.donorMessage ?? ""} error={!!errors.donorMessage} rows={3} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Montant" required error={errors.amount?.[0]}>
          <Input type="number" name="amount" min="1" step="1" defaultValue={offer ? String(offer.amount) : ""} error={!!errors.amount} />
        </Field>
        <Field label="Devise" required error={errors.currency?.[0]}>
          <Select name="currency" defaultValue={offer?.currency ?? "EUR"} error={!!errors.currency}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="CHF">CHF</option>
            <option value="GBP">GBP</option>
          </Select>
        </Field>
        <Field label="Domaine" required error={errors.category?.[0]}>
          <Select name="category" defaultValue={offer?.category ?? "PROFESSIONAL"} error={!!errors.category}>
            {Object.entries(CATEGORY_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Critères" error={errors.criteria?.[0]}>
        <Textarea name="criteria" defaultValue={offer?.criteria ?? ""} error={!!errors.criteria} rows={3} />
      </Field>
      <Field label="Statut" required error={errors.status?.[0]}>
        <Select name="status" defaultValue={offer?.status ?? "DRAFT"} error={!!errors.status}>
          {Object.entries(OFFER_STATUS_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </Select>
      </Field>
      {state.status === "success" ? (
        <p className="rounded-xl border border-positive/30 bg-positive-soft px-4 py-3 text-sm text-positive">
          Offre enregistrée.
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : "Enregistrer"}
      </Button>
    </form>
  );
}
