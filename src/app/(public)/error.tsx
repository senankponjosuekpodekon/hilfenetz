"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="py-24 md:py-32">
      <Container className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">Une erreur est survenue.</h1>
        <p className="mt-4 text-muted">Impossible de charger le contenu. Veuillez réessayer.</p>
        <Button onClick={reset} className="mt-8">
          Réessayer
        </Button>
      </Container>
    </div>
  );
}
