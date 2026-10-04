import { PrismaClient } from "@prisma/client";
import { scryptSync, randomBytes } from "node:crypto";
import { FAQ_ITEMS } from "../src/lib/faq-data.ts";
import { DEMO_OFFERS } from "../src/lib/demo-offers.ts";

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

  // Seed idempotent par langue : une langue existante n'est jamais recréée.
  for (const locale of ["fr", "de", "it", "es", "pt"]) {
    const count = await prisma.donationOffer.count({ where: { locale } });
    if (count > 0) {
      console.log(`Offres ${locale} déjà présentes — ignoré`);
      continue;
    }
    const data = DEMO_OFFERS.filter((o) => o.locale === locale);
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
