import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CaseStudyIndex } from "@/components/case-studies/CaseStudyIndex";
import { caseStudyUi } from "@/components/case-studies/labels";
import { isLocale } from "@/i18n/routing";
import { buildLocaleMetadata } from "@/lib/seo";

type WorkPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const labels = caseStudyUi[locale];
  const metadata = buildLocaleMetadata({
    locale,
    path: "/work",
    title: labels.indexMetaTitle,
    description: labels.indexMetaDescription,
  });
  const socialImage = new URL(
    `/${locale}/work/social-image`,
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
          alt: labels.indexTitle,
        },
      ],
    },
    twitter: {
      ...metadata.twitter,
      images: [{ url: socialImage, alt: labels.indexTitle }],
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <CaseStudyIndex locale={locale} />;
}
