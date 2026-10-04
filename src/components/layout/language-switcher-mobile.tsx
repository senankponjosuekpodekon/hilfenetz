"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES = [
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "it", label: "Italiano" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
] as const;

export function LanguageSwitcherMobile() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => router.replace(pathname, { locale: l.code })}
          className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
            locale === l.code
              ? "border-trust bg-trust text-white"
              : "border-white/20 text-white/70 hover:bg-white/10"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
