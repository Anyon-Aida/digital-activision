import type { NavigationItem } from "@/content/home";
import type { Locale } from "@/i18n/routing";

export function getLocalizedNavigationHref(
  href: NavigationItem["href"],
  locale: Locale,
) {
  return `/${locale}${href}` as const;
}

export function isNavigationItemCurrent(
  href: NavigationItem["href"],
  pathname: string,
) {
  if (!href.startsWith("/")) {
    return false;
  }

  const localeFreePath =
    pathname.replace(/^\/(?:hu|en)(?=\/|$)/, "") || "/";

  return localeFreePath === href || localeFreePath.startsWith(`${href}/`);
}
