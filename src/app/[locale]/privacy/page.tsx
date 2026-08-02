import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { privacyContent } from "@/content/privacy";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";
import { buildLocaleMetadata } from "@/lib/seo";
import { Container } from "@/components/ui";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = privacyContent[locale];

  return buildLocaleMetadata({
    locale,
    path: "/privacy",
    title: content.metaTitle,
    description: content.metaDescription,
  });
}
export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const content = privacyContent[locale];

  return (
    <article className="border-b border-[var(--color-border-subtle)] py-[var(--section-space-default)]">
      <Container>
        <div className="mx-auto max-w-[48rem]">
          <header>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-industrial)]">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 text-[clamp(2.7rem,6vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-balance">
            {content.title}
          </h1>
          <p className="mt-6 max-w-[42rem] text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.intro}
          </p>
          </header>

          <aside
            className="mt-10 border-l-2 border-[var(--color-warning)] bg-[color-mix(in_srgb,var(--color-warning)_7%,var(--color-surface))] px-5 py-4"
            aria-labelledby="legal-review-title"
          >
            <h2 id="legal-review-title" className="text-lg font-semibold">
              {content.reviewTitle}
            </h2>
            <p className="mt-2 leading-7 text-[var(--color-text-secondary)]">
              {content.reviewBody}
            </p>
          </aside>

          <div className="mt-16 space-y-14">
            {content.sections.map((section) => (
              <section
                key={section.id}
                aria-labelledby={`privacy-${section.id}`}
                className="border-t border-[var(--color-border-subtle)] pt-7"
              >
                <h2
                  id={`privacy-${section.id}`}
                  className="text-2xl font-semibold tracking-[-0.025em]"
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-7 text-[var(--color-text-secondary)]">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-14 border-t border-[var(--color-border-strong)] pt-8">
            <h2 className="text-xl font-semibold">{content.sourcesTitle}</h2>
            <ul className="mt-4 space-y-3">
              {content.sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[var(--color-industrial)] underline decoration-[var(--color-border-strong)] underline-offset-4 hover:text-[var(--color-accent)]"
                  >
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <Link
            href="/"
            className="mt-12 inline-flex min-h-[var(--target-min)] items-center rounded-[var(--radius-control)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-5 py-2 font-semibold hover:border-[var(--color-industrial)]"
          >
            <span aria-hidden="true" className="mr-2">←</span>
            {content.homeLabel}
          </Link>
        </div>
      </Container>
    </article>
  );
}
