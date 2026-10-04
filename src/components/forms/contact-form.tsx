"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { submitContact } from "@/features/contact/actions";
import { Field, Input, Textarea, Honeypot } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import type { FormState } from "@/features/requests/actions";

const initial: FormState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contact");
  const tc = useTranslations("common");
  const [state, action, pending] = useActionState(submitContact, initial);
  const errors = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-positive/30 bg-positive-soft p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-positive" aria-hidden />
        <p className="mt-4 text-lg font-semibold text-navy">{t("successTitle")}</p>
        <p className="mt-2 text-sm text-muted">{t("successDesc")}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("name")} required error={errors.name?.[0]}>
          <Input name="name" error={!!errors.name} autoComplete="name" />
        </Field>
        <Field label={t("email")} required error={errors.email?.[0]}>
          <Input type="email" name="email" error={!!errors.email} autoComplete="email" />
        </Field>
      </div>
      <Field label={t("subject")} required error={errors.subject?.[0]}>
        <Input name="subject" error={!!errors.subject} />
      </Field>
      <Field label={t("message")} required error={errors.message?.[0]}>
        <Textarea name="message" error={!!errors.message} rows={6} maxLength={2000} />
      </Field>
      <Honeypot />
      {state.message ? (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">{state.message}</p>
      ) : null}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? tc("sending") : t("send")}
      </Button>
    </form>
  );
}
