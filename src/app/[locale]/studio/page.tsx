import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { StudioPage } from "@/components/studio/StudioPage";
import { studioContent } from "@/content/studio";
import { isLocale } from "@/i18n/routing";
import { buildLocaleMetadata } from "@/lib/seo";

type StudioRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: StudioRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = studioContent[locale];

  return buildLocaleMetadata({
    locale,
    path: "/studio",
    title: content.metaTitle,
    description: content.metaDescription,
  });
}

export default async function StudioRoute({ params }: StudioRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <StudioPage content={studioContent[locale]} />;
}
