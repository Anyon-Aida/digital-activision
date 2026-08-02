import { expect, test } from "@playwright/test";

const visualCases = [
  {
    name: "lab-hu-mobile-hero",
    path: "/hu/lab",
    viewport: { width: 390, height: 844 },
    target: "viewport",
  },
  {
    name: "lab-en-desktop-architecture",
    path: "/en/lab",
    viewport: { width: 1440, height: 1000 },
    target: "architecture",
  },
  {
    name: "lab-en-mobile-permissions",
    path: "/en/lab",
    viewport: { width: 390, height: 844 },
    target: "permissions",
  },
  {
    name: "lab-hu-desktop-api",
    path: "/hu/lab",
    viewport: { width: 1440, height: 1000 },
    target: "api",
  },
] as const;

for (const visualCase of visualCases) {
  test(`${visualCase.name} matches its visual baseline`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize(visualCase.viewport);
    await page.goto(visualCase.path);
    await page.evaluate(() => document.fonts.ready);

    if (visualCase.target !== "viewport") {
      await page.addStyleTag({
        content: "header.sticky { visibility: hidden !important; }",
      });
      await expect(page.locator("header.sticky")).toBeHidden();
    }

    if (visualCase.target === "architecture") {
      const section = page.locator("#offline-sync");
      await section
        .getByRole("group", { name: "Select a node" })
        .getByRole("button", { name: /Conflict policy/ })
        .click();

      await section.scrollIntoViewIfNeeded();
      await expect(section).toHaveScreenshot(`${visualCase.name}.png`);
      return;
    }

    if (visualCase.target === "permissions") {
      await page
        .getByRole("group", { name: "Select a role" })
        .getByRole("button", { name: "Guest customer", exact: true })
        .click();

      const section = page
        .getByRole("heading", {
          name: "What would this illustrative policy allow?",
        })
        .locator("xpath=ancestor::section[1]");
      await section.scrollIntoViewIfNeeded();
      await expect(section).toHaveScreenshot(`${visualCase.name}.png`);
      return;
    }

    if (visualCase.target === "api") {
      const section = page
        .getByRole("heading", { name: "Kiszámítható decision endpoint" })
        .locator("xpath=ancestor::section[1]");
      await section.scrollIntoViewIfNeeded();
      await expect(section).toHaveScreenshot(`${visualCase.name}.png`);
      return;
    }

    await expect(page).toHaveScreenshot(`${visualCase.name}.png`, {
      fullPage: false,
    });
  });
}
