import type { Metadata } from "next";
import type { CaseStudy } from "@/content/case-studies";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  getSiteConfiguration,
  type SiteEnvironment,
} from "./site-origin";

const homepageMetadata = {
  hu: {
    title: "Kovács Zalán – Full-Stack Developer és Product Engineer",
    description:
      "Full-stack fejlesztő React, Next.js, Node.js, Laravel és SQL tapasztalattal. Enterprise workflowk, interaktív 3D konfigurátorok és digitális termékek.",
    imageAlt:
      "Kovács Zalán full-stack fejlesztői portfóliója projektfragmentekkel",
    openGraphLocale: "hu_HU",
  },
  en: {
    title: "Kovács Zalán – Full-Stack Developer & Product Engineer",
    description:
      "Full-stack developer experienced with React, Next.js, Node.js, Laravel and SQL, building enterprise workflows, interactive 3D configurators and digital products.",
    imageAlt:
      "Kovács Zalán full-stack developer portfolio with project fragments",
    openGraphLocale: "en_US",
  },
} as const;

type MetadataInput = {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
  environment?: SiteEnvironment;
  allowIndexing?: boolean;
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

export function isCaseStudySearchIndexable(
  status: CaseStudy["status"],
): boolean {
  return status !== "in-progress";
}

export function buildLocaleMetadata({
  locale,
  path,
  title,
  description,
  environment,
  allowIndexing = true,
}: MetadataInput): Metadata {
  const site = getSiteConfiguration(environment);
  const indexable = site.indexable && allowIndexing;
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
      index: indexable,
      follow: indexable,
      nocache: !indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
        noimageindex: !indexable,
      },
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}
