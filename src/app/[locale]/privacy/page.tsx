import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { privacyContent } from "@/content/privacy";
import { Link } from "@/i18n/navigation";
import { isLocale } from "@/i18n/routing";
import { buildLocaleMetadata } from "@/lib/seo";

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
    <article className="bg-slate-50 px-6 py-20 text-slate-900 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
            {content.eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">{content.intro}</p>
        </header>

        <aside
          className="mt-10 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-950"
          aria-labelledby="legal-review-title"
        >
          <h2 id="legal-review-title" className="text-lg font-bold">
            {content.reviewTitle}
          </h2>
          <p className="mt-2 leading-7">{content.reviewBody}</p>
        </aside>

        <div className="mt-12 space-y-12">
          {content.sections.map((section) => (
            <section key={section.id} aria-labelledby={`privacy-${section.id}`}>
              <h2
                id={`privacy-${section.id}`}
                className="text-2xl font-bold tracking-tight"
              >
                {section.title}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-slate-700">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-14 border-t border-slate-300 pt-8">
          <h2 className="text-xl font-bold">{content.sourcesTitle}</h2>
          <ul className="mt-4 space-y-3">
            {content.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-indigo-700 underline decoration-indigo-300 underline-offset-4 hover:text-indigo-900"
                >
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <Link
          href="/"
          className="mt-12 inline-flex min-h-11 items-center rounded-full border border-slate-300 bg-white px-5 py-2 font-semibold text-slate-900 shadow-sm hover:border-slate-500"
        >
          {content.homeLabel}
        </Link>
      </div>
    </article>
  );
}
