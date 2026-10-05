import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { db } from "@/lib/db";
import { localeAlternates } from "@/lib/seo";
import { Container, Alert } from "@/components/ui/container";
import { RequestForm } from "./request-form";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale();
  return { title: t("request"), description: t("requestDesc") , alternates: localeAlternates(locale, "/demande") };
}

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const t = await getTranslations("request");
  const params = await searchParams;
  const offerId = typeof params.offre === "string" ? params.offre : undefined;
  const offer = offerId
    ? await db.donationOffer.findFirst({ where: { id: offerId, status: "PUBLISHED" } })
    : null;

  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">{t("title")}</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{t("intro")}</p>

        <div className="mt-6">
          <Alert tone="info">{t("warning")}</Alert>
        </div>

        <div className="mt-10">
          <RequestForm offerId={offer?.id} offerTitle={offer?.title} />
        </div>
      </Container>
    </div>
  );
}
