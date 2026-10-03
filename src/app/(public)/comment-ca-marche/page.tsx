import type { Metadata } from "next";
import { ClipboardList, FileText, Handshake, SearchCheck, UserCheck } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Comment ça marche",
  description: "De la présentation de votre situation à la décision du donateur, chaque étape est clairement définie.",
};

const STEPS = [
  {
    icon: FileText,
    n: "01",
    title: "Présentez votre demande",
    desc: "Décrivez votre projet, votre initiative ou votre situation et expliquez pourquoi vous recherchez un soutien. Fournissez des informations exactes et complètes.",
  },
  {
    icon: SearchCheck,
    n: "02",
    title: "Votre demande est examinée",
    desc: "L'équipe HilfeNetz examine les informations transmises. Les demandes incomplètes, inexactes ou manifestement frauduleuses peuvent être refusées.",
  },
  {
    icon: Handshake,
    n: "03",
    title: "Mise en relation",
    desc: "Si votre demande correspond aux critères d'une offre, elle peut être présentée au donateur concerné.",
  },
  {
    icon: UserCheck,
    n: "04",
    title: "Le donateur prend sa décision",
    desc: "Le donateur décide librement d'accorder ou non son soutien. HilfeNetz ne décide jamais à sa place.",
  },
  {
    icon: ClipboardList,
    n: "05",
    title: "Les conditions sont définies",
    desc: "Si le donateur accepte, les éventuelles conditions sont établies directement entre les parties.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Fonctionnement"
          title="Une mise en relation en 5 étapes"
          description="HilfeNetz facilite la rencontre entre donateurs et personnes recherchant un soutien. Voici le détail de chaque étape."
        />
        <ol className="mt-14 space-y-6">
          {STEPS.map((step) => (
            <li key={step.n} className="flex gap-6 rounded-2xl border border-border bg-surface p-6 md:p-8">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-semibold text-trust">{step.n}</span>
                <div className="flex size-11 items-center justify-center rounded-xl bg-trust-soft">
                  <step.icon className="size-5 text-trust" aria-hidden />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-navy md:text-xl">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href="/offres" size="lg" arrow>Voir les offres de dons</Button>
          <Button href="/demande" variant="secondary" size="lg">Présenter ma demande</Button>
        </div>
      </Container>
    </div>
  );
}
