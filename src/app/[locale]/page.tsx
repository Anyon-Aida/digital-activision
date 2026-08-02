import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { DeveloperHomepage } from "@/components/home/DeveloperHomepage";
import { homeContent } from "@/content/home";
import { routing } from "@/i18n/routing";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  return <DeveloperHomepage content={homeContent[locale]} locale={locale} />;
}
