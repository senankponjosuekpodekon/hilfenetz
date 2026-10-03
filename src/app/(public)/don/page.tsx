import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { DonationForm } from "@/components/forms/donation-form";

export const metadata: Metadata = {
  title: "Proposer un don",
  description: "Transmettez votre proposition de soutien à l'équipe HilfeNetz pour examen.",
};

export default function DonatePage() {
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-navy md:text-5xl">
          Vous souhaitez proposer votre soutien ?
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          Transmettez votre proposition à l&apos;équipe HilfeNetz. Après examen des informations
          nécessaires, votre offre pourra éventuellement être publiée sur la plateforme.
        </p>
        <div className="mt-10 rounded-3xl border border-border bg-surface p-6 md:p-10">
          <DonationForm />
        </div>
      </Container>
    </div>
  );
}
