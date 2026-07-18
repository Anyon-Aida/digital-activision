import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { LabPage } from "@/components/lab/LabPage";
import { labContent } from "@/content/lab";
import { isLocale } from "@/i18n/routing";
import { buildLocaleMetadata } from "@/lib/seo";

type LabRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LabRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return buildLocaleMetadata({
    locale,
    path: "/lab",
    title: labContent[locale].metadata.title,
    description: labContent[locale].metadata.description,
  });
}

export default async function LabRoute({ params }: LabRouteProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return <LabPage content={labContent[locale]} />;
}
