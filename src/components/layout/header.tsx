import { getTranslations, getLocale } from "next-intl/server";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NAV_LINKS } from "@/lib/nav";
import { buttonClasses } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { getSiteSettings } from "@/lib/content";

export async function Header() {
  const t = await getTranslations("nav");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  const settings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-40">
      {/* Topbar réassurance */}
      <div className="hidden border-b border-white/10 bg-navy-dark lg:block">
        <div className="mx-auto flex h-9 w-full max-w-6xl items-center justify-between px-6 text-xs text-white/70">
          <div className="flex items-center gap-5">
            <a href={`mailto:${settings.contactEmail}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Mail className="size-3.5" aria-hidden />
              {settings.contactEmail}
            </a>
            {settings.contactPhone ? (
              <a href={`tel:${settings.contactPhone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 transition-colors hover:text-white">
                <Phone className="size-3.5" aria-hidden />
                {settings.contactPhone}
              </a>
            ) : null}
          </div>
          <p className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-amber" aria-hidden />
            {tc("legalDisclaimer")}
          </p>
        </div>
      </div>

      {/* Nav principale */}
      <div className="border-b border-white/10 bg-navy-dark lg:border-border/70 lg:bg-surface/90 lg:backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-6">
          <span className="lg:hidden">
            <Logo dark href={`/${locale}`} />
          </span>
          <span className="hidden lg:block">
            <Logo href={`/${locale}`} />
          </span>
          <nav className="hidden items-center gap-7 lg:flex" aria-label={tc("mainNav")}>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-muted transition-colors hover:text-ink">
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <Link href="/demande" className={buttonClasses("primary", "sm")}>
              {t("submitRequest")}
            </Link>
          </div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
