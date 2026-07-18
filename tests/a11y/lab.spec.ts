import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} Lab has no serious accessibility violations`, async ({
    page,
  }) => {
    await page.goto(`/${locale}/lab`);

    if (locale === "en") {
      await page
        .getByRole("group", { name: "Select an architecture view" })
        .getByRole("button", { name: /Offline sync/ })
        .click();
      await page
        .getByRole("group", { name: "Select a node" })
        .getByRole("button", { name: /Conflict policy/ })
        .click();
      await page
        .getByRole("group", { name: "Select a role" })
        .getByRole("button", { name: "Guest customer", exact: true })
        .click();
      await page
        .locator(
          'section[aria-labelledby="architecture-text-fallback-title"] details',
        )
        .first()
        .locator("summary")
        .click();
    }

    const results = await new AxeBuilder({ page })
      .include("main")
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const seriousViolations = results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    );

    expect(seriousViolations).toEqual([]);
  });
}
