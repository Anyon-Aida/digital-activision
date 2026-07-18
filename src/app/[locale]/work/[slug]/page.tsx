import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CaseStudyDetail } from "@/components/case-studies/CaseStudyDetail";
import { caseStudyUi } from "@/components/case-studies/labels";
import {
  caseStudySlugs,
  getCaseStudy,
  getCaseStudyPath,
  getCaseStudySeo,
  localize,
  type CaseStudySlug,
} from "@/content/case-studies";
import { isLocale, routing } from "@/i18n/routing";
import { buildLocaleMetadata } from "@/lib/seo";
import { getSiteConfiguration } from "@/lib/site-origin";

type CaseStudyPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

function isCaseStudySlug(value: string): value is CaseStudySlug {
  return caseStudySlugs.some((slug) => slug === value);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudySlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale) || !isCaseStudySlug(slug)) {
    return {};
  }

  const seo = getCaseStudySeo(slug, locale);
  const metadata = buildLocaleMetadata({
    locale,
    path: `/work/${slug}`,
    title: seo.title,
    description: seo.description,
  });
  const socialImage = new URL(
    `/${locale}/work/${slug}/social-image`,
    metadata.metadataBase as URL,
  ).toString();

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      ...metadata.twitter,
      images: [{ url: socialImage, alt: seo.title }],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale) || !isCaseStudySlug(slug)) {
    notFound();
  }

  setRequestLocale(locale);
  const study = getCaseStudy(slug);
  const labels = caseStudyUi[locale];
  const site = getSiteConfiguration();
  const studyUrl = new URL(getCaseStudyPath(slug, locale), site.origin).toString();
  const workUrl = new URL(`/${locale}/work`, site.origin).toString();
  const homeUrl = new URL(`/${locale}`, site.origin).toString();
  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: localize(study.title, locale),
    description: localize(study.summary, locale),
    inLanguage: locale,
    url: studyUrl,
    keywords: study.technologies.map(({ name }) => name),
    creativeWorkStatus: labels.status[study.status],
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: labels.home,
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: labels.work,
        item: workUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: localize(study.title, locale),
        item: studyUrl,
      },
    ],
  };
  const serializeStructuredData = (value: object) =>
    JSON.stringify(value).replace(/</g, "\\u003c");

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(creativeWork),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: serializeStructuredData(breadcrumb),
        }}
        type="application/ld+json"
      />
      <CaseStudyDetail locale={locale} study={study} />
    </>
  );
}
