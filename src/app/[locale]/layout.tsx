import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import {
  IBM_Plex_Mono,
  Instrument_Serif,
  Manrope,
} from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { homeContent } from "@/content/home";
import { buildLocaleMetadata } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import "../globals.css";

const manrope = Manrope({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-manrope",
});

const instrumentSerif = Instrument_Serif({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
});

const ibmPlexMono = IBM_Plex_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
});

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  return buildLocaleMetadata({ locale });
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
    <html
      className={`${manrope.variable} ${instrumentSerif.variable} ${ibmPlexMono.variable}`}
      lang={locale}
    >
      <body className="min-h-dvh bg-page-surface font-sans text-content-primary antialiased">
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-black focus:px-3 focus:py-2 focus:text-white"
          >
            {t("skipToContent")}
          </a>
          <SiteHeader chrome={homeContent[locale].chrome} locale={locale} />
          <main className="outline-none" id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter chrome={homeContent[locale].chrome} locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
