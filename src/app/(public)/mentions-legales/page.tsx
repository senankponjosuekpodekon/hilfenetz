import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = { title: "Mentions légales" };

export default function LegalNoticePage() {
  return (
    <LegalPage title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          HilfeNetz — plateforme de mise en relation.
          <br />
          [Raison sociale, adresse et informations d&apos;immatriculation à compléter par le
          responsable légal du projet.]
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>[Adresse e-mail de contact à compléter.]</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>[Nom et adresse de l&apos;hébergeur à compléter.]</p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus du site (textes, éléments graphiques, logo) est protégé.
          Toute reproduction sans autorisation est interdite.
        </p>
      </section>
    </LegalPage>
  );
}
