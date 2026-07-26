import type { MetadataRoute } from "next";
import {
  getSiteConfiguration,
  type SiteEnvironment,
} from "@/lib/site-origin";

export function getRobots(
  environment: SiteEnvironment = process.env,
): MetadataRoute.Robots {
  const site = getSiteConfiguration(environment);

  if (!site.indexable) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", site.origin).toString(),
    host: site.origin.origin,
  };
}
export default function robots(): MetadataRoute.Robots {
  return getRobots();
}
