import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";

export async function Footer() {
  const t = await getTranslations("footer");
  const tn = await getTranslations("nav");
  const tc = await getTranslations("common");

  const columns = [
    {
      title: t("platform"),
      links: [
        { href: "/comment-ca-marche", label: tn("howItWorks") },
        { href: "/offres", label: t("offersLink") },
        { href: "/demande", label: t("requestLink") },
      ],
    },
    {
      title: t("information"),
      links: [
        { href: "/a-propos", label: t("aboutLink") },
        { href: "/faq", label: "FAQ" },
        { href: "/contact", label: t("contactLink") },
        { href: "/signaler", label: t("reportLink") },
      ],
    },
    {
      title: t("legal"),
      links: [
        { href: "/conditions", label: t("termsLink") },
        { href: "/confidentialite", label: t("privacyLink") },
        { href: "/mentions-legales", label: t("imprintLink") },
      ],
    },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{t("tagline")}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-navy">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-navy">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-muted">{t("copyright", { year: 2026 })}</p>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted">{tc("legalDisclaimer")}</p>
        </div>
      </div>
    </footer>
  );
}
