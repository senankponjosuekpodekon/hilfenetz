import { Check, Eye, Flag, ShieldCheck, TriangleAlert, ClipboardList, FileText, Handshake, UserCheck } from "lucide-react";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container, SectionHeading } from "@/components/ui/container";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { FAQ_ITEMS } from "@/lib/faq-data";
import { formatAmount } from "@/lib/utils";

export const dynamic = "force-dynamic";

function Hero() {
  return (
    <section className="border-b border-border/60 bg-surface">
      <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[55fr_45fr]">
        <div>
          <Badge tone="trust">Plateforme de mise en relation</Badge>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.15] tracking-tight text-navy md:text-5xl">
            Des personnes prêtes à soutenir.
            <br />
            Des projets qui cherchent leur opportunité.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            HilfeNetz facilite la mise en relation entre donateurs et personnes présentant un projet,
            une initiative ou une situation nécessitant un soutien.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/offres" size="lg" arrow>
              Voir les offres de dons
            </Button>
            <Button href="/demande" variant="secondary" size="lg">
              Présenter ma demande
            </Button>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {["Plateforme transparente", "Demandes examinées", "Décision du donateur"].map((item) => (
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
            ✓ Demande examinée
          </div>
          <div className="absolute -bottom-5 -right-4 hidden rounded-xl border border-trust/30 bg-trust-soft px-4 py-2.5 text-xs font-medium text-trust md:block">
            Mise en relation
          </div>
          <div className="rounded-2xl border border-border bg-surface p-7 shadow-[0_8px_30px_rgb(16,42,67,0.08)]">
            <div className="flex items-center justify-between">
              <Badge tone="navy">Offre de don</Badge>
              <span className="flex items-center gap-1.5 text-xs font-medium text-positive">
                <Check className="size-3.5" aria-hidden /> Offre examinée
              </span>
            </div>
            <h2 className="mt-5 text-lg font-semibold text-navy">Soutien à un projet professionnel</h2>
            <p className="mt-5 text-xs uppercase tracking-wide text-muted">Montant proposé</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight text-ink">5 000 €</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Une opportunité de soutien pour un projet répondant aux critères du donateur.
            </p>
            <Button href="/demande" className="mt-6 w-full" arrow>
              Présenter ma demande
            </Button>
            <p className="mt-3 text-center text-xs text-muted">Décision finale : donateur</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: Eye, label: "Fonctionnement transparent" },
    { icon: ClipboardList, label: "Demandes examinées" },
    { icon: UserCheck, label: "Décision indépendante" },
    { icon: ShieldCheck, label: "Vigilance contre la fraude" },
  ];
  return (
    <section className="border-b border-border/60 bg-background">
      <Container className="py-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          Une plateforme conçue pour la clarté
        </p>
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

function HowItWorks() {
  const steps = [
    { n: "01", title: "Présentez votre demande", desc: "Décrivez votre projet, votre initiative ou votre situation." },
    { n: "02", title: "Votre demande est examinée", desc: "Les informations peuvent faire l'objet d'un contrôle administratif." },
    { n: "03", title: "Mise en relation", desc: "Votre demande peut être présentée à un donateur susceptible de s'y intéresser." },
    { n: "04", title: "Le donateur prend sa décision", desc: "Le donateur décide librement d'accorder ou non son soutien." },
    { n: "05", title: "Les conditions sont définies", desc: "Les éventuelles conditions sont établies entre les parties." },
  ];
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Une mise en relation en 5 étapes"
          description="De la présentation de votre situation à la décision du donateur, chaque étape est clairement définie."
        />
        <ol className="mt-12 grid gap-6 md:grid-cols-5 md:gap-4">
          {steps.map((step) => (
            <li
              key={step.n}
              className="group rounded-2xl border border-border bg-surface p-5 transition-colors duration-200 hover:border-trust"
            >
              <span className="text-sm font-semibold text-trust">{step.n}</span>
              <h3 className="mt-2 text-base font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center md:text-left">
          <Button href="/comment-ca-marche" variant="ghost" arrow>
            Voir le fonctionnement détaillé
          </Button>
        </div>
      </Container>
    </section>
  );
}

async function FeaturedOffer() {
  const offer = await db.donationOffer.findFirst({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <section className="border-y border-border/60 bg-surface py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Une offre de soutien peut changer une trajectoire."
          description="Découvrez les offres publiées par les donateurs et présentez votre situation lorsqu'elle correspond aux critères indiqués."
        />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          {offer ? (
            <div className="rounded-3xl border border-border bg-background p-8 md:p-10">
              <Badge tone="navy">Offre de don</Badge>
              <h3 className="mt-4 text-2xl font-semibold text-navy">{offer.title}</h3>
              <p className="mt-4 text-5xl font-semibold tracking-tight text-ink">
                {formatAmount(Number(offer.amount), offer.currency)}
              </p>
              <p className="mt-4 text-sm text-muted">
                Intérêt : Social · Professionnel · Communautaire
              </p>
              <p className="mt-2 text-xs text-muted">Décision finale : donateur</p>
              <Button href={`/offres/${offer.id}`} className="mt-7" arrow>
                Voir l&apos;offre
              </Button>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border bg-background p-8 md:p-10">
              <p className="text-lg font-semibold text-navy">Aucune offre disponible pour le moment.</p>
              <p className="mt-2 text-sm text-muted">
                Revenez prochainement pour découvrir les nouvelles propositions de soutien.
              </p>
            </div>
          )}
          <div className="lg:pl-4">
            <p className="text-sm leading-relaxed text-muted">
              Chaque offre précise ses critères et son montant proposé. Vérifiez que votre situation
              correspond avant de présenter votre demande.
            </p>
            <Button href="/offres" variant="secondary" className="mt-5" arrow>
              Voir toutes les offres
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function RequesterPath() {
  const steps = ["Décrivez votre situation", "Expliquez votre besoin", "Ajoutez votre message", "Envoyez votre demande"];
  return (
    <section className="py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 rounded-3xl border border-border bg-surface p-8 lg:order-1">
          <FileText className="size-8 text-trust" aria-hidden />
          <div className="mt-6 space-y-3">
            {["Vos informations", "Votre situation", "Votre message", "Confirmation"].map((label, i) => (
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
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-trust">Vous recherchez un soutien ?</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy md:text-4xl">
            Présentez votre projet ou votre situation en quelques étapes.
          </h2>
          <ol className="mt-8 space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="text-sm font-semibold text-trust">0{i + 1}</span>
                <span className="text-base text-ink">{step}</span>
              </li>
            ))}
          </ol>
          <Button href="/demande" className="mt-8" size="lg" arrow>
            Présenter ma demande
          </Button>
        </div>
      </Container>
    </section>
  );
}

function DonorPath() {
  const steps = ["Définissez votre offre", "Indiquez vos critères", "Recevez des demandes pertinentes"];
  return (
    <section className="border-y border-border/60 bg-navy py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-trust">Vous êtes donateur ?</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Vous souhaitez proposer votre soutien ?
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/70">
            Transmettez votre proposition à l&apos;équipe HilfeNetz pour examen. Vous définissez
            librement vos critères et gardez la décision finale.
          </p>
          <Button href="/don" variant="light" size="lg" className="mt-8" arrow>
            Proposer un don
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

function Engagement() {
  const cards = [
    { icon: Eye, title: "Transparence", desc: "Nous présentons clairement le fonctionnement de la plateforme et le rôle de chaque partie." },
    { icon: ShieldCheck, title: "Vigilance", desc: "Les annonces ou demandes manifestement frauduleuses peuvent être refusées ou supprimées." },
    { icon: Handshake, title: "Protection", desc: "Les informations transmises sont traitées dans le cadre du fonctionnement de la plateforme." },
    { icon: Flag, title: "Signalement", desc: "Tout utilisateur peut signaler une annonce ou un comportement suspect." },
  ];
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Notre engagement : clarté, vigilance et responsabilité."
          align="center"
        />
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

function AntiFraud() {
  return (
    <section className="border-y border-warning/40 bg-warning-soft py-14 md:py-16">
      <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-warning/15">
          <TriangleAlert className="size-6 text-warning" aria-hidden />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-warning">Vigilance</p>
          <h2 className="mt-1 text-2xl font-semibold text-navy md:text-3xl">Ne payez jamais pour obtenir un don.</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/80 md:text-base">
            HilfeNetz ne demande aucun paiement pour garantir l&apos;obtention d&apos;un don. Ne
            communiquez jamais vos données bancaires sensibles dans votre demande.
          </p>
        </div>
        <Button href="/signaler" variant="secondary" className="shrink-0">
          Signaler une annonce
        </Button>
      </Container>
    </section>
  );
}

function FaqPreview() {
  return (
    <section className="py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[360px_1fr]">
        <div>
          <SectionHeading
            title="Questions fréquentes"
            description="Les réponses aux questions essentielles sur le fonctionnement de HilfeNetz."
          />
          <Button href="/faq" variant="ghost" arrow className="mt-6">
            Voir toutes les questions
          </Button>
        </div>
        <FaqAccordion items={FAQ_ITEMS.slice(0, 5)} />
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="rounded-3xl bg-navy-dark px-8 py-14 text-center md:px-16 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Une demande. Une proposition.
            <br />
            Une possibilité de rencontre.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/70">
            Découvrez comment fonctionne HilfeNetz.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/offres" variant="light" size="lg">
              Voir les offres
            </Button>
            <Button href="/demande" size="lg" className="border border-white/20 bg-transparent text-white hover:bg-white/10">
              Présenter une demande
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
