"use client";

import type { HomeContent } from "@/content/home";
import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import {
  getLocalizedNavigationHref,
  isNavigationItemCurrent,
} from "./navigation";

type PrimaryNavigationProps = {
  chrome: HomeContent["chrome"];
  locale: Locale;
};

export function PrimaryNavigation({
  chrome,
  locale,
}: PrimaryNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={chrome.navigationLabel}>
      <ul className="flex items-center gap-1">
        {chrome.navigation.map((item) => {
          const current = isNavigationItemCurrent(item.href, pathname);

          return (
            <li key={item.href}>
              <a
                aria-current={current ? "page" : undefined}
                className="relative inline-flex min-h-[var(--target-min)] items-center px-2 text-sm font-medium text-[var(--color-text-secondary)] no-underline transition-colors after:absolute after:inset-x-2 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[var(--color-accent)] after:transition-transform hover:text-[var(--color-text-primary)] aria-[current=page]:text-[var(--color-text-primary)] aria-[current=page]:after:scale-x-100 2xl:px-3 2xl:after:inset-x-3"
                href={getLocalizedNavigationHref(item.href, locale)}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
