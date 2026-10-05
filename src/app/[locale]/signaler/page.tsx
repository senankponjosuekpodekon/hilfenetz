import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { Flag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ReportForm } from "@/components/forms/report-form";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale();
  return { title: t("report"), description: t("reportDesc") , alternates: localeAlternates(locale, "/signaler") };
}

export default async function ReportPage() {
  const t = await getTranslations("report");
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-warning-soft">
          <Flag className="size-6 text-warning" aria-hidden />
        </div>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{t("sub")}</p>
        <div className="mt-10 rounded-3xl border border-border bg-surface p-6 md:p-10">
          <ReportForm />
        </div>
      </Container>
    </div>
  );
}
