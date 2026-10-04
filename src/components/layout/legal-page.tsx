import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";

type LegalSection = { title: string; body?: string[]; items?: string[] };

export async function LegalPage({ namespace }: { namespace: "conditions" | "privacy" | "imprint" }) {
  const t = await getTranslations("legal");
  const sections = t.raw(`${namespace}.sections`) as LegalSection[];

  return (
    <div className="py-14 md:py-20">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">{t(`${namespace}.title`)}</h1>
        <p className="mt-4 rounded-xl border border-warning/40 bg-warning-soft px-4 py-3 text-sm text-ink">
          {t("notice")}
        </p>
        <div className="mt-10 space-y-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy [&_p]:mt-3 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-muted [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_li]:text-muted">
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body?.map((p, i) => <p key={i} className="whitespace-pre-line">{p}</p>)}
              {section.items ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
