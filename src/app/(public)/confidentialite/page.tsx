import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = { title: "Protection des données" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Protection des données">
      <section>
        <h2>1. Données collectées</h2>
        <p>
          HilfeNetz collecte les informations transmises via ses formulaires : identité,
          coordonnées (e-mail, téléphone), description de la situation ou de la proposition.
        </p>
      </section>
      <section>
        <h2>2. Finalités</h2>
        <ul>
          <li>examen des demandes et propositions ;</li>
          <li>mise en relation entre donateurs et demandeurs ;</li>
          <li>traitement des signalements ;</li>
          <li>réponse aux messages de contact.</li>
        </ul>
      </section>
      <section>
        <h2>3. Conservation et sécurité</h2>
        <p>
          Les informations sont conservées pour la durée nécessaire au traitement des demandes et
          sont accessibles uniquement aux personnes habilitées. Les durées de conservation
          précises seront définies avec le responsable légal du projet.
        </p>
      </section>
      <section>
        <h2>4. Vos droits</h2>
        <p>
          Conformément à la réglementation applicable, vous pouvez demander l&apos;accès, la
          rectification ou la suppression de vos informations en nous contactant via la page
          Contact.
        </p>
      </section>
    </LegalPage>
  );
}
