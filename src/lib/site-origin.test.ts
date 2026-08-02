import { describe, expect, it } from "vitest";
import { getSiteConfiguration } from "./site-origin";

describe("site origin and indexing policy", () => {
  it("fails closed in local and Preview environments", () => {
    expect(getSiteConfiguration({ NODE_ENV: "development" })).toMatchObject({
      indexable: false,
      originSource: "local-fallback",
    });

    expect(
      getSiteConfiguration({
        NODE_ENV: "production",
        VERCEL_ENV: "preview",
        VERCEL_PROJECT_PRODUCTION_URL: "digital-activision.vercel.app",
      }),
    ).toMatchObject({
      indexable: false,
      originSource: "vercel-production",
    });
  });

  it("allows indexing only on a verified Vercel Production origin", () => {
    const configuration = getSiteConfiguration({
      NEXT_PUBLIC_SITE_URL: "https://digital-activision.vercel.app",
      NODE_ENV: "production",
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "digital-activision.vercel.app",
    });

    expect(configuration.indexable).toBe(true);
    expect(configuration.origin.toString()).toBe(
      "https://digital-activision.vercel.app/",
    );
  });

  it("accepts an explicitly configured public HTTPS custom domain in Production", () => {
    const configuration = getSiteConfiguration({
      NEXT_PUBLIC_SITE_URL: "https://portfolio.example.com",
      NODE_ENV: "production",
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "digital-activision.vercel.app",
    });

    expect(configuration.indexable).toBe(true);
    expect(configuration.origin.toString()).toBe("https://portfolio.example.com/");
  });

  it.each([
    ["an insecure configured origin", "http://digital-activision.vercel.app"],
    ["a configured URL with a path", "https://digital-activision.vercel.app/subpath"],
    ["a malformed configured URL", "not-a-url"],
  ])("rejects %s", (_label, configuredUrl) => {
    const configuration = getSiteConfiguration({
      NEXT_PUBLIC_SITE_URL: configuredUrl,
      NODE_ENV: "production",
      VERCEL_ENV: "production",
      VERCEL_PROJECT_PRODUCTION_URL: "digital-activision.vercel.app",
    });

    expect(configuration.indexable).toBe(false);
  });
});
