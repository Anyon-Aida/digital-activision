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
    <header className="sticky top-0 z-50 border-b border-[var(--color-border-subtle)] bg-[color-mix(in_srgb,var(--color-page)_88%,transparent)] backdrop-blur-xl">
      <Container className="flex min-h-16 items-center justify-between gap-4 xl:min-h-20">
        <a
          className="group flex min-h-[var(--target-min)] min-w-0 items-center gap-3 rounded-[var(--radius-control)] no-underline"
          href={`/${locale}`}
        >
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-accent-soft)] font-mono text-sm font-bold text-[var(--color-accent)] transition-transform group-hover:-rotate-3"
          >
            KZ
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-sm font-semibold text-[var(--color-text-primary)]">
              {chrome.brand}
            </span>
            <span className="hidden truncate font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[var(--color-text-secondary)] sm:block">
              {chrome.brandDetail}
            </span>
          </span>
        </a>

        <div className="hidden min-w-0 items-center gap-3 xl:flex">
          <PrimaryNavigation chrome={chrome} locale={locale} />
          <span aria-hidden="true" className="h-6 w-px bg-[var(--color-border-subtle)]" />
          <button
            className="hidden min-h-[var(--target-min)] cursor-not-allowed items-center rounded-[var(--radius-control)] px-3 text-sm text-[var(--color-text-secondary)] 2xl:inline-flex"
            disabled
            title={chrome.unavailable}
            type="button"
          >
            {chrome.cvLabel} · {chrome.unavailable}
          </button>
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
