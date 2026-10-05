import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { Container, SectionHeading } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq/faq-accordion";
import { getFaqItems } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale();
  return { title: t("faq"), description: t("faqDesc") , alternates: localeAlternates(locale, "/faq") };
}

export default async function FaqPage() {
  const t = await getTranslations("faqPage");
  const locale = await getLocale();
  const items = await getFaqItems(locale);
  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={t("title")} description={t("desc")} />
        <div className="mt-10">
          <FaqAccordion items={items} />
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="text-sm text-muted">{t("empty")}</p>
          <Button href="/contact" variant="secondary" className="mt-4">
            {t("cta")}
          </Button>
        </div>
      </Container>
    </div>
  );
}
