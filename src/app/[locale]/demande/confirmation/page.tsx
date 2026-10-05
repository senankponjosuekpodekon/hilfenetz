import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return { title: t("requestConfirm"), robots: { index: false } };
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const t = await getTranslations("requestConfirm");
  const tc = await getTranslations("common");
  const params = await searchParams;
  const ref = typeof params.ref === "string" ? params.ref : null;

  return (
    <div className="py-20 md:py-28">
      <Container className="max-w-xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-positive-soft">
          <CheckCircle2 className="size-8 text-positive" aria-hidden />
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">{t("title")}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("desc")}</p>
        {ref ? (
          <p className="mt-6 inline-block rounded-xl border border-border bg-surface px-5 py-3 text-sm font-medium text-ink">
            {t("ref")} : <span className="font-semibold text-navy">{ref}</span>
          </p>
        ) : null}
        <p className="mt-6 text-sm font-medium text-ink">{t("disclaimer")}</p>
        <Button href="/" variant="secondary" className="mt-8">
          {tc("backHome")}
        </Button>
      </Container>
    </div>
  );
}
