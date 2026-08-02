import { expect, test } from "@playwright/test";
import {
  caseStudySlugs,
  getCaseStudy,
  workCaseStudyOrder,
} from "../../src/content/case-studies";

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} work index is registry-backed`, async ({ page }) => {
    const response = await page.goto(`/${locale}/work`);

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    const projectArticles = page.locator(
      `main article:has(a[href^="/${locale}/work/"])`,
    );
    await expect(projectArticles).toHaveCount(workCaseStudyOrder.length);
    await expect(projectArticles.locator("h2").first()).toContainText(
      "Adott Solution",
    );

    const caseLinks = await page
      .locator(`a[href^="/${locale}/work/"]`)
      .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")))]);
    expect(caseLinks).toEqual(
      workCaseStudyOrder.map((slug) => `/${locale}/work/${slug}`),
    );
  });

  for (const slug of caseStudySlugs) {
    test(`${locale.toUpperCase()} case study ${slug} exposes its V3 narrative`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      const storySections = getCaseStudy(slug).presentation.storySections;
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });

      const response = await page.goto(`/${locale}/work/${slug}`);

      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      expect(storySections.length).toBeGreaterThanOrEqual(5);
      expect(storySections.length).toBeLessThanOrEqual(7);
      await expect(page.locator("[data-case-study-section]")).toHaveCount(
        storySections.length,
      );
      for (const section of storySections) {
        const renderedSection = page.locator(
          `[data-case-study-section="${section.id}"]`,
        );
        await expect(renderedSection).toBeVisible();
        await expect(
          renderedSection.getByRole("heading", { level: 2 }),
        ).toBeVisible();
        await expect(renderedSection.locator("p").first()).toBeVisible();
      }
      await expect(page.locator("#related-work-title")).toBeVisible();
      await expect(page).toHaveTitle(/\S+/);

      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      expect(new URL(canonical!).pathname).toBe(`/${locale}/work/${slug}`);
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        new RegExp(`/${locale}/work/${slug}/social-image$`),
      );

      const structuredTypes = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((scripts) =>
          scripts.map((script) => JSON.parse(script.textContent ?? "{}")['@type']),
        );
      expect(structuredTypes).toEqual(
        expect.arrayContaining(["CreativeWork", "BreadcrumbList"]),
      );
      expect(consoleErrors).toEqual([]);
    });
  }
}

test("Work index separates five projects from secondary experiments without filters", async ({
  page,
}) => {
  await page.goto("/en/work");

  await expect(
    page.locator('main article:has(a[href^="/en/work/"])'),
  ).toHaveCount(5);
  await expect(
    page.locator('main article:has(a[href^="/projects/"])'),
  ).toHaveCount(3);
  await expect(page.locator("main button[aria-pressed]")).toHaveCount(0);
});

test("anonymized studies expose only portfolio-safe media and no project link", async ({
  page,
}) => {
  await page.goto("/en/work/samsung-smart-gate-analytics");

  await expect(
    page.getByText("Presentation context", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(/portfolio reconstructions or references using test data/i),
  ).toBeVisible();
  await expect(
    page.locator('main img[src*="samsung-gate-flow.svg"]'),
  ).toHaveCount(1);
  await expect(
    page.locator(
      'main img:not([src*="/portfolio-v3/"]), main a[href^="http://"], main a[href^="https://"]',
    ),
  ).toHaveCount(0);
});

test("public case-study media uses the Next.js image optimizer", async ({
  page,
  request,
}) => {
  await page.goto("/en/work/alba-medence-3d-configurator");

  const image = page.getByAltText(
    "Interactive 3D pool configurator on desktop with an options sidebar.",
  ).first();
  await expect(image).toBeVisible();

  const optimizedSource = await image.getAttribute("src");
  expect(optimizedSource).toMatch(/^\/_next\/image\?/u);
  const originalSource = new URL(
    optimizedSource!,
    "http://127.0.0.1:3100",
  ).searchParams.get("url");
  expect(originalSource).toBe(
    "/portfolio-v3/projects/alba/alba-configurator-desktop.avif",
  );

  const [optimizedResponse, originalResponse] = await Promise.all([
    request.get(optimizedSource!, {
      headers: { accept: "image/avif,image/webp,image/*" },
    }),
    request.get(originalSource!),
  ]);

  expect(optimizedResponse.ok()).toBe(true);
  expect(optimizedResponse.headers()["content-type"]).toMatch(/^image\//u);
  expect((await optimizedResponse.body()).byteLength).toBeLessThan(
    (await originalResponse.body()).byteLength,
  );
});

test("unknown case-study slugs fail closed", async ({ page }) => {
  const response = await page.goto("/en/work/not-a-case-study");

  expect(response?.status()).toBe(404);
});

test("localized Work and case-study social images are generated", async ({
  request,
}) => {
  for (const path of [
    "/hu/work/social-image",
    "/en/work/social-image",
    "/hu/work/adott-enterprise-project-workflow/social-image",
    "/en/work/questlog-offline-first-pwa/social-image",
  ]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
  }
});
