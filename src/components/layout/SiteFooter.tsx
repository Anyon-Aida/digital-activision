import type { HomeContent } from "@/content/home";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/components/ui";

type SiteFooterProps = {
  chrome: HomeContent["chrome"];
  locale: Locale;
};

export function SiteFooter({ chrome, locale }: SiteFooterProps) {
  return (
    <footer className="border-t border-[var(--color-border-subtle)] bg-[var(--color-page)] py-10 text-sm text-[var(--color-text-secondary)]">
      <Container className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div className="max-w-xl">
          <p className="font-semibold text-[var(--color-text-primary)]">{chrome.brand}</p>
          <p className="mt-2">{chrome.footerSummary}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em]">
            © {new Date().getFullYear()} Digital Activision
          </p>
        </div>
        <nav aria-label={locale === "hu" ? "Lábléc navigáció" : "Footer navigation"}>
          <ul className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end">
            <li>
              <a className="underline-offset-4 hover:underline" href={`/${locale}/privacy`}>
                {chrome.privacyLabel}
              </a>
            </li>
            <li>
              <a
                className="underline-offset-4 hover:underline"
                href="https://github.com/Anyon-Aida"
                rel="noopener noreferrer"
                target="_blank"
              >
                {chrome.githubLabel}
              </a>
            </li>
            <li>
              <a
                className="underline-offset-4 hover:underline"
                href="https://www.linkedin.com/company/digital-activision"
                rel="noopener noreferrer"
                target="_blank"
              >
                {chrome.linkedInLabel}
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
