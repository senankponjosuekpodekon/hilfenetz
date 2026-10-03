import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="py-24 md:py-32">
      <Container className="text-center">
        <p className="text-sm font-semibold text-trust">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy">Cette page n&apos;existe pas.</h1>
        <p className="mt-4 text-muted">Le contenu que vous recherchez est introuvable ou a été déplacé.</p>
        <Button href="/" className="mt-8">
          Retour à l&apos;accueil
        </Button>
      </Container>
    </div>
  );
}
