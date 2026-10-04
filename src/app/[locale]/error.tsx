"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("errorPage");
  return (
    <div className="py-24 md:py-32">
      <Container className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-navy">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("desc")}</p>
        <Button onClick={reset} className="mt-8">
          {t("retry")}
        </Button>
      </Container>
    </div>
  );
}
