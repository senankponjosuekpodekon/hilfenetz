"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/lib/nav";
import { LanguageSwitcherMobile } from "./language-switcher-mobile";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const locale = useLocale();

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={tc("menuOpen")}
        aria-expanded={open}
        className="flex size-11 items-center justify-center rounded-[10px] text-white hover:bg-white/10"
      >
        <Menu className="size-6" aria-hidden />
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-navy-dark">
          <div className="flex h-16 items-center justify-between px-5">
            <Logo dark href={`/${locale}`} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={tc("menuClose")}
              className="flex size-11 items-center justify-center rounded-[10px] text-white/80 hover:bg-white/10"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 px-5 pt-6" aria-label={tc("mobileNav")}>
            <Link href="/" onClick={() => setOpen(false)} className="rounded-[10px] px-3 py-3 text-lg font-medium text-white hover:bg-white/10">
              {t("home")}
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[10px] px-3 py-3 text-lg font-medium text-white hover:bg-white/10"
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="mt-6 px-3">
              <LanguageSwitcherMobile />
            </div>
            <div className="mt-auto pb-8 pt-6">
              <Button href="/demande" variant="light" className="w-full" size="lg" onClick={() => setOpen(false)}>
                {t("submitRequest")}
              </Button>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
