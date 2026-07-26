import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("the interactive System Map has no serious accessibility violations", async ({
  page,
}) => {
  await page.goto("/en");

  const systemMap = page.locator("#system-map");
  await systemMap
    .getByRole("button", { name: /Auth & authorization/ })
    .click();

  const results = await new AxeBuilder({ page })
    .include("#system-map")
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  const seriousViolations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );

  expect(seriousViolations).toEqual([]);
});
