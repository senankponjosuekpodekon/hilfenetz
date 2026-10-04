"use client";

import { useActionState, useTransition } from "react";
import { deleteFaqItem, saveFaqItem } from "@/features/admin/actions";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { LOCALE_LABELS } from "@/lib/utils";

type FaqData = {
  id?: string;
  locale: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
};

export function FaqForm({ item }: { item?: FaqData }) {
  const [state, action, pending] = useActionState(saveFaqItem, { status: "idle" } as { status: string; errors?: Record<string, string[]> });
  const errors = state.errors ?? {};

  return (
    <form action={action} className="space-y-5">
      {item?.id ? <input type="hidden" name="id" value={item.id} /> : null}
      <Field label="Langue" required hint="La question s'affichera dans cette langue sur le site.">
        <Select name="locale" defaultValue={item?.locale ?? "fr"}>
          {Object.entries(LOCALE_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </Select>
      </Field>
      <Field label="Question" required error={errors.question?.[0]}>
        <Input name="question" defaultValue={item?.question} error={!!errors.question} />
      </Field>
      <Field label="Réponse" required error={errors.answer?.[0]}>
        <Textarea name="answer" defaultValue={item?.answer} error={!!errors.answer} rows={4} />
      </Field>
      <div className="flex flex-wrap items-center gap-6">
        <Field label="Ordre d'affichage">
          <Input type="number" name="order" defaultValue={item?.order ?? 0} min={0} className="w-32" />
        </Field>
        <label className="flex cursor-pointer items-center gap-2.5 pt-6 text-sm text-ink">
          <input type="checkbox" name="published" defaultChecked={item?.published ?? true} className="size-4 accent-trust" />
          Publiée
        </label>
      </div>
      {state.status === "success" ? (
        <p className="rounded-xl border border-positive/30 bg-positive-soft px-4 py-3 text-sm text-positive">
          Question enregistrée.
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : "Enregistrer"}
      </Button>
    </form>
  );
}

export function DeleteFaqButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm("Supprimer cette question ?")) startTransition(() => deleteFaqItem(id));
      }}
      className="text-sm font-medium text-danger hover:underline disabled:opacity-50"
    >
      {pending ? "Suppression…" : "Supprimer"}
    </button>
  );
}
