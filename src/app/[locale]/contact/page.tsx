import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { Mail, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";
import { getSiteSettings } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale();
  return { title: t("contact"), description: t("contactDesc") , alternates: localeAlternates(locale, "/contact") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const settings = await getSiteSettings();
  return (
    <div className="py-14 md:py-20">
      <Container className="grid gap-12 lg:grid-cols-[380px_1fr]">
        <div>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{t("sub")}</p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4">
              <Mail className="size-5 text-trust" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("email")}</p>
                <p className="text-sm font-medium text-ink">{settings.contactEmail}</p>
              </div>
            </li>
            <li className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4">
              <MessageSquare className="size-5 text-trust" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">{t("phone")}</p>
                <p className="text-sm font-medium text-ink">
                  {settings.contactPhone || t("phoneSoon")}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6 md:p-10">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
