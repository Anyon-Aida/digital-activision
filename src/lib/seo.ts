import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  getSiteConfiguration,
  type SiteEnvironment,
} from "./site-origin";

const homepageMetadata = {
  hu: {
    title: "Kovács Zalán | Full-Stack fejlesztő és digitális terméképítő",
    description:
      "Full-stack mérnöki portfólió skálázható webalkalmazásokról, webes rendszerekről és digitális termékekről, több mint 5 év tapasztalattal.",
    imageAlt: "Kovács Zalán full-stack fejlesztői portfóliója",
    openGraphLocale: "hu_HU",
  },
  en: {
    title: "Kovács Zalán | Full-Stack Engineer & Digital Product Builder",
    description:
      "A full-stack engineering portfolio focused on scalable web applications, web systems and digital products, backed by more than 5 years of experience.",
    imageAlt: "Kovács Zalán's full-stack engineering portfolio",
    openGraphLocale: "en_US",
  },
} as const;

type MetadataInput = {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
  environment?: SiteEnvironment;
};

function normalizePagePath(path = ""): string {
  if (!path || path === "/") {
    return "";
  }

  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}

export function getLocalizedUrls(origin: URL, path = "") {
  const normalizedPath = normalizePagePath(path);
  const localeUrls = Object.fromEntries(
    routing.locales.map((locale) => [
      locale,
      new URL(`/${locale}${normalizedPath}`, origin).toString(),
    ]),
  ) as Record<Locale, string>;

  return {
    ...localeUrls,
    "x-default": localeUrls[routing.defaultLocale],
  };
}

export function buildLocaleMetadata({
  locale,
  path,
  title,
  description,
  environment,
}: MetadataInput): Metadata {
  const site = getSiteConfiguration(environment);
  const localized = homepageMetadata[locale];
  const urls = getLocalizedUrls(site.origin, path);
  const pageTitle = title ?? localized.title;
  const pageDescription = description ?? localized.description;
  const socialImage = new URL(`/${locale}/social-image`, site.origin).toString();

  return {
    metadataBase: site.origin,
    applicationName: "Digital Activision",
    title: pageTitle,
    description: pageDescription,
    authors: [{ name: "Kovács Zalán" }],
    creator: "Kovács Zalán",
    publisher: "Digital Activision",
    alternates: {
      canonical: urls[locale],
      languages: urls,
    },
    openGraph: {
      type: "website",
      siteName: "Digital Activision",
      title: pageTitle,
      description: pageDescription,
      url: urls[locale],
      locale: localized.openGraphLocale,
      alternateLocale: routing.locales
        .filter((candidate) => candidate !== locale)
        .map((candidate) => homepageMetadata[candidate].openGraphLocale),
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: localized.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [{ url: socialImage, alt: localized.imageAlt }],
    },
    robots: {
      index: site.indexable,
      follow: site.indexable,
      nocache: !site.indexable,
      googleBot: {
        index: site.indexable,
        follow: site.indexable,
        noimageindex: !site.indexable,
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}
