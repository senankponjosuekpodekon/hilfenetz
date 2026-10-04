import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NAV_LINKS } from "@/lib/nav";
import { buttonClasses } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";

export async function Header() {
  const t = await getTranslations("nav");
  const tc = await getTranslations("common");
  const locale = await getLocale();
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-dark lg:border-border/70 lg:bg-surface/90 lg:backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-6">
        <span className="lg:hidden">
          <Logo dark href={`/${locale}`} />
        </span>
        <span className="hidden lg:block">
          <Logo href={`/${locale}`} />
        </span>
        <nav className="hidden items-center gap-7 lg:flex" aria-label={tc("mainNav")}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted transition-colors hover:text-navy">
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
    </header>
  );
}
