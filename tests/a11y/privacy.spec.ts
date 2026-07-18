import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} privacy route has no serious accessibility violations`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/privacy`);
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
