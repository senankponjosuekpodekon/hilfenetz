import { PrismaClient } from "@prisma/client";
import { scryptSync, randomBytes } from "node:crypto";
import { FAQ_ITEMS } from "../src/lib/faq-data.ts";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

type SeedOffer = {
  locale: string;
  title: string;
  donorName?: string;
  description: string;
  donorMessage?: string;
  amount: number;
  category: "SOCIAL" | "PROFESSIONAL" | "COMMUNITY";
  criteria?: string;
  status: "PUBLISHED" | "DRAFT";
  publishedAt?: Date;
};

const OFFERS: SeedOffer[] = [
  // ─── FR ───
  {
    locale: "fr",
    title: "Soutien à un projet professionnel",
    donorName: "Laurent D.",
    description:
      "Un donateur souhaite soutenir un projet ou une situation présentant un intérêt professionnel : création d'activité, reconversion, développement d'une compétence.",
    donorMessage:
      "Je souhaite proposer un don afin de soutenir une personne, une initiative ou un projet présentant un intérêt social, professionnel ou communautaire.",
    amount: 5000,
    category: "PROFESSIONAL",
    criteria: "Projet professionnel clairement décrit, objectifs réalistes, besoin motivé.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-28"),
  },
  {
    locale: "fr",
    title: "Soutien à une initiative communautaire",
    donorName: "Marie K.",
    description:
      "Offre destinée aux initiatives à portée collective : association, projet de quartier, action solidaire locale.",
    donorMessage:
      "Je souhaite soutenir une initiative qui bénéficie directement à une communauté ou à un groupe de personnes.",
    amount: 3000,
    category: "COMMUNITY",
    criteria: "Impact communautaire démontrable, porteur identifié, initiative concrète.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-20"),
  },
  {
    locale: "fr",
    title: "Soutien à une situation sociale",
    description:
      "Un donateur souhaite apporter un soutien ponctuel à une personne traversant une situation difficile.",
    donorMessage:
      "Je souhaite aider une personne qui fait face à une situation sociale ou personnelle nécessitant un soutien.",
    amount: 1500,
    category: "SOCIAL",
    criteria: "Situation décrite avec exactitude, besoin réel et vérifiable.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-12"),
  },
  {
    locale: "fr",
    title: "Brouillon — Soutien formation",
    description: "Offre en préparation destinée au financement de formations courtes.",
    amount: 2500,
    category: "PROFESSIONAL",
    status: "DRAFT",
  },
  // ─── DE ───
  {
    locale: "de",
    title: "Unterstützung für ein berufliches Projekt",
    donorName: "Laurent D.",
    description:
      "Ein Spender möchte ein Projekt oder eine Situation mit beruflichem Interesse unterstützen: Gründung einer Tätigkeit, berufliche Neuorientierung, Entwicklung einer Kompetenz.",
    donorMessage:
      "Ich möchte eine Spende anbieten, um eine Person, eine Initiative oder ein Projekt mit sozialem, beruflichem oder gemeinschaftlichem Interesse zu unterstützen.",
    amount: 5000,
    category: "PROFESSIONAL",
    criteria: "Klar beschriebenes berufliches Projekt, realistische Ziele, begründeter Bedarf.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-28"),
  },
  {
    locale: "de",
    title: "Unterstützung für eine gemeinschaftliche Initiative",
    donorName: "Marie K.",
    description:
      "Angebot für Initiativen mit kollektiver Reichweite: Verein, Nachbarschaftsprojekt, lokale Solidaritätsaktion.",
    donorMessage:
      "Ich möchte eine Initiative unterstützen, die einer Gemeinschaft oder einer Gruppe von Menschen direkt zugutekommt.",
    amount: 3000,
    category: "COMMUNITY",
    criteria: "Nachweisbare gemeinschaftliche Wirkung, identifizierter Träger, konkrete Initiative.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-20"),
  },
  {
    locale: "de",
    title: "Unterstützung in einer sozialen Situation",
    description:
      "Ein Spender möchte eine Person in einer schwierigen Lage punktuell unterstützen.",
    donorMessage:
      "Ich möchte einer Person helfen, die mit einer sozialen oder persönlichen Situation konfrontiert ist, die Unterstützung erfordert.",
    amount: 1500,
    category: "SOCIAL",
    criteria: "Genaue Beschreibung der Situation, realer und nachprüfbarer Bedarf.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-12"),
  },
  // ─── IT ───
  {
    locale: "it",
    title: "Sostegno a un progetto professionale",
    donorName: "Laurent D.",
    description:
      "Un donatore desidera sostenere un progetto o una situazione con un interesse professionale: avvio di un'attività, riconversione, sviluppo di una competenza.",
    donorMessage:
      "Desidero proporre una donazione per sostenere una persona, un'iniziativa o un progetto con un interesse sociale, professionale o comunitario.",
    amount: 5000,
    category: "PROFESSIONAL",
    criteria: "Progetto professionale descritto chiaramente, obiettivi realistici, bisogno motivato.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-28"),
  },
  {
    locale: "it",
    title: "Sostegno a un'iniziativa comunitaria",
    donorName: "Marie K.",
    description:
      "Offerta destinata a iniziative a portata collettiva: associazione, progetto di quartiere, azione solidale locale.",
    donorMessage:
      "Desidero sostenere un'iniziativa che porti beneficio diretto a una comunità o a un gruppo di persone.",
    amount: 3000,
    category: "COMMUNITY",
    criteria: "Impatto comunitario dimostrabile, portatore identificato, iniziativa concreta.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-20"),
  },
  {
    locale: "it",
    title: "Sostegno a una situazione sociale",
    description:
      "Un donatore desidera offrire un sostegno puntuale a una persona che attraversa una situazione difficile.",
    donorMessage:
      "Desidero aiutare una persona che affronta una situazione sociale o personale che richiede sostegno.",
    amount: 1500,
    category: "SOCIAL",
    criteria: "Situazione descritta con esattezza, bisogno reale e verificabile.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-12"),
  },
  // ─── ES ───
  {
    locale: "es",
    title: "Apoyo a un proyecto profesional",
    donorName: "Laurent D.",
    description:
      "Un donante desea apoyar un proyecto o una situación con interés profesional: creación de una actividad, reconversión, desarrollo de una competencia.",
    donorMessage:
      "Deseo proponer una donación para apoyar a una persona, una iniciativa o un proyecto con interés social, profesional o comunitario.",
    amount: 5000,
    category: "PROFESSIONAL",
    criteria: "Proyecto profesional claramente descrito, objetivos realistas, necesidad motivada.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-28"),
  },
  {
    locale: "es",
    title: "Apoyo a una iniciativa comunitaria",
    donorName: "Marie K.",
    description:
      "Oferta destinada a iniciativas de alcance colectivo: asociación, proyecto de barrio, acción solidaria local.",
    donorMessage:
      "Deseo apoyar una iniciativa que beneficie directamente a una comunidad o a un grupo de personas.",
    amount: 3000,
    category: "COMMUNITY",
    criteria: "Impacto comunitario demostrable, portador identificado, iniciativa concreta.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-20"),
  },
  {
    locale: "es",
    title: "Apoyo a una situación social",
    description:
      "Un donante desea aportar un apoyo puntual a una persona que atraviesa una situación difícil.",
    donorMessage:
      "Deseo ayudar a una persona que enfrenta una situación social o personal que requiere apoyo.",
    amount: 1500,
    category: "SOCIAL",
    criteria: "Situación descrita con exactitud, necesidad real y verificable.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-12"),
  },
  // ─── PT ───
  {
    locale: "pt",
    title: "Apoio a um projeto profissional",
    donorName: "Laurent D.",
    description:
      "Um doador deseja apoiar um projeto ou uma situação com interesse profissional: criação de atividade, reconversão, desenvolvimento de uma competência.",
    donorMessage:
      "Desejo propor uma doação para apoiar uma pessoa, uma iniciativa ou um projeto com interesse social, profissional ou comunitário.",
    amount: 5000,
    category: "PROFESSIONAL",
    criteria: "Projeto profissional claramente descrito, objetivos realistas, necessidade fundamentada.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-28"),
  },
  {
    locale: "pt",
    title: "Apoio a uma iniciativa comunitária",
    donorName: "Marie K.",
    description:
      "Oferta destinada a iniciativas de alcance coletivo: associação, projeto de bairro, ação solidária local.",
    donorMessage:
      "Desejo apoiar uma iniciativa que beneficie diretamente uma comunidade ou um grupo de pessoas.",
    amount: 3000,
    category: "COMMUNITY",
    criteria: "Impacto comunitário demonstrável, portador identificado, iniciativa concreta.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-20"),
  },
  {
    locale: "pt",
    title: "Apoio a uma situação social",
    description:
      "Um doador deseja dar um apoio pontual a uma pessoa que atravessa uma situação difícil.",
    donorMessage:
      "Desejo ajudar uma pessoa que enfrenta uma situação social ou pessoal que necessita de apoio.",
    amount: 1500,
    category: "SOCIAL",
    criteria: "Situação descrita com exatidão, necessidade real e verificável.",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-12"),
  },
];

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@hilfenetz.local";
  const password = process.env.ADMIN_PASSWORD ?? "change-me-in-production";

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash: hashPassword(password), role: "ADMIN" },
  });

  // Seed idempotent par langue : une langue existante n'est jamais recréée.
  for (const locale of ["fr", "de", "it", "es", "pt"]) {
    const count = await prisma.donationOffer.count({ where: { locale } });
    if (count > 0) {
      console.log(`Offres ${locale} déjà présentes — ignoré`);
      continue;
    }
    const data = OFFERS.filter((o) => o.locale === locale);
    if (data.length > 0) {
      await prisma.donationOffer.createMany({ data });
      console.log(`Offres ${locale} créées : ${data.length}`);
    }
  }

  // Paramètres du site
  for (const [key, value] of Object.entries({
    contactEmail: "contact@hilfenetz.example",
    contactPhone: "",
  })) {
    await prisma.siteSetting.upsert({ where: { key }, update: {}, create: { key, value } });
  }

  // Questions FAQ initiales
  const faqCount = await prisma.faqItem.count();
  if (faqCount === 0) {
    await prisma.faqItem.createMany({
      data: FAQ_ITEMS.map((item, i) => ({
        question: item.q,
        answer: item.a,
        order: i,
      })),
    });
  }
}

main()
  .then(async () => {
    console.log("Seed terminé");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
