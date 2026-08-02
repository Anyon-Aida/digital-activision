import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { CaseStudyIndex } from "@/components/case-studies/CaseStudyIndex";
import { isLocale } from "@/i18n/routing";
import { buildLocaleMetadata } from "@/lib/seo";

type WorkPageProps = {
  params: Promise<{ locale: string }>;
};

const workMetadata = {
  hu: {
    title: "Munkák – Kovács Zalán full-stack fejlesztő",
    description:
      "Vállalati workflow, 3D konfigurátor, valós idejű analitika, szolgáltatásfoglalás és offline-first PWA esettanulmányok.",
    heading: "Rendszerek, termékek és interakciók.",
  },
  en: {
    title: "Work – Kovács Zalán full-stack developer",
    description:
      "Case studies spanning enterprise workflow, 3D configuration, real-time analytics, service booking and an offline-first PWA.",
    heading: "Systems, products and interactions.",
  },
} as const;

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const copy = workMetadata[locale];
  const metadata = buildLocaleMetadata({
    locale,
    path: "/work",
    title: copy.title,
    description: copy.description,
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
          alt: copy.heading,
        },
      ],
    },
    twitter: {
      ...metadata.twitter,
      images: [{ url: socialImage, alt: copy.heading }],
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
