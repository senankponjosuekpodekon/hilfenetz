import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatAmount, formatDate } from "@/lib/utils";

export async function OfferCard({
  offer,
}: {
  offer: {
    id: string;
    title: string;
    donorName: string | null;
    amount: unknown;
    currency: string;
    category: string;
    publishedAt: Date | null;
  };
}) {
  const t = await getTranslations("common");
  const locale = await getLocale();

  return (
    <Link
      href={`/offres/${offer.id}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-1 hover:border-trust"
    >
      <Badge tone="navy" className="w-fit">{t("offerBadge")}</Badge>
      <h3 className="mt-4 text-base font-semibold text-navy">{t("offerSubtitle")}</h3>
      <p className="mt-1.5 text-sm text-muted">
        {t("donor")} : {offer.donorName || t("anonymous")}
      </p>
      <p className="mt-4 text-xs uppercase tracking-wide text-muted">{t("amountProposed")}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-ink">
        {formatAmount(Number(offer.amount), offer.currency, locale)}
      </p>
      <p className="mt-3 text-sm text-muted">
        {offer.title} · {t(`categories.${offer.category}`)}
      </p>
      <p className="mt-1 text-xs text-muted">{t("publishedOn", { date: formatDate(offer.publishedAt, locale) })}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-trust">
        {t("viewDetails")}
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
