"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import { submitReport } from "@/features/reports/actions";
import { Field, Input, Textarea, Select, Honeypot } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import type { FormState } from "@/features/requests/actions";

const initial: FormState = { status: "idle" };

const REASONS = ["MISLEADING_INFO", "PAYMENT_REQUEST", "SUSPICIOUS_BEHAVIOR", "SUSPECTED_FRAUD", "OTHER"] as const;

export function ReportForm() {
  const t = useTranslations("report");
  const tc = useTranslations("common");
  const [state, action, pending] = useActionState(submitReport, initial);
  const errors = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div className="rounded-2xl border border-positive/30 bg-positive-soft p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-positive" aria-hidden />
        <p className="mt-4 text-lg font-semibold text-navy">{t("success")}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-5">
      <Field label={t("offerName")} required error={errors.offerName?.[0]}>
        <Input name="offerName" error={!!errors.offerName} />
      </Field>
      <Field label={t("offerUrl")} required error={errors.offerUrl?.[0]}>
        <Input name="offerUrl" error={!!errors.offerUrl} placeholder="https://…" />
      </Field>
      <Field label={t("reason")} required error={errors.reason?.[0]}>
        <Select name="reason" error={!!errors.reason} defaultValue="">
          <option value="" disabled>{t("selectReason")}</option>
          {REASONS.map((value) => (
            <option key={value} value={value}>{t(`reasons.${value}`)}</option>
          ))}
        </Select>
      </Field>
      <Field label={t("description")} required error={errors.description?.[0]}>
        <Textarea name="description" error={!!errors.description} rows={5} maxLength={2000} />
      </Field>
      <Field label={t("yourEmail")} required error={errors.email?.[0]}>
        <Input type="email" name="email" error={!!errors.email} autoComplete="email" />
      </Field>
      <Honeypot />
      {state.message ? (
        <p role="alert" className="rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">{state.message}</p>
      ) : null}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? tc("sending") : t("submit")}
      </Button>
    </form>
  );
}
