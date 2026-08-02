import type { HomeContent } from "@/content/home";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";

type SiteFooterProps = {
  chrome: HomeContent["chrome"];
  locale: Locale;
};

export function SiteFooter({ chrome, locale }: SiteFooterProps) {
  const footerNavigationLabel =
    locale === "hu" ? "Lábléc navigáció" : "Footer navigation";
  const profileLinksLabel =
    locale === "hu" ? "Szakmai profilok" : "Professional profiles";
  const cvLinksLabel =
    locale === "hu" ? "Önéletrajzok" : "Curriculum vitae";

  return (
    <footer
      className="border-t border-[var(--color-border-subtle)] bg-[var(--color-page)] py-12 text-sm text-[var(--color-text-secondary)] sm:py-16"
      data-tone="dark"
    >
      <Container
        className="grid gap-10 md:grid-cols-2 xl:grid-cols-[minmax(18rem,1.6fr)_repeat(3,minmax(9rem,0.7fr))]"
        size="wide"
      >
        <div className="max-w-xl">
          <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
            {chrome.brand}
          </p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {chrome.brandDetail}
          </p>
          <p className="mt-5 max-w-md leading-6">{chrome.footerSummary}</p>
        </div>

        <nav aria-label={footerNavigationLabel}>
          <ul className="grid gap-3">
            <li>
              <a
                className="inline-flex min-h-[var(--target-min)] items-center underline-offset-4 hover:text-[var(--color-text-primary)] hover:underline"
                href={`/${locale}/studio`}
              >
                {chrome.studioLabel}
              </a>
            </li>
            <li>
              <a
                className="inline-flex min-h-[var(--target-min)] items-center underline-offset-4 hover:text-[var(--color-text-primary)] hover:underline"
                href={`/${locale}/privacy`}
              >
                {chrome.privacyLabel}
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label={profileLinksLabel}>
          <ul className="grid gap-3">
            <li>
              <a
                className="inline-flex min-h-[var(--target-min)] items-center underline-offset-4 hover:text-[var(--color-text-primary)] hover:underline"
                href={chrome.githubHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {chrome.githubLabel}
              </a>
            </li>
            <li>
              <a
                className="inline-flex min-h-[var(--target-min)] items-center underline-offset-4 hover:text-[var(--color-text-primary)] hover:underline"
                href={chrome.linkedInHref}
                rel="noopener noreferrer"
                target="_blank"
              >
                {chrome.linkedInLabel}
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-label={cvLinksLabel}>
          <ul className="grid gap-3">
            <li>
              <a
                className="inline-flex min-h-[var(--target-min)] items-center underline-offset-4 hover:text-[var(--color-text-primary)] hover:underline"
                download
                href={chrome.cvHuHref}
              >
                {chrome.cvHuLabel}
              </a>
            </li>
            <li>
              <a
                className="inline-flex min-h-[var(--target-min)] items-center underline-offset-4 hover:text-[var(--color-text-primary)] hover:underline"
                download
                href={chrome.cvEnHref}
              >
                {chrome.cvEnLabel}
              </a>
            </li>
          </ul>
        </nav>
      </Container>

      <Container className="mt-10" size="wide">
        <p className="border-t border-[var(--color-border-subtle)] pt-6 font-mono text-xs uppercase tracking-[0.1em]">
          © {new Date().getFullYear()} Digital Activision
        </p>
      </Container>
    </footer>
  );
}
