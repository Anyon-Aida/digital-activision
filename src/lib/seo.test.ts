import { describe, expect, it } from "vitest";
import {
  buildLocaleMetadata,
  getLocalizedUrls,
  isCaseStudySearchIndexable,
} from "./seo";

const previewEnvironment = {
  NEXT_PUBLIC_SITE_URL: "https://digital-activision.vercel.app",
  NODE_ENV: "production",
  VERCEL_ENV: "preview",
  VERCEL_PROJECT_PRODUCTION_URL: "digital-activision.vercel.app",
} as const;

describe("locale metadata", () => {
  it("creates canonical, locale and x-default alternates", () => {
    expect(
      getLocalizedUrls(
        new URL("https://digital-activision.vercel.app"),
        "/privacy/",
      ),
    ).toEqual({
      hu: "https://digital-activision.vercel.app/hu/privacy",
      en: "https://digital-activision.vercel.app/en/privacy",
      "x-default": "https://digital-activision.vercel.app/hu/privacy",
    });
  });

  it("keeps Preview metadata noindex and locale-specific", () => {
    const metadata = buildLocaleMetadata({
      locale: "en",
      environment: previewEnvironment,
    });

    expect(metadata.title).toContain("Full-Stack Engineer");
    expect(metadata.description).not.toMatch(/webfejlesztő|mérnöki portfólió/i);
    expect(metadata.alternates).toMatchObject({
      canonical: "https://digital-activision.vercel.app/en",
      languages: {
        hu: "https://digital-activision.vercel.app/hu",
        en: "https://digital-activision.vercel.app/en",
        "x-default": "https://digital-activision.vercel.app/hu",
      },
    });
    expect(metadata.robots).toMatchObject({ index: false, follow: false });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });

  it("lets a page opt out of indexing in verified Production", () => {
    const productionEnvironment = {
      ...previewEnvironment,
      VERCEL_ENV: "production",
    } as const;
    const indexableMetadata = buildLocaleMetadata({
      locale: "en",
      environment: productionEnvironment,
    });
    const optedOutMetadata = buildLocaleMetadata({
      locale: "en",
      environment: productionEnvironment,
      allowIndexing: false,
    });

    expect(indexableMetadata.robots).toMatchObject({
      index: true,
      follow: true,
    });
    expect(optedOutMetadata.robots).toMatchObject({
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    });
  });

  it("keeps in-progress case studies out of search indexing", () => {
    expect(isCaseStudySearchIndexable("production")).toBe(true);
    expect(isCaseStudySearchIndexable("demo")).toBe(true);
    expect(isCaseStudySearchIndexable("private-case-study")).toBe(true);
    expect(isCaseStudySearchIndexable("in-progress")).toBe(false);
  });
});
