import type { Metadata } from "next";
import { Container, SectionHeading } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { FAQ_ITEMS } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur le fonctionnement de HilfeNetz.",
};

export default function FaqPage() {
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions fréquentes"
          description="Tout ce qu'il faut savoir sur le fonctionnement de la plateforme."
        />
        <div className="mt-10">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="text-sm text-muted">Vous ne trouvez pas la réponse à votre question ?</p>
          <Button href="/contact" variant="secondary" className="mt-4">
            Nous contacter
          </Button>
        </div>
      </Container>
    </div>
  );
}
