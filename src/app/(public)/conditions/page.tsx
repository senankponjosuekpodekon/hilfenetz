import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = { title: "Conditions de participation" };

export default function ConditionsPage() {
  return (
    <LegalPage title="Conditions de participation">
      <section>
        <h2>1. Rôle de la plateforme</h2>
        <p>
          HilfeNetz est une plateforme de mise en relation entre des donateurs et des personnes ou
          porteurs de projets souhaitant présenter une demande de soutien. HilfeNetz n&apos;est ni
          une banque, ni un établissement de crédit, ni un intermédiaire décidant de
          l&apos;attribution d&apos;un don.
        </p>
      </section>
      <section>
        <h2>2. Absence de garantie</h2>
        <p>
          La publication d&apos;une demande ou d&apos;une offre ne garantit pas l&apos;obtention
          d&apos;un don. La décision d&apos;accorder un don appartient exclusivement au donateur.
        </p>
      </section>
      <section>
        <h2>3. Exactitude des informations</h2>
        <p>
          Les utilisateurs s&apos;engagent à fournir des informations exactes. Les demandes ou
          annonces inexactes, trompeuses ou manifestement frauduleuses peuvent être refusées ou
          supprimées.
        </p>
      </section>
      <section>
        <h2>4. Interdiction de paiement</h2>
        <p>
          Aucun paiement n&apos;est exigé pour présenter une demande ou pour garantir
          l&apos;obtention d&apos;un don. Toute demande de paiement émanant de tiers doit être
          signalée.
        </p>
      </section>
      <section>
        <h2>5. Signalements</h2>
        <p>
          Tout utilisateur peut signaler une annonce ou un comportement suspect via le formulaire
          dédié. HilfeNetz se réserve la possibilité de suspendre ou retirer les contenus signalés
          après examen.
        </p>
      </section>
    </LegalPage>
  );
}
