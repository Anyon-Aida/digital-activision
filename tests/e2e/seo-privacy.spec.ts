import { expect, test } from "@playwright/test";

const localeExpectations = {
  hu: {
    heading: "Adatkezelési tájékoztató",
    title: /Adatkezelési tájékoztató/,
    privacyLink: "Adatkezelés",
  },
  en: {
    heading: "Privacy notice",
    title: /Privacy notice/,
    privacyLink: "Privacy",
  },
} as const;

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} privacy route has localized metadata and parity`, async ({
    page,
  }) => {
    const response = await page.goto(`/${locale}/privacy`);
    const expected = localeExpectations[locale];

    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(expected.heading);
    await expect(page).toHaveTitle(expected.title);
    await expect(
      page.getByRole("heading", { name: expected.heading }),
    ).toBeVisible();

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname).toBe(`/${locale}/privacy`);

    for (const alternateLocale of ["hu", "en", "x-default"] as const) {
      const href = await page
        .locator(`link[rel="alternate"][hreflang="${alternateLocale}"]`)
        .getAttribute("href");
      const expectedLocale = alternateLocale === "x-default" ? "hu" : alternateLocale;

      expect(new URL(href!).pathname).toBe(`/${expectedLocale}/privacy`);
    }

    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex.*nofollow/,
    );
    await expect(
      page.getByRole("link", { name: expected.privacyLink, exact: true }),
    ).toHaveAttribute("href", `/${locale}/privacy`);
  });
}

test("Preview-safe robots, locale sitemap and social images are served", async ({
  request,
}) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("Disallow: /");

  const sitemap = await request.get("/sitemap.xml");
  const sitemapBody = await sitemap.text();
  expect(sitemap.status()).toBe(200);
  expect(sitemapBody).toContain("/hu/privacy");
  expect(sitemapBody).toContain("/en/privacy");
  expect(sitemapBody).toContain('hreflang="x-default"');

  for (const locale of ["hu", "en"] as const) {
    const image = await request.get(`/${locale}/social-image`);
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toContain("image/png");
  }
});
