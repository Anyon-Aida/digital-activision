import type { MetadataRoute } from "next";
import { caseStudySlugs } from "@/content/case-studies";
import { routing } from "@/i18n/routing";
import { getLocalizedUrls } from "@/lib/seo";
import {
  getSiteConfiguration,
  type SiteEnvironment,
} from "@/lib/site-origin";

const publicRoutes = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/work", changeFrequency: "monthly", priority: 0.8 },
  ...caseStudySlugs.map((slug) => ({
    path: `/work/${slug}` as const,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
] as const;

export function getSitemap(
  environment: SiteEnvironment = process.env,
): MetadataRoute.Sitemap {
  const { origin } = getSiteConfiguration(environment);

  return publicRoutes.flatMap(({ path, changeFrequency, priority }) => {
    const localizedUrls = getLocalizedUrls(origin, path);

    return routing.locales.map((locale) => ({
      url: localizedUrls[locale],
      alternates: { languages: localizedUrls },
      changeFrequency,
      priority,
    }));
  });
}
export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemap();
}
