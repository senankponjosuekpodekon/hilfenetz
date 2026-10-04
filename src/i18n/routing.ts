import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "fr", "it", "es", "pt"],
  defaultLocale: "de",
  localePrefix: "always",
});
