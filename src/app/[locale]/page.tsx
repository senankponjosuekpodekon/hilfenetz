import { Check, Eye, Flag, ShieldCheck, TriangleAlert, ClipboardList, FileText, Handshake, UserCheck } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, SectionHeading } from "@/components/ui/container";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { getFaqItems } from "@/lib/content";
import { formatAmount } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function Hero() {
  const t = await getTranslations("home.hero");
  const tc = await getTranslations("common");
  const checks = t.raw("checks") as string[];
  return (
    <section className="border-b border-border/60 bg-surface">
      <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[55fr_45fr]">
        <div>
          <Badge tone="trust">{t("badge")}</Badge>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.15] tracking-tight text-navy md:text-5xl">
            {t("title1")}
            <br />
            {t("title2")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{t("sub")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/offres" size="lg" arrow>
              {t("ctaOffers")}
            </Button>
            <Button href="/demande" variant="secondary" size="lg">
              {t("ctaRequest")}
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {checks.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="size-4 text-positive" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Composition UI — carte offre */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -left-6 -top-5 hidden rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-medium text-muted shadow-sm md:block">
            ✓ {t("cardReviewed")}
          </div>
          <div className="absolute -bottom-5 -right-4 hidden rounded-xl border border-trust/30 bg-trust-soft px-4 py-2.5 text-xs font-medium text-trust md:block">
            {t("cardConnection")}
          </div>
          <div className="rounded-2xl border border-border bg-surface p-7 shadow-[0_8px_30px_rgb(16,42,67,0.08)]">
            <div className="flex items-center justify-between">
              <Badge tone="navy">{tc("offerBadge")}</Badge>
              <span className="flex items-center gap-1.5 text-xs font-medium text-positive">
                <Check className="size-3.5" aria-hidden /> {t("cardVerified")}
              </span>
            </div>
            <h2 className="mt-5 text-lg font-semibold text-navy">{tc("offerSubtitle")}</h2>
            <p className="mt-1.5 text-sm text-muted">{tc("donor")} : Laurent D.</p>
            <p className="mt-5 text-xs uppercase tracking-wide text-muted">{tc("amountProposed")}</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-ink">5 000 €</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{t("cardDesc")}</p>
            <Button href="/demande" className="mt-6 w-full" arrow>
              {tc("submitRequest")}
            </Button>
            <p className="mt-3 text-center text-xs text-muted">{tc("decisionDonor")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

async function TrustBar() {
  const t = await getTranslations("home.trustBar");
  const items = (t.raw("items") as string[]).map((label, i) => ({
    icon: [Eye, ClipboardList, UserCheck, ShieldCheck][i],
    label,
  }));
  return (
    <section className="border-b border-border/60 bg-background">
      <Container className="py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted">{t("title")}</p>
        <div className="mt-6 flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible">
          {items.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-w-52 items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 md:min-w-0"
            >
              <Icon className="size-4 shrink-0 text-positive" aria-hidden />
              <span className="text-sm font-medium text-ink">{label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

async function HowItWorks() {
  const t = await getTranslations("home.howItWorks");
  const steps = t.raw("steps") as { title: string; desc: string }[];
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading title={t("title")} description={t("desc")} />
        <ol className="mt-12 grid gap-6 md:grid-cols-5 md:gap-4">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="group rounded-2xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-trust"
            >
              <span className="text-sm font-semibold text-trust">0{i + 1}</span>
              <h3 className="mt-2 text-base font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center md:text-left">
          <Button href="/comment-ca-marche" variant="ghost" arrow>
            {t("more")}
          </Button>
        </div>
      </Container>
    </section>
  );
}

async function FeaturedOffer() {
  const t = await getTranslations("home.featured");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const offer =
    (await db.donationOffer.findFirst({
      where: { status: "PUBLISHED", locale },
      orderBy: { publishedAt: "desc" },
    })) ??
    (await db.donationOffer.findFirst({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    }));

  return (
    <section className="border-y border-border/60 bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading title={t("title")} description={t("desc")} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          {offer ? (
            <div className="rounded-3xl border border-border bg-background p-8 md:p-10">
              <Badge tone="navy">{tc("offerBadge")}</Badge>
              <h3 className="mt-4 text-2xl font-semibold text-navy">{tc("offerSubtitle")}</h3>
              <p className="mt-2 text-sm text-muted">
                {tc("donor")} : {offer.donorName || tc("anonymous")}
              </p>
              <p className="mt-4 text-xs uppercase tracking-wide text-muted">{tc("amountProposed")}</p>
              <p className="mt-1 text-5xl font-semibold tracking-tight text-ink">
                {formatAmount(Number(offer.amount), offer.currency, locale)}
              </p>
              <p className="mt-4 text-sm text-muted">{offer.title}</p>
              <p className="mt-2 text-xs text-muted">{tc("decisionDonor")}</p>
              <Button href={`/offres/${offer.id}`} className="mt-7" arrow>
                {t("viewOffer")}
              </Button>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-background p-8 md:p-10">
              <p className="text-lg font-semibold text-navy">{tc("noOffersTitle")}</p>
              <p className="mt-2 text-sm text-muted">{tc("noOffersDesc")}</p>
            </div>
          )}
          <div className="lg:pl-4">
            <p className="text-sm leading-relaxed text-muted">{t("aside")}</p>
            <Button href="/offres" variant="secondary" className="mt-5" arrow>
              {tc("viewAllOffers")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

async function RequesterPath() {
  const t = await getTranslations("home.requester");
  const tc = await getTranslations("common");
  const steps = t.raw("steps") as string[];
  const formSteps = t.raw("formSteps") as string[];
  return (
    <section className="py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 rounded-3xl border border-border bg-surface p-8 lg:order-1">
          <FileText className="size-8 text-trust" aria-hidden />
          <div className="mt-6 space-y-3">
            {formSteps.map((label, i) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-trust-soft text-xs font-semibold text-trust">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-ink">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-trust">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy md:text-4xl">{t("title")}</h2>
          <ol className="mt-8 space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="text-sm font-semibold text-trust">0{i + 1}</span>
                <span className="text-base text-ink">{step}</span>
              </li>
            ))}
          </ol>
          <Button href="/demande" className="mt-8" size="lg" arrow>
            {tc("submitRequest")}
          </Button>
        </div>
      </Container>
    </section>
  );
}

async function DonorPath() {
  const t = await getTranslations("home.donor");
  const steps = t.raw("steps") as string[];
  return (
    <section className="border-y border-border/60 bg-navy py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-trust">{t("eyebrow")}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">{t("desc")}</p>
          <Button href="/contact" variant="light" size="lg" className="mt-8" arrow>
            {t("cta")}
          </Button>
        </div>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <span className="text-sm font-semibold text-trust">0{i + 1}</span>
              <span className="text-base text-white">{step}</span>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

async function Engagement() {
  const t = await getTranslations("home.engagement");
  const cards = (t.raw("cards") as { title: string; desc: string }[]).map((card, i) => ({
    ...card,
    icon: [Eye, ShieldCheck, Handshake, Flag][i],
  }));
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading title={t("title")} align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-trust">
              <div className="flex size-11 items-center justify-center rounded-xl bg-trust-soft">
                <Icon className="size-5 text-trust" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

async function AntiFraud() {
  const t = await getTranslations("home.antiFraud");
  return (
    <section className="border-y border-warning/40 bg-warning-soft py-14 md:py-16">
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-warning/15">
          <TriangleAlert className="size-6 text-warning" aria-hidden />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warning">{t("eyebrow")}</p>
          <h2 className="mt-1 text-2xl font-semibold text-navy md:text-3xl">{t("title")}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/80 md:text-base">{t("desc")}</p>
        </div>
        <Button href="/signaler" variant="secondary" className="shrink-0">
          {t("cta")}
        </Button>
      </Container>
    </section>
  );
}

async function FaqPreview() {
  const t = await getTranslations("home.faq");
  const locale = await getLocale();
  const items = await getFaqItems(locale);
  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[360px_1fr]">
        <div>
          <SectionHeading title={t("title")} description={t("desc")} />
          <Button href="/faq" variant="ghost" arrow className="mt-6">
            {t("more")}
          </Button>
        </div>
        <FaqAccordion items={items.slice(0, 5)} />
      </Container>
    </section>
  );
}

async function FinalCta() {
  const t = await getTranslations("home.finalCta");
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="rounded-3xl bg-navy-dark px-8 py-14 text-center md:px-16 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/70">{t("sub")}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/offres" variant="light" size="lg">
              {t("ctaOffers")}
            </Button>
            <Button href="/demande" size="lg" className="border border-white/20 bg-transparent text-white hover:bg-white/10">
              {t("ctaRequest")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <HowItWorks />
      <FeaturedOffer />
      <RequesterPath />
      <DonorPath />
      <Engagement />
      <AntiFraud />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
