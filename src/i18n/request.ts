import type { AbstractIntlMessages } from "next-intl";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const messages = (await import(`../locales/${locale}/common.json`)).default;

  return {
    locale,
    messages: messages as unknown as AbstractIntlMessages,
  };
});
