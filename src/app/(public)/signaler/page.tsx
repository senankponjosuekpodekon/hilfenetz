import type { Metadata } from "next";
import { Flag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ReportForm } from "@/components/forms/report-form";

export const metadata: Metadata = {
  title: "Signaler une annonce",
  description: "Signalez une annonce ou un comportement qui ne respecte pas les règles de HilfeNetz.",
};

export default function ReportPage() {
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-warning-soft">
          <Flag className="size-6 text-warning" aria-hidden />
        </div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-navy md:text-5xl">
          Vous avez repéré quelque chose de suspect ?
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          Aidez-nous à maintenir un environnement fiable en signalant une annonce ou un comportement
          qui ne respecte pas les règles de HilfeNetz.
        </p>
        <div className="mt-10 rounded-3xl border border-border bg-surface p-6 md:p-10">
          <ReportForm />
        </div>
      </Container>
    </div>
  );
}
