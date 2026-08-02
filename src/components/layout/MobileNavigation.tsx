"use client";

import { FileDown, Github, Menu } from "lucide-react";
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
                    className="flex min-h-[var(--target-min)] items-center border-b border-[var(--color-border-subtle)] px-1 py-3 text-xl font-semibold tracking-[-0.02em] transition-colors hover:text-[var(--color-accent)] aria-[current=page]:border-[var(--color-accent)] aria-[current=page]:text-[var(--color-accent)]"
                    href={getLocalizedNavigationHref(item.href, locale)}
                    onClick={close}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 border-t border-[var(--color-border-subtle)] pt-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <a
                className="inline-flex min-h-[var(--target-min)] items-center justify-center gap-2 rounded-[var(--radius-control)] bg-[var(--color-accent)] px-4 font-semibold text-[var(--color-on-accent)] no-underline transition-colors hover:bg-[var(--color-accent-hover)]"
                download={chrome.cvDownloadFilename}
                href={chrome.cvHref}
                onClick={close}
              >
                <FileDown aria-hidden="true" size={18} strokeWidth={1.8} />
                {chrome.cvLabel}
              </a>
              <LocaleSwitch
                className="inline-flex min-h-[var(--target-min)] items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border-strong)] px-4 font-semibold no-underline transition-colors hover:bg-[var(--color-surface-subtle)]"
                label={chrome.languageLabel}
                locale={locale}
                onNavigate={close}
              />
              <a
                className="inline-flex min-h-[var(--target-min)] items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] px-4 font-semibold no-underline transition-colors hover:bg-[var(--color-surface-subtle)] sm:col-span-2"
                href={chrome.githubHref}
                onClick={close}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Github aria-hidden="true" size={18} strokeWidth={1.8} />
                {chrome.githubLabel}
              </a>
            </div>
          </div>
        </nav>
      </Sheet>
    </>
  );
}
