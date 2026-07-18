import { describe, expect, it } from "vitest";
import { getSitemap } from "./sitemap";

describe("locale-aware sitemap", () => {
  it("contains only ready public routes in both locales", () => {
    const entries = getSitemap({
      NEXT_PUBLIC_SITE_URL: "https://portfolio.example.com",
      NODE_ENV: "production",
      VERCEL_ENV: "preview",
    });

    expect(entries.map(({ url }) => url)).toEqual([
      "https://portfolio.example.com/hu",
      "https://portfolio.example.com/en",
      "https://portfolio.example.com/hu/work",
      "https://portfolio.example.com/en/work",
      "https://portfolio.example.com/hu/work/samsung-smart-gate-analytics",
      "https://portfolio.example.com/en/work/samsung-smart-gate-analytics",
      "https://portfolio.example.com/hu/work/adott-enterprise-project-workflow",
      "https://portfolio.example.com/en/work/adott-enterprise-project-workflow",
      "https://portfolio.example.com/hu/work/alba-medence-3d-configurator",
      "https://portfolio.example.com/en/work/alba-medence-3d-configurator",
      "https://portfolio.example.com/hu/work/questlog-offline-first-pwa",
      "https://portfolio.example.com/en/work/questlog-offline-first-pwa",
      "https://portfolio.example.com/hu/privacy",
      "https://portfolio.example.com/en/privacy",
    ]);
    expect(entries.at(-2)?.alternates?.languages).toMatchObject({
      hu: "https://portfolio.example.com/hu/privacy",
      en: "https://portfolio.example.com/en/privacy",
      "x-default": "https://portfolio.example.com/hu/privacy",
    });
  });
});
