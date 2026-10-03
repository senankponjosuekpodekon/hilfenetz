import type { Metadata } from "next";
import { db } from "@/lib/db";
import { Container, Alert } from "@/components/ui/container";
import { RequestForm } from "./request-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Présenter une demande",
  description: "Présentez votre projet, votre initiative ou votre situation en quelques étapes.",
};

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const offerId = typeof params.offre === "string" ? params.offre : undefined;
  const offer = offerId
    ? await db.donationOffer.findFirst({ where: { id: offerId, status: "PUBLISHED" } })
    : null;

  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-navy md:text-5xl">
          Présenter ma demande
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Expliquez votre situation, votre initiative ou votre projet. Une fois examinée, votre
          demande peut être présentée à un donateur correspondant aux critères d&apos;une offre.
        </p>

        <div className="mt-6">
          <Alert tone="info">
            Ne communiquez jamais vos données bancaires sensibles dans votre demande. La soumission
            d&apos;une demande ne garantit pas l&apos;obtention d&apos;un don.
          </Alert>
        </div>

        <div className="mt-10">
          <RequestForm offerId={offer?.id} offerTitle={offer?.title} />
        </div>
      </Container>
    </div>
  );
}
