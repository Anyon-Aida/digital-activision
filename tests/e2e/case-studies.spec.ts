import { expect, test } from "@playwright/test";
import { caseStudySlugs } from "../../src/content/case-studies";

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} work index is registry-backed`, async ({ page }) => {
    const response = await page.goto(`/${locale}/work`);

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("main article")).toHaveCount(4);
    await expect(page.locator("main article h2").first()).toContainText(
      "Adott Solution",
    );

    const caseLinks = await page
      .locator(`a[href^="/${locale}/work/"]`)
      .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute("href")))]);
    expect(caseLinks).toHaveLength(4);
  });

  for (const slug of caseStudySlugs) {
    test(`${locale.toUpperCase()} case study ${slug} exposes all validated sections`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      page.on("console", (message) => {
        if (message.type() === "error") consoleErrors.push(message.text());
      });

      const response = await page.goto(`/${locale}/work/${slug}`);

      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("[data-case-study-section]")).toHaveCount(16);
      await expect(page.locator("[data-case-study-section='summary']")).toBeVisible();
      await expect(page.locator("[data-case-study-section='related']")).toBeVisible();
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

test("Work index filters projects without losing accessible state", async ({
  page,
}) => {
  await page.goto("/en/work");

  const anonymized = page.getByRole("button", {
    name: "Anonymized",
    exact: true,
  });
  await anonymized.click();
  await expect(anonymized).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("main article")).toHaveCount(2);
  await expect(page.getByText("2 projects shown")).toBeVisible();

  await page.getByRole("button", { name: "In progress", exact: true }).click();
  await expect(page.locator("main article")).toHaveCount(1);
  await expect(page.locator("main article h2")).toContainText("QuestLog");
});

test("anonymized studies do not expose internal media or project links", async ({
  page,
}) => {
  await page.goto("/en/work/samsung-smart-gate-analytics");

  await expect(page.getByText("Anonymized", { exact: true }).first()).toBeVisible();
  await expect(page.locator("main img")).toHaveCount(0);
  await expect(page.locator('main a[href*="samsung"]')).toHaveCount(0);
});

test("public case-study media uses the Next.js image optimizer", async ({
  page,
  request,
}) => {
  await page.goto("/en/work/alba-medence-3d-configurator");

  const image = page.getByAltText(
    "Screenshot stored in the public repository for the Alba Pool project",
  );
  await expect(image).toBeVisible();

  const optimizedSource = await image.getAttribute("src");
  expect(optimizedSource).toMatch(/^\/_next\/image\?/u);

  const [optimizedResponse, originalResponse] = await Promise.all([
    request.get(optimizedSource!, {
      headers: { accept: "image/avif,image/webp,image/*" },
    }),
    request.get("/projects/alba_pool.png"),
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
