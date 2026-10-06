import type { Metadata } from "next";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { Container, SectionHeading } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: "Vermittlungsplattform",
    description: t("home"),
    alternates: localeAlternates(locale, "/vermittlung"),
  };
}

export default async function AdsLandingPage() {
  const t = await getTranslations("adsLanding");
  const tc = await getTranslations("common");
  const htw = await getTranslations("home.howItWorks");
  const steps = (htw.raw("steps") as { title: string; desc: string }[]) ?? [];
  const trustItems = t.raw("trustItems") as string[];
  const statementItems = t.raw("statementItems") as string[];

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="border-b border-border/60 bg-surface">
        <Container className="py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-trust/10 px-3 py-1 text-xs font-semibold text-trust">
              <ShieldCheck className="size-3.5" aria-hidden />
              {tc("legalDisclaimer")}
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-ink md:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-ink/80">{t("subtitle")}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/demande" size="lg" arrow>
                {t("cta")}
              </Button>
              <Button href="/comment-ca-marche" variant="secondary" size="lg">
                {t("ctaSecondary")}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Statement */}
      <section className="bg-background py-14 md:py-20">
        <Container>
          <Reveal>
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-8 shadow-card md:p-10">
              <h2 className="font-display text-2xl font-semibold text-ink">{t("statementTitle")}</h2>
              <ul className="mt-6 space-y-3">
                {statementItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink/90">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-positive-soft">
                      <Check className="size-3 text-positive" aria-hidden />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p
                className="mt-8 text-sm text-muted"
                dangerouslySetInnerHTML={{ __html: t("legalNotice") }}
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section className="border-y border-border/60 bg-surface py-16 md:py-24">
        <Container>
          <SectionHeading title={t("howItWorksTitle")} description={t("howItWorksDesc")} align="center" />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="h-full rounded-[var(--radius-card)] border border-border bg-background p-5 text-center shadow-card">
                  <span
                    className={`mx-auto flex size-10 items-center justify-center rounded-full text-sm font-semibold ${
                      ["bg-violet-soft text-violet", "bg-accent-soft text-accent-dark", "bg-amber-soft text-warning", "bg-iris-soft text-iris", "bg-positive-soft text-positive"][i % 5]
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust */}
      <section className="bg-background py-14 md:py-20">
        <Container>
          <Reveal>
            <div className="rounded-[var(--radius-card)] border border-border bg-surface p-8 shadow-card md:p-10">
              <h2 className="font-display text-2xl font-semibold text-ink">{t("trustTitle")}</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {trustItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ArrowRight className="mt-0.5 size-5 shrink-0 text-trust" aria-hidden />
                    <p className="text-ink/90">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="bg-surface py-16 md:py-24">
        <Container className="text-center">
          <h2 className="font-display text-3xl font-semibold text-ink md:text-4xl">{t("finalCtaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t("finalCtaDesc")}</p>
          <Button href="/demande" size="lg" className="mt-8" arrow>
            {t("cta")}
          </Button>
        </Container>
      </section>
    </main>
  );
}
