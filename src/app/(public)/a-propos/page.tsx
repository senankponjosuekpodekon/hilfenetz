import type { Metadata } from "next";
import { ArrowDown, X } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "À propos",
  description: "HilfeNetz est une plateforme destinée à faciliter la mise en relation entre donateurs et porteurs de projets.",
};

const NOT_LIST = [
  "HilfeNetz ne garantit pas l'obtention d'un don.",
  "HilfeNetz ne décide pas à la place du donateur.",
  "HilfeNetz n'est ni une banque ni un établissement de crédit.",
  "HilfeNetz ne propose aucun produit financier ou de prêt.",
];

export default function AboutPage() {
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="À propos"
          title="Créer un espace de mise en relation plus clair et plus transparent."
        />

        <div className="mt-14 space-y-14">
          <section>
            <h2 className="text-2xl font-semibold text-navy">Notre mission</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              HilfeNetz est une plateforme destinée à faciliter la mise en relation entre des
              donateurs et des personnes ou porteurs de projets souhaitant présenter une demande de
              soutien. Notre objectif : rendre ce processus plus clair, plus structuré et plus sûr
              pour chacun.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy">Notre rôle</h2>
            <div className="mt-6 flex flex-col items-center gap-2 rounded-3xl border border-border bg-surface py-10">
              <span className="rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold text-navy">DONATEUR</span>
              <ArrowDown className="size-5 text-muted" aria-hidden />
              <span className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white">HILFENETZ</span>
              <ArrowDown className="size-5 text-muted" aria-hidden />
              <span className="rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold text-navy">DEMANDEUR</span>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
              HilfeNetz facilite la mise en relation mais ne décide pas de l&apos;attribution des
              dons. La décision d&apos;accorder un don appartient exclusivement au donateur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy">Ce que HilfeNetz ne fait pas</h2>
            <ul className="mt-6 space-y-3">
              {NOT_LIST.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface px-5 py-4">
                  <X className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
                  <span className="text-sm text-ink md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy">Notre engagement</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
              Transparence sur le fonctionnement, vigilance contre la fraude, protection des
              informations transmises et possibilité pour chacun de signaler un comportement
              suspect.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
