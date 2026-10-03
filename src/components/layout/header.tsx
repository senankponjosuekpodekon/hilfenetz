import Link from "next/link";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NAV_LINKS } from "@/lib/nav";
import { buttonClasses } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-dark lg:border-border/70 lg:bg-surface/90 lg:backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-6">
        <span className="lg:hidden">
          <Logo dark />
        </span>
        <span className="hidden lg:block">
          <Logo />
        </span>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted transition-colors hover:text-navy">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/demande" className={buttonClasses("primary", "sm")}>
            Présenter une demande
          </Link>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
