"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { submitSupportRequest } from "@/features/requests/actions";
import { Field, Input, Textarea, Checkbox } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z.string().trim().min(1, "Ce champ est obligatoire.").max(80),
  lastName: z.string().trim().min(1, "Ce champ est obligatoire.").max(80),
  email: z.string().trim().email("Adresse e-mail invalide.").max(160),
  phone: z.string().trim().min(6, "Numéro invalide.").max(30),
  country: z.string().trim().min(1, "Ce champ est obligatoire.").max(80),
  projectDescription: z
    .string()
    .trim()
    .min(50, "Décrivez votre situation en au moins 50 caractères.")
    .max(2000, "Maximum 2 000 caractères."),
  donorMessage: z.string().trim().max(2000, "Maximum 2 000 caractères.").optional(),
  confirmAccuracy: z.boolean().refine((v) => v, "Vous devez confirmer l'exactitude des informations."),
  acceptProcessing: z.boolean().refine((v) => v, "Vous devez accepter le traitement de vos informations."),
  website: z.string().optional(),
  offerId: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = ["Informations", "Votre situation", "Votre message", "Confirmation"];

const STEP_FIELDS: (keyof FormValues)[][] = [
  ["firstName", "lastName", "email", "phone", "country"],
  ["projectDescription"],
  ["donorMessage"],
  ["confirmAccuracy", "acceptProcessing"],
];

