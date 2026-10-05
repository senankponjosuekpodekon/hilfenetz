import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { ClipboardList, FileText, Handshake, SearchCheck, UserCheck } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale();
  return { title: t("howItWorks"), description: t("howItWorksDesc") , alternates: localeAlternates(locale, "/comment-ca-marche") };
}

const ICONS = [FileText, SearchCheck, Handshake, UserCheck, ClipboardList];

export default async function HowItWorksPage() {
  const t = await getTranslations("howItWorks");
  const tc = await getTranslations("common");
  const steps = t.raw("steps") as { title: string; desc: string }[];

  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("desc")} />
        <ol className="mt-14 space-y-6">
          {steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <li key={step.title} className="flex gap-6 rounded-2xl border border-border bg-surface p-6 md:p-8">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-semibold text-trust">0{i + 1}</span>
                  <div className="flex size-11 items-center justify-center rounded-xl bg-trust-soft">
                    <Icon className="size-5 text-trust" aria-hidden />
                  </div>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-navy md:text-xl">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{step.desc}</p>
                </div>
              </li>
            );
          })}
        </ol>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Button href="/offres" size="lg" arrow>{tc("viewOffers")}</Button>
          <Button href="/demande" variant="secondary" size="lg">{tc("submitRequest")}</Button>
        </div>
      </Container>
    </div>
  );
}
