import Image from "next/image";
import { Check, Eye, Flag, ShieldCheck, ClipboardList, FileText, Handshake, UserCheck, Sparkles, Euro, HeartHandshake } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, SectionHeading } from "@/components/ui/container";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { HeroOffersSlider } from "@/components/offers/hero-offers-slider";
import { Reveal } from "@/components/ui/reveal";
import { getFaqItems } from "@/lib/content";
import { formatAmount } from "@/lib/utils";
import { SITE_URL } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export const dynamic = "force-dynamic";

async function Hero() {
  const t = await getTranslations("home.hero");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const checks = t.raw("checks") as string[];
  const offers = await db.donationOffer.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: 8,
  });
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-surface">
      {/* Photo de fond + voile pour la lisibilité */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/hero-community.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-surface/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
        {/* Voile renforcé en mobile — la colonne texte+carte passe sous la photo */}
        <div className="absolute inset-0 bg-surface/60 lg:hidden" />
      </div>

      <Container className="relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[55fr_45fr]">
        <div className="anim-fade-up">
          <Badge tone="violet">
            <Sparkles className="size-3.5" aria-hidden />
            {t("badge")}
          </Badge>
          <h1 className="mt-5 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-4xl md:text-6xl">
            {t("title1")}
            <br />
            <span className="anim-fade-up relative inline-block text-violet" style={{ animationDelay: "0.25s" }}>
              {t("title2")}
              <span className="anim-underline absolute -bottom-1 left-0 h-1 rounded-full bg-accent" aria-hidden />
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-ink/80 md:text-lg">{t("sub")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/offres" size="lg" arrow>
              {t("ctaOffers")}
            </Button>
            <Button href="/demande" variant="secondary" size="lg">
              {t("ctaRequest")}
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink/80">
            {checks.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-positive-soft">
                  <Check className="size-3 text-positive" aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Composition produit — carrousel d'offres + éléments flottants */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="anim-float absolute -left-4 -top-6 z-10 hidden items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-ink shadow-card lg:flex">
            <span className="flex size-6 items-center justify-center rounded-full bg-positive-soft">
              <Check className="size-3.5 text-positive" aria-hidden />
            </span>
            {t("cardReviewed")}
          </div>
          <div className="anim-float absolute -bottom-5 -right-3 z-10 hidden items-center gap-2 rounded-xl border border-violet/20 bg-violet-soft px-4 py-2.5 text-xs font-semibold text-violet shadow-card lg:flex" style={{ animationDelay: "1.2s" }}>
            <HeartHandshake className="size-4" aria-hidden />
            {t("cardConnection")}
          </div>
          <div className="absolute -right-8 -top-10 hidden size-20 rotate-12 rounded-2xl bg-amber shadow-card lg:block" aria-hidden>
            <Euro className="absolute inset-0 m-auto size-8 text-navy" aria-hidden />
          </div>

          <HeroOffersSlider
            offers={offers}
            locale={locale}
            labels={{
              offerBadge: tc("offerBadge"),
              offerSubtitle: tc("offerSubtitle"),
              verified: t("cardVerified"),
              donor: tc("donor"),
              anonymous: tc("anonymous"),
              amountProposed: tc("amountProposed"),
              submitRequest: tc("submitRequest"),
              decisionDonor: tc("decisionDonor"),
              noOffers: tc("noOffersTitle"),
            }}
          />
        </div>
      </Container>
    </section>
  );
}

