import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Demande transmise",
  robots: { index: false },
};

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const ref = typeof params.ref === "string" ? params.ref : null;

  return (
    <div className="py-20 md:py-28">
      <Container className="max-w-xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-positive-soft">
          <CheckCircle2 className="size-8 text-positive" aria-hidden />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          Votre demande a bien été transmise.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Merci d&apos;avoir présenté votre projet à HilfeNetz. Votre demande va être examinée
          conformément aux règles de la plateforme.
        </p>
        {ref ? (
          <p className="mt-6 inline-block rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium text-ink">
            Numéro de référence : <span className="font-semibold text-navy">{ref}</span>
          </p>
        ) : null}
        <p className="mt-6 text-sm font-medium text-ink">
          La soumission d&apos;une demande ne garantit pas l&apos;obtention d&apos;un don.
        </p>
        <Button href="/" variant="secondary" className="mt-8">
          Retour à l&apos;accueil
        </Button>
      </Container>
    </div>
  );
}
