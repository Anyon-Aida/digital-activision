import { expect, test } from "@playwright/test";

test("English desktop open command palette matches its baseline", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/en");
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("button", { name: /Open quick navigation/ }).click();

  await expect(
    page.getByRole("dialog", { name: "Quick navigation" }),
  ).toBeVisible();
  await expect(page).toHaveScreenshot("command-palette-en-desktop.png", {
    fullPage: false,
  });
});

test("Hungarian mobile open command palette matches its baseline", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/hu");
  await page.evaluate(() => document.fonts.ready);
  await page
    .getByRole("button", { name: /Gyors navigáció megnyitása/ })
    .click();

  await expect(
    page.getByRole("dialog", { name: "Gyors navigáció" }),
  ).toBeVisible();
  await expect(page).toHaveScreenshot("command-palette-hu-mobile.png", {
    fullPage: false,
  });
});
