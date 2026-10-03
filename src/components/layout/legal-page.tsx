import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">{title}</h1>
        <p className="mt-4 rounded-xl border border-warning/40 bg-warning-soft px-4 py-3 text-sm text-ink">
          Document fourni à titre indicatif — le contenu définitif doit être validé par le
          responsable légal du projet.
        </p>
        <div className="mt-10 space-y-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_p]:mt-3 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li]:text-muted">
          {children}
        </div>
      </Container>
    </div>
  );
}
