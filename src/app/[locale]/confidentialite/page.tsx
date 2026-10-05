import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { LegalPage } from "@/components/layout/legal-page";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale();
  return { title: t("privacy") , alternates: localeAlternates(locale, "/confidentialite") };
}

export default function PrivacyPage() {
  return <LegalPage namespace="privacy" />;
}
