"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/features/admin/actions";
import { Field, Input } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

const initial: LoginState = { status: "idle" };

export function LoginForm() {
  const [state, action, pending] = useActionState(login, initial);

  return (
    <form action={action} className="mt-6 space-y-4">
      <Field label="E-mail" required>
        <Input type="email" name="email" autoComplete="email" required />
      </Field>
      <Field label="Mot de passe" required>
        <Input type="password" name="password" autoComplete="current-password" required />
      </Field>
      {state.message ? (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {state.message}
        </p>
      ) : null}
      <Button type="submit" className="w-full" size="lg" disabled={pending}>
        {pending ? "Connexion…" : "Se connecter"}
      </Button>
    </form>
  );
}
