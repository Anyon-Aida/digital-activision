import { expect, test } from "@playwright/test";

const contactVisuals = [
  {
    locale: "hu",
    name: "contact-hu-desktop",
    viewport: { height: 1_000, width: 1_440 },
  },
  {
    locale: "en",
    name: "contact-en-mobile",
    viewport: { height: 844, width: 390 },
  },
] as const;

for (const visual of contactVisuals) {
  test(`${visual.name} matches its visual baseline`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize(visual.viewport);
    await page.goto(`/${visual.locale}#contact`);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("#contact-submit")).toBeEnabled();
    await page.addStyleTag({
      content: "header.sticky { visibility: hidden !important; }",
    });

    await expect(page.locator("#contact")).toHaveScreenshot(
      `${visual.name}.png`,
    );
  });
}
