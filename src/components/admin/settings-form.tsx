"use client";

import { useActionState } from "react";
import { saveSettings } from "@/features/admin/actions";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function SettingsForm({
  contactEmail,
  contactPhone,
}: {
  contactEmail: string;
  contactPhone: string;
}) {
  const [state, action, pending] = useActionState(saveSettings, { status: "idle" });

  return (
    <form action={action} className="space-y-5">
      <Field label="E-mail de contact" hint="Affiché sur la page Contact publique.">
        <Input type="email" name="contactEmail" defaultValue={contactEmail} />
      </Field>
      <Field label="Téléphone / WhatsApp" hint="Laissez vide pour afficher « À communiquer prochainement ».">
        <Input type="tel" name="contactPhone" defaultValue={contactPhone} />
      </Field>
      {state.status === "success" ? (
        <p className="rounded-xl border border-positive/30 bg-positive-soft px-4 py-3 text-sm text-positive">
          Paramètres enregistrés.
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Enregistrement…" : "Enregistrer"}
      </Button>
    </form>
  );
}
