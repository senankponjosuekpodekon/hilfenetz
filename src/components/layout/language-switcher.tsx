"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Globe } from "lucide-react";

const LOCALES = [
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
] as const;

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Choisir la langue"
        className="flex h-9 items-center gap-1.5 rounded-[10px] px-3 text-sm font-medium uppercase text-muted transition-colors hover:text-navy"
      >
        <Globe className="size-4" aria-hidden />
        {locale}
      </button>
      {open ? (
        <>
          <button type="button" aria-label="Fermer" onClick={() => setOpen(false)} className="fixed inset-0 z-40 cursor-default" />
          <div className="absolute right-0 z-50 mt-2 w-40 rounded-xl border border-border bg-surface p-1.5 shadow-lg">
            {LOCALES.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setOpen(false);
                  router.replace(pathname, { locale: l.code });
                }}
                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                  locale === l.code ? "bg-trust/10 font-semibold text-trust" : "text-ink hover:bg-background"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
