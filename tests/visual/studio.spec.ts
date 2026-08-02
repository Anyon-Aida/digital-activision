import { expect, test } from "@playwright/test";

test("English Studio mobile hero matches its baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/studio");
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot("studio-en-mobile.png", { fullPage: false });
});

test("Hungarian Studio desktop hero matches its baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/hu/studio");
  await page.evaluate(() => document.fonts.ready);

  await expect(page).toHaveScreenshot("studio-hu-desktop.png", { fullPage: false });
});

test("Studio scope-led collaboration matches its baseline", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/hu/studio");
  await page.evaluate(() => document.fonts.ready);

  await expect(page.locator("#scope")).toHaveScreenshot(
    "studio-scope-hu.png",
  );
});

test("Studio experiments remain visually subordinate", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en/studio");
  await page.evaluate(() => document.fonts.ready);

  await expect(page.locator("#experiments")).toHaveScreenshot(
    "studio-experiments-en.png",
  );
});
