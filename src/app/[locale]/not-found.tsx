import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const tc = await getTranslations("common");
  return (
    <div className="py-24 md:py-32">
      <Container className="text-center">
        <p className="text-sm font-semibold text-trust">404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-navy">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("desc")}</p>
        <Button href="/" className="mt-8">
          {tc("backHome")}
        </Button>
      </Container>
    </div>
  );
}