async function TrustBar() {
  const t = await getTranslations("home.trustBar");
  const tones = ["bg-violet-soft text-violet", "bg-accent-soft text-accent-dark", "bg-amber-soft text-warning", "bg-positive-soft text-positive"];
  const items = (t.raw("items") as string[]).map((label, i) => ({
    icon: [Eye, ClipboardList, UserCheck, ShieldCheck][i],
    label,
    tone: tones[i % tones.length],
  }));
  return (
    <section className="border-b border-border/60 bg-background">
      <Container className="py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted">{t("title")}</p>
        <div className="mt-6 flex gap-3 overflow-x-auto pb-1 md:grid md:grid-cols-4 md:overflow-visible">
          {items.map(({ icon: Icon, label, tone }, i) => (
            <Reveal key={label} delay={i * 60} className="min-w-52 md:min-w-0">
            <div
              className="flex h-full items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface px-4 py-3.5 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${tone}`}>
                <Icon className="size-4" aria-hidden />
              </span>
              <span className="text-sm font-medium text-ink">{label}</span>
            </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

async function Stats() {
  const t = await getTranslations("home.stats");
  const locale = await getLocale();
  const [offersCount, categories, requestsCount] = await Promise.all([
    db.donationOffer.count({ where: { status: "PUBLISHED" } }),
    db.donationOffer.findMany({ where: { status: "PUBLISHED" }, select: { category: true }, distinct: ["category"] }),
    db.supportRequest.count(),
  ]);
  const nf = new Intl.NumberFormat(locale);
  const stats = [
    { value: nf.format(offersCount), label: t("offers"), tone: "text-accent" },
    { value: nf.format(categories.length), label: t("categories"), tone: "text-violet" },
    { value: nf.format(requestsCount), label: t("requests"), tone: "text-iris" },
  ];
  return (
    <section className="border-b border-border/60 bg-surface">
      <Container className="grid grid-cols-1 gap-8 py-12 text-center sm:grid-cols-3 md:py-14">
        {/* Reveal per stat via wrapper divs below */}
        {stats.map((s) => (
          <div key={s.label}>
            <p className={`font-display text-4xl font-semibold tracking-tight md:text-5xl ${s.tone}`}>{s.value}</p>
            <p className="mt-2 text-sm font-medium text-muted">{s.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

async function HowItWorks() {
  const t = await getTranslations("home.howItWorks");
  const steps = t.raw("steps") as { title: string; desc: string }[];
  const accents = ["bg-violet text-white", "bg-accent text-white", "bg-amber text-navy", "bg-iris text-white", "bg-positive text-white"];
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading title={t("title")} description={t("desc")} />
        <ol className="mt-12 grid gap-5 md:grid-cols-5 md:gap-4">
          {steps.map((step, i) => (
            <li key={step.title} className="contents">
              <Reveal delay={i * 80}>
              <div className="group h-full rounded-[var(--radius-card)] border border-border bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <span className={`flex size-9 items-center justify-center rounded-xl font-display text-sm font-semibold ${accents[i % accents.length]}`}>
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
              </div>
              </Reveal>
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
        <Reveal><div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          {offer ? (
            <div className="relative overflow-hidden rounded-3xl border border-border bg-background p-8 shadow-card md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent-soft" aria-hidden />
              <Badge tone="accent">{tc("offerBadge")}</Badge>
              <h3 className="mt-4 font-display text-2xl font-semibold text-ink">{tc("offerSubtitle")}</h3>
              <p className="mt-2 text-sm text-muted">
                {tc("donor")} : {offer.donorName || tc("anonymous")}
              </p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">{tc("amountProposed")}</p>
              <p className="mt-1 font-display text-5xl font-semibold tracking-tight text-ink">
                {formatAmount(Number(offer.amount), offer.currency, locale)}
              </p>
              <p className="mt-4 text-sm font-medium text-violet">{offer.title}</p>
              <p className="mt-2 text-xs text-muted">{tc("decisionDonor")}</p>
              <Button href={`/offres/${offer.id}`} className="mt-7" arrow>
                {t("viewOffer")}
              </Button>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-background p-8 md:p-10">
              <p className="font-display text-lg font-semibold text-ink">{tc("noOffersTitle")}</p>
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
        </Reveal>
      </Container>
    </section>
  );
}

async function RequesterPath() {
  const t = await getTranslations("home.requester");
  const ti = await getTranslations("home.images");
  const tc = await getTranslations("common");
  const steps = t.raw("steps") as string[];
  const formSteps = t.raw("formSteps") as string[];
  return (
    <section className="py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 overflow-hidden rounded-3xl border border-border bg-surface shadow-card lg:order-1">
          <div className="relative h-44 w-full">
            <Image
              src="/images/woman-laptop.jpg"
              alt={ti("heroPhoto")}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="p-8">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-violet-soft">
            <FileText className="size-6 text-violet" aria-hidden />
          </div>
          <div className="mt-6 space-y-3">
            {formSteps.map((label, i) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-colors duration-200 hover:border-violet/40">
                <span className="flex size-7 items-center justify-center rounded-full bg-violet text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-medium text-ink">{label}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet">{t("eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">{t("title")}</h2>
          <ol className="mt-8 space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-semibold text-accent-dark">
                  {i + 1}
                </span>
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
  const ti = await getTranslations("home.images");
  const steps = t.raw("steps") as string[];
  return (
    <section className="relative overflow-hidden border-y border-violet/20 bg-violet-dark py-20 md:py-28">
      <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-iris/20" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -right-16 size-80 rounded-full bg-accent/15" aria-hidden />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber">{t("eyebrow")}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">{t("title")}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">{t("desc")}</p>
          <Button href="/contact" variant="light" size="lg" className="mt-8" arrow>
            {t("cta")}
          </Button>
          <div className="mt-8 hidden overflow-hidden rounded-[var(--radius-card)] border border-white/15 lg:block">
            <Image
              src="/images/community-hands.jpg"
              alt={ti("donorPhoto")}
              width={560}
              height={320}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-44 w-full object-cover"
            />
          </div>
        </div>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-4 rounded-[var(--radius-card)] border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 font-display text-sm font-semibold text-amber">
                {i + 1}
              </span>
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
  const tones = [
    "bg-violet-soft text-violet",
    "bg-accent-soft text-accent-dark",
    "bg-amber-soft text-warning",
    "bg-rose-soft text-accent-dark",
  ];
  const cards = (t.raw("cards") as { title: string; desc: string }[]).map((card, i) => ({
    ...card,
    icon: [Eye, ShieldCheck, Handshake, Flag][i],
    tone: tones[i % tones.length],
  }));
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading title={t("title")} align="center" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, desc, tone }, i) => (
            <Reveal key={title} delay={i * 80}>
            <div className="h-full rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
              <div className={`flex size-11 items-center justify-center rounded-xl ${tone}`}>
                <Icon className="size-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{desc}</p>
            </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

async function Confidence() {
  const t = await getTranslations("home.confidence");
  const items = (t.raw("items") as { title: string; desc: string }[]).map((item, i) => ({
    ...item,
    icon: [Euro, Eye, Flag][i],
    tone: ["bg-accent-soft text-accent-dark", "bg-violet-soft text-violet", "bg-amber-soft text-warning"][i],
  }));
  return (
    <section className="border-y border-border/60 bg-surface py-16 md:py-20">
      <Container>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
          {t("title")}
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {items.map(({ icon: Icon, title, desc, tone }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="flex h-full gap-4 rounded-[var(--radius-card)] border border-border bg-background p-6">
                <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tone}`}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

async function Testimonials() {
  const t = await getTranslations("home.testimonials");
  const items = t.raw("items") as { quote: string; name: string; meta: string }[];
  const tones = ["bg-violet-soft text-violet", "bg-accent-soft text-accent-dark", "bg-amber-soft text-warning"];
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading title={t("title")} description={t("desc")} />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
                <span className={`flex size-9 items-center justify-center rounded-xl font-display text-lg font-semibold ${tones[i % tones.length]}`} aria-hidden>
                  «
                </span>
                <blockquote className="mt-4 flex-1">
                  <p className="text-sm leading-relaxed text-ink">{item.quote}</p>
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="font-display text-sm font-semibold text-ink">{item.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{item.meta}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted">{t("disclaimer")}</p>
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
        <div className="relative overflow-hidden rounded-3xl bg-navy-dark px-8 py-14 text-center md:px-16 md:py-20">
          <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-violet/25" aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 -right-12 size-64 rounded-full bg-accent/20" aria-hidden />
          <div className="relative">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {t("title1")}
              <br />
              {t("title2")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/70">{t("sub")}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href="/offres" variant="light" size="lg">
                {t("ctaOffers")}
              </Button>
              <Button href="/demande" size="lg" className="border border-white/20 bg-transparent text-white shadow-none hover:bg-white/10">
                {t("ctaRequest")}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "HilfeNetz",
        url: SITE_URL,
        logo: `${SITE_URL}/images/logo.png`,
        email: "kontakt@hilfenetz.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Musterstraße 25",
          postalCode: "10115",
          addressLocality: "Berlin",
          addressCountry: "DE",
        },
      },
      {
        "@type": "WebSite",
        name: "HilfeNetz",
        url: SITE_URL,
        inLanguage: routing.locales,
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <FeaturedOffer />
      <Stats />
      <RequesterPath />
      <DonorPath />
      <Engagement />
      <Confidence />
      <Testimonials />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
