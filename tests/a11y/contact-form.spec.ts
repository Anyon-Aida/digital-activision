import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} contact form default and invalid states have no serious accessibility violations`, async ({
    page,
  }) => {
    await page.goto(`/${locale}#contact`);
    await expect(page.locator("#contact-submit")).toBeEnabled();

    const defaultResults = await new AxeBuilder({ page })
      .include("#contact")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const defaultSeriousViolations = defaultResults.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    );

    await page.locator("#contact-submit").click();
    await expect(page.locator("#contact-name-error")).toBeVisible();

    const invalidResults = await new AxeBuilder({ page })
      .include("#contact")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const invalidSeriousViolations = invalidResults.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    );

    expect({
      default: defaultSeriousViolations,
      invalid: invalidSeriousViolations,
    }).toEqual({ default: [], invalid: [] });
  });
}
