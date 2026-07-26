import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["hu", "en"],
  defaultLocale: "hu",
  localeDetection: false,
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export function isLocale(value: unknown): value is Locale {
  return routing.locales.some((locale) => locale === value);
}

export function isUnsupportedLocaleSegment(value: string | undefined): boolean {
  if (!value || isLocale(value)) {
    return false;
  }

  return /^[a-z]{2}(?:-[a-z]{2})?$/i.test(value);
}
