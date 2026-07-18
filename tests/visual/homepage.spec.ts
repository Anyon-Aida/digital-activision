import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
  { name: "wide", width: 1920, height: 1080 },
] as const;

for (const locale of ["hu", "en"] as const) {
  for (const viewport of viewports) {
    test(`${locale.toUpperCase()} homepage matches the ${viewport.name} visual baseline`, async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize(viewport);
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);

      await expect(page).toHaveScreenshot(
        `homepage-${locale}-${viewport.name}.png`,
        { fullPage: false },
      );
    });
  }
}
