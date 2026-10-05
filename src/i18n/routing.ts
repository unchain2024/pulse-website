import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ja", "en"],
  defaultLocale: "ja",
  // Always land on Japanese; English is reached only via /en or the language switch.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