export function RequestForm({ offerId, offerTitle }: { offerId?: string; offerTitle?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const {
    register,
    trigger,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { offerId, website: "" },
    mode: "onTouched",
  });

  const projectDescription = watch("projectDescription") ?? "";
  const donorMessage = watch("donorMessage") ?? "";

  async function next() {
    const valid = await trigger(STEP_FIELDS[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    const valid = await trigger();
    if (!valid) {
      setStep((s) => s); // reste sur l'étape courante, les erreurs s'affichent
      return;
    }
    setServerError(null);
    const values = getValues();
    const fd = new FormData();
    for (const [key, value] of Object.entries(values)) {
      if (typeof value === "boolean") {
        if (value) fd.set(key, "on");
      } else if (value) {
        fd.set(key, String(value));
      }
    }
    startTransition(async () => {
      const result = await submitSupportRequest({ status: "idle" }, fd);
      if (result.status === "success" && result.reference) {
        router.push(`/demande/confirmation?ref=${encodeURIComponent(result.reference)}`);
      } else {
        setServerError(result.message ?? "Une erreur est survenue. Veuillez réessayer.");
      }
    });
  }

  const values = getValues();

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 md:p-10">
      {/* Stepper */}
      <ol className="mb-10 flex items-center gap-2 md:gap-4" aria-label="Étapes du formulaire">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2 md:gap-3">
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                i < step
                  ? "bg-positive text-white"
                  : i === step
                    ? "bg-trust text-white"
                    : "bg-background text-muted"
              }`}
            >
              {i < step ? <Check className="size-4" aria-hidden /> : `0${i + 1}`}
            </span>
            <span className={`hidden text-sm font-medium md:block ${i === step ? "text-ink" : "text-muted"}`}>
              {label}
            </span>
            {i < STEPS.length - 1 ? <span className="h-px flex-1 bg-border" aria-hidden /> : null}
          </li>
        ))}
      </ol>

      {offerTitle ? (
        <p className="mb-6 rounded-xl border border-trust/20 bg-trust-soft px-4 py-3 text-sm text-navy">
          Demande liée à l&apos;offre : <strong>{offerTitle}</strong>
        </p>
      ) : null}

      {step === 0 ? (
        <fieldset>
          <legend className="text-xl font-semibold text-navy">Vos informations</legend>
          <p className="mt-2 text-sm text-muted">
            Utilisez des informations permettant à l&apos;équipe HilfeNetz de vous contacter si votre
            demande est retenue pour examen.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Prénom" required error={errors.firstName?.message}>
              <Input {...register("firstName")} error={!!errors.firstName} autoComplete="given-name" />
            </Field>
            <Field label="Nom" required error={errors.lastName?.message}>
              <Input {...register("lastName")} error={!!errors.lastName} autoComplete="family-name" />
            </Field>
            <Field label="E-mail" required error={errors.email?.message}>
              <Input type="email" {...register("email")} error={!!errors.email} autoComplete="email" />
            </Field>
            <Field label="Téléphone / WhatsApp" required error={errors.phone?.message}>
              <Input type="tel" {...register("phone")} error={!!errors.phone} autoComplete="tel" />
            </Field>
            <Field label="Pays" required error={errors.country?.message}>
              <Input {...register("country")} error={!!errors.country} autoComplete="country-name" />
            </Field>
          </div>
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset>
          <legend className="text-xl font-semibold text-navy">Votre projet ou votre situation</legend>
          <div className="mt-6">
            <Field
              label="Présentez votre projet, votre initiative ou votre situation"
              required
              error={errors.projectDescription?.message}
              hint="Expliquez clairement votre situation, votre projet, vos objectifs et la manière dont un éventuel soutien pourrait vous aider."
            >
              <Textarea
                {...register("projectDescription")}
                error={!!errors.projectDescription}
                rows={8}
                maxLength={2000}
              />
            </Field>
            <p className="mt-1.5 text-right text-xs text-muted">{projectDescription.length} / 2 000 caractères</p>
          </div>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset>
          <legend className="text-xl font-semibold text-navy">Votre message au donateur</legend>
          <div className="mt-6">
            <Field
              label="Présentez votre démarche, vos motivations et les objectifs de votre demande"
              error={errors.donorMessage?.message}
            >
              <Textarea {...register("donorMessage")} error={!!errors.donorMessage} rows={8} maxLength={2000} />
            </Field>
            <p className="mt-1.5 text-right text-xs text-muted">{donorMessage.length} / 2 000 caractères</p>
          </div>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <fieldset>
          <legend className="text-xl font-semibold text-navy">Confirmation</legend>
          <dl className="mt-6 divide-y divide-border rounded-2xl border border-border">
            <div className="px-5 py-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Vos informations</dt>
              <dd className="mt-1.5 text-sm text-ink">
                {values.firstName} {values.lastName}
                <br />
                {values.email}
                <br />
                {values.phone} · {values.country}
              </dd>
            </div>
            <div className="px-5 py-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Votre demande</dt>
              <dd className="mt-1.5 line-clamp-4 text-sm text-ink">{values.projectDescription}</dd>
            </div>
            {values.donorMessage ? (
              <div className="px-5 py-4">
                <dt className="text-xs font-semibold uppercase tracking-wide text-muted">Message au donateur</dt>
                <dd className="mt-1.5 line-clamp-4 text-sm text-ink">{values.donorMessage}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-6 space-y-4">
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
                <input type="checkbox" {...register("confirmAccuracy")} className="mt-0.5 size-4 shrink-0 accent-trust" />
                Je confirme que les informations communiquées sont exactes au meilleur de ma connaissance.
              </label>
              {errors.confirmAccuracy ? (
                <p role="alert" className="mt-1.5 text-sm text-danger">{errors.confirmAccuracy.message}</p>
              ) : null}
            </div>
            <div>
              <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
                <input type="checkbox" {...register("acceptProcessing")} className="mt-0.5 size-4 shrink-0 accent-trust" />
                J&apos;accepte que mes informations soient utilisées conformément aux règles applicables
                au traitement des demandes.
              </label>
              {errors.acceptProcessing ? (
                <p role="alert" className="mt-1.5 text-sm text-danger">{errors.acceptProcessing.message}</p>
              ) : null}
            </div>
          </div>
        </fieldset>
      ) : null}

      {serverError ? (
        <p role="alert" className="mt-6 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {serverError}
        </p>
      ) : null}

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site web
          <input type="text" {...register("website")} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-10 flex items-center justify-between">
        {step > 0 ? (
          <Button type="button" variant="ghost" onClick={back}>
            <ChevronLeft className="size-4" aria-hidden /> Retour
          </Button>
        ) : (
          <span />
        )}
        {step < STEPS.length - 1 ? (
          <Button type="button" onClick={next}>
            Continuer <ChevronRight className="size-4" aria-hidden />
          </Button>
        ) : (
          <Button type="button" onClick={submit} disabled={pending}>
            {pending ? "Envoi en cours…" : "Envoyer ma demande"}
          </Button>
        )}
      </div>
    </div>
  );
}
