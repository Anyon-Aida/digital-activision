import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the hero blueprint has no serious accessibility violations", async ({
  page,
}) => {
  await page.goto("/en");

  const results = await new AxeBuilder({ page })
    .include("#hero")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const seriousViolations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );

  expect(seriousViolations).toEqual([]);
});
