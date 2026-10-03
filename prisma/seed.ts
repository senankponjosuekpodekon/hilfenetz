import { PrismaClient } from "@prisma/client";
import { scryptSync, randomBytes } from "node:crypto";
import { FAQ_ITEMS } from "../src/lib/faq-data.ts";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

async function main() {
  const email = process.env.ADMIN_EMAIL ?? "admin@hilfenetz.local";
  const password = process.env.ADMIN_PASSWORD ?? "change-me-in-production";

  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash: hashPassword(password), role: "ADMIN" },
  });

  await prisma.donationOffer.createMany({
    data: [
      {
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
        title: "Soutien à une situation sociale",
        donorName: "Donateur anonyme",
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
        title: "Brouillon — Soutien formation",
        description: "Offre en préparation destinée au financement de formations courtes.",
        amount: 2500,
        category: "PROFESSIONAL",
        status: "DRAFT",
      },
    ],
  });

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
