import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} open command palette has no serious accessibility violations`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`);
    await page
      .getByRole("button", {
        name:
          locale === "hu"
            ? /Gyors navigáció megnyitása/
            : /Open quick navigation/,
      })
      .click();

    const dialog = page.getByRole("dialog", {
      name: locale === "hu" ? "Gyors navigáció" : "Quick navigation",
    });
    await expect(dialog).toBeVisible();

    const results = await new AxeBuilder({ page })
      .include("#global-command-palette")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const seriousViolations = results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    );

    expect(seriousViolations).toEqual([]);
  });
}
