import { describe, expect, it } from "vitest";
import { getRobots } from "./robots";

describe("robots policy", () => {
  it("disallows every crawler outside verified Production", () => {
    expect(
      getRobots({
        NODE_ENV: "production",
        VERCEL_ENV: "preview",
        VERCEL_PROJECT_PRODUCTION_URL: "digital-activision.vercel.app",
      }),
    ).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  });

  it("publishes the canonical sitemap only in verified Production", () => {
    expect(
      getRobots({
        NEXT_PUBLIC_SITE_URL: "https://digital-activision.vercel.app",
        NODE_ENV: "production",
        VERCEL_ENV: "production",
      }),
    ).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://digital-activision.vercel.app/sitemap.xml",
      host: "https://digital-activision.vercel.app",
    });
  });
});
