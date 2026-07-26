"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import type { HomeContent } from "@/content/home";
import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Sheet } from "@/components/ui";
import { LocaleSwitch } from "./LocaleSwitch";
import {
  getLocalizedNavigationHref,
  isNavigationItemCurrent,
} from "./navigation";

type MobileNavigationProps = {
  chrome: HomeContent["chrome"];
  locale: Locale;
};

const navigationId = "mobile-navigation";

export function MobileNavigation({ chrome, locale }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <>
      <button
        aria-controls={navigationId}
        aria-expanded={open}
        aria-label={chrome.openNavigation}
        className="inline-flex min-h-[var(--target-min)] min-w-[var(--target-min)] items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-subtle)] xl:hidden"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Menu aria-hidden="true" size={20} strokeWidth={1.8} />
      </button>

      <Sheet
        closeLabel={chrome.closeNavigation}
        id={navigationId}
        onOpenChange={setOpen}
        open={open}
        title={chrome.navigationTitle}
      >
        <nav aria-label={chrome.navigationLabel}>
          <ul className="flex flex-col gap-2">
            {chrome.navigation.map((item) => {
              const current = isNavigationItemCurrent(item.href, pathname);

              return (
                <li key={item.href}>
                  <a
                    aria-current={current ? "page" : undefined}
                    className="flex min-h-[var(--target-min)] items-center rounded-[var(--radius-control)] px-3 py-2 font-medium transition-colors hover:bg-[var(--color-surface-subtle)] aria-[current=page]:bg-[var(--color-accent-soft)]"
                    href={getLocalizedNavigationHref(item.href, locale)}
                    onClick={close}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 border-t border-[var(--color-border-subtle)] pt-6">
            <div className="flex items-center gap-3">
              <LocaleSwitch
                className="inline-flex min-h-[var(--target-min)] items-center rounded-[var(--radius-control)] border border-[var(--color-border-strong)] px-4 font-semibold no-underline transition-colors hover:bg-[var(--color-surface-subtle)]"
                label={chrome.languageLabel}
                locale={locale}
                onNavigate={close}
              />
              <button
                className="inline-flex min-h-[var(--target-min)] cursor-not-allowed items-center rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] px-4 text-sm text-[var(--color-text-secondary)]"
                disabled
                title={chrome.unavailable}
                type="button"
              >
                {chrome.cvLabel} · {chrome.unavailable}
              </button>
            </div>
          </div>
        </nav>
      </Sheet>
    </>
  );
}
