import { expect, test } from "@playwright/test";

const cases = [
  {
    name: "work-en-mobile",
    path: "/en/work",
    viewport: { width: 390, height: 844 },
  },
  {
    name: "work-hu-desktop",
    path: "/hu/work",
    viewport: { width: 1440, height: 1000 },
  },
  {
    name: "case-samsung-en-mobile",
    path: "/en/work/samsung-smart-gate-analytics",
    viewport: { width: 390, height: 844 },
  },
  {
    name: "case-adott-hu-desktop",
    path: "/hu/work/adott-enterprise-project-workflow",
    viewport: { width: 1440, height: 1000 },
  },
] as const;

for (const visualCase of cases) {
  test(`${visualCase.name} matches its visual baseline`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize(visualCase.viewport);
    await page.goto(visualCase.path);
    await page.evaluate(() => document.fonts.ready);

    await expect(page).toHaveScreenshot(`${visualCase.name}.png`, {
      fullPage: false,
    });
  });
}
