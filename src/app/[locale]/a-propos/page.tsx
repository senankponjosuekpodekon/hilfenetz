import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";
import { ArrowDown, X } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/container";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const locale = await getLocale();
  return { title: t("about"), description: t("aboutDesc") , alternates: localeAlternates(locale, "/a-propos") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const notList = t.raw("notList") as string[];

  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-4xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className="mt-14 space-y-14">
          <section>
            <h2 className="text-2xl font-semibold text-navy">{t("missionTitle")}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t("missionBody")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy">{t("roleTitle")}</h2>
            <div className="mt-6 flex flex-col items-center gap-2 rounded-3xl border border-border bg-surface py-10">
              <span className="rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold text-navy">{t("roleDonor")}</span>
              <ArrowDown className="size-5 text-muted" aria-hidden />
              <span className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white">HILFENETZ</span>
              <ArrowDown className="size-5 text-muted" aria-hidden />
              <span className="rounded-full border border-border bg-background px-5 py-2 text-sm font-semibold text-navy">{t("roleRequester")}</span>
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">{t("roleBody")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy">{t("notTitle")}</h2>
            <ul className="mt-6 space-y-3">
              {notList.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-xl border border-border bg-surface px-5 py-4">
                  <X className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden />
                  <span className="text-sm text-ink md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-navy">{t("commitmentTitle")}</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{t("commitmentBody")}</p>
          </section>
        </div>
      </Container>
    </div>
  );
}
