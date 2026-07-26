import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const path of [
  "/hu/work",
  "/en/work/adott-enterprise-project-workflow",
  "/hu/work/samsung-smart-gate-analytics",
  "/en/work/alba-medence-3d-configurator",
]) {
  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(/\S+/);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const seriousViolations = results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    );

    expect(seriousViolations).toEqual([]);
  });
}
