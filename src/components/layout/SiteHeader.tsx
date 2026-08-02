import { FileDown, Github } from "lucide-react";
import type { HomeContent } from "@/content/home";
import type { Locale } from "@/i18n/routing";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { buildServerCommandPaletteCommands } from "@/components/command-palette/server-commands";
import { Container } from "@/components/ui";
import { LocaleSwitch } from "./LocaleSwitch";
import { MobileNavigation } from "./MobileNavigation";
import { PrimaryNavigation } from "./PrimaryNavigation";

type SiteHeaderProps = {
  chrome: HomeContent["chrome"];
  locale: Locale;
};

export function SiteHeader({ chrome, locale }: SiteHeaderProps) {
  const paletteCommands = buildServerCommandPaletteCommands(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[color-mix(in_srgb,var(--color-page)_94%,transparent)] backdrop-blur-lg">
      <Container
        className="flex min-h-[4.5rem] items-center justify-between gap-4"
        size="wide"
      >
        <a
          className="group flex min-h-[var(--target-min)] min-w-0 items-center py-1 no-underline"
          href={`/${locale}`}
        >
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-base font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
              {chrome.brand}
            </span>
            <span className="hidden truncate text-xs text-[var(--color-text-secondary)] sm:block">
              {chrome.brandDetail}
            </span>
          </span>
        </a>

        <div className="hidden min-w-0 items-center gap-2 xl:flex">
          <PrimaryNavigation chrome={chrome} locale={locale} />
          <span
            aria-hidden="true"
            className="mx-1 h-6 w-px bg-[var(--color-border-subtle)]"
          />
          <a
            aria-label={chrome.githubLabel}
            className="inline-flex min-h-[var(--target-min)] min-w-[var(--target-min)] items-center justify-center rounded-[var(--radius-control)] text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-primary)]"
            href={chrome.githubHref}
            rel="noopener noreferrer"
            target="_blank"
            title={chrome.githubLabel}
          >
            <Github aria-hidden="true" size={19} strokeWidth={1.8} />
          </a>
          <a
            className="inline-flex min-h-[var(--target-min)] items-center gap-2 rounded-[var(--radius-control)] px-3 text-sm font-semibold text-[var(--color-text-primary)] no-underline transition-colors hover:bg-[var(--color-surface-subtle)]"
            download={chrome.cvDownloadFilename}
            href={chrome.cvHref}
          >
            <FileDown aria-hidden="true" size={18} strokeWidth={1.8} />
            {chrome.cvLabel}
          </a>
          <LocaleSwitch
            className="inline-flex min-h-[var(--target-min)] min-w-[var(--target-min)] items-center justify-center rounded-[var(--radius-control)] border border-[var(--color-border-strong)] font-semibold no-underline transition-colors hover:bg-[var(--color-surface-subtle)]"
            label={chrome.languageLabel}
            locale={locale}
          />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <CommandPalette commands={paletteCommands} locale={locale} />
          <MobileNavigation chrome={chrome} locale={locale} />
        </div>
      </Container>
    </header>
  );
}
