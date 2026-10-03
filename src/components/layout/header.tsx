import Link from "next/link";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NAV_LINKS } from "@/lib/nav";
import { buttonClasses } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-6">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-muted transition-colors hover:text-navy">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/demande" className="text-sm font-medium text-muted transition-colors hover:text-navy">
            Présenter une demande
          </Link>
          <Link href="/don" className={buttonClasses("primary", "sm")}>
            Proposer un don
          </Link>
        </div>
        <MobileNav />
      </div>
    </header>
  );
}
