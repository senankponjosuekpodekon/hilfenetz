import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatAmount, formatDate } from "@/lib/utils";

const CATEGORY_TONES: Record<string, { badge: "violet" | "accent" | "amber"; amount: string }> = {
  SOCIAL: { badge: "accent", amount: "text-accent-dark" },
  PROFESSIONAL: { badge: "violet", amount: "text-violet" },
  COMMUNITY: { badge: "amber", amount: "text-warning" },
};

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
  const tone = CATEGORY_TONES[offer.category] ?? { badge: "violet" as const, amount: "text-violet" };

  return (
    <Link
      href={`/offres/${offer.id}`}
      className="group flex flex-col rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 hover:shadow-card-hover"
    >
      <div className="flex items-center justify-between">
        <Badge tone={tone.badge}>{t("offerBadge")}</Badge>
        <span className="rounded-full bg-background px-2.5 py-1 text-xs font-medium text-muted">
          {t(`categories.${offer.category}`)}
        </span>
      </div>
      <h3 className="mt-4 font-display text-base font-semibold text-ink">{t("offerSubtitle")}</h3>
      <p className="mt-1.5 text-sm text-muted">
        {t("donor")} : {offer.donorName || t("anonymous")}
      </p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">{t("amountProposed")}</p>
      <p className={`mt-1 font-display text-3xl font-semibold tracking-tight ${tone.amount}`}>
        {formatAmount(Number(offer.amount), offer.currency, locale)}
      </p>
      <p className="mt-3 text-sm text-muted">{offer.title}</p>
      <p className="mt-1 text-xs text-muted">{t("publishedOn", { date: formatDate(offer.publishedAt, locale) })}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-violet">
        {t("viewDetails")}
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      </span>
    </Link>
  );
}
