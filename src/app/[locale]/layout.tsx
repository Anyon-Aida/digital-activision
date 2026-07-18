import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "../components/footer/Footer";
import StickyNav from "../components/header/StickyNav";
import { routing } from "@/i18n/routing";
import "../globals.css";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const metadataByLocale = {
  hu: {
    title: "Digital Activision · Webfejlesztés",
    description:
      "Egyedi weboldalak, webalkalmazások és digitális termékek tervezése és fejlesztése.",
  },
  en: {
    title: "Digital Activision · Web development",
    description:
      "Design and development for custom websites, web applications and digital products.",
  },
} as const;

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  return metadataByLocale[locale];
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "accessibility" });

  return (
    <html lang={locale}>
      <body className="min-h-dvh bg-white text-neutral-900 antialiased">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-black focus:px-3 focus:py-2 focus:text-white"
          >
            {t("skipToContent")}
          </a>
          <StickyNav />
          <main id="main" className="pt-0 md:pt-0">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
