import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
  { name: "wide", width: 1920, height: 1080 },
] as const;

async function waitForImages(page: Page, selector: string) {
  const images = page.locator(selector);
  const count = await images.count();

  expect(count).toBeGreaterThan(0);
  for (let index = 0; index < count; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (element) =>
            (element as HTMLImageElement).complete &&
            (element as HTMLImageElement).naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
}

for (const locale of ["hu", "en"] as const) {
  for (const viewport of viewports) {
    test(`${locale.toUpperCase()} homepage matches the ${viewport.name} visual baseline`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize(viewport);
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      await waitForImages(page, "#hero img");
      await page.evaluate(() => window.scrollTo(0, 0));

      await expect(page).toHaveScreenshot(
        `homepage-${locale}-${viewport.name}.png`,
        { fullPage: false },
      );
    });
  }

  test(`${locale.toUpperCase()} homepage full-page section rhythm matches the visual baseline`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`/${locale}`);
    await page.evaluate(() => document.fonts.ready);
    await waitForImages(page, "#hero img, #featured-work img");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await expect(page.locator("#contact-submit")).toBeEnabled();
    await page.evaluate(() => window.scrollTo(0, 0));

    await expect(page).toHaveScreenshot(`homepage-${locale}-full-page.png`, {
      fullPage: true,
    });
  });
}
