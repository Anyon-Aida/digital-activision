import { expect, test } from "@playwright/test";

test("the command palette opens by trigger and both platform shortcuts", async ({
  page,
}) => {
  await page.goto("/en");

  const trigger = page.getByRole("button", {
    name: /Open quick navigation/,
  });
  await trigger.click();

  const dialog = page.getByRole("dialog", { name: "Quick navigation" });
  const input = page.getByRole("combobox", { name: "Search commands" });
  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();

  await input.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();

  await page.keyboard.press("Control+K");
  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();
  await input.press("Escape");

  await page.keyboard.press("Meta+K");
  await expect(dialog).toBeVisible();
  await expect(input).toBeFocused();
});

test("project and technology search supports Arrow, Home, End and Enter", async ({
  page,
}) => {
  await page.goto("/en");
  await page.keyboard.press("Control+K");

  const input = page.getByRole("combobox", { name: "Search commands" });
  await input.fill("Node.js analytics");
  await expect(
    page.getByRole("option", { name: /Samsung – Smart Gate Analytics/ }),
  ).toBeVisible();

  await input.fill("backend");
  await input.press("End");
  expect(await input.getAttribute("aria-activedescendant")).toBeTruthy();
  await input.press("Home");
  await expect(
    page.getByRole("option", { name: /Show backend projects/ }),
  ).toHaveAttribute("aria-selected", "true");
  const firstBackendResult = await input.getAttribute(
    "aria-activedescendant",
  );
  await input.press("ArrowDown");
  expect(await input.getAttribute("aria-activedescendant")).not.toBe(
    firstBackendResult,
  );
  await input.press("ArrowUp");
  await expect(
    page.getByRole("option", { name: /Show backend projects/ }),
  ).toHaveAttribute("aria-selected", "true");

  await input.fill("RBAC");
  await expect(
    page.getByRole("option", {
      name: /Adott Solution – Enterprise Project Workflow/,
    }),
  ).toBeVisible();
  await input.press("End");
  await input.press("Enter");

  await expect(page).toHaveURL(
    /\/en\/work\/adott-enterprise-project-workflow$/,
  );
});

test("the unavailable CV command never navigates", async ({ page }) => {
  await page.goto("/en/studio");
  const originalUrl = page.url();
  await page.keyboard.press("Control+K");

  const dialog = page.getByRole("dialog", { name: "Quick navigation" });
  const input = page.getByRole("combobox", { name: "Search commands" });
  await input.fill("Open CV");

  const cv = page.getByRole("option", { name: /Open CV/ });
  await expect(cv).toHaveAttribute("aria-disabled", "true");
  await input.press("Enter");
  await expect(dialog).toBeVisible();
  expect(page.url()).toBe(originalUrl);
  await cv.dispatchEvent("click");
  await expect(dialog).toBeVisible();
  expect(page.url()).toBe(originalUrl);
});

test("backend and security shortcuts resolve to honest registry work", async ({
  page,
}) => {
  await page.goto("/en");
  await page.keyboard.press("Control+K");

  const input = page.getByRole("combobox", { name: "Search commands" });
  await input.fill("Show backend projects");
  await page.getByRole("option", { name: /Show backend projects/ }).click();
  await expect(page).toHaveURL(
    /\/en\/work\/adott-enterprise-project-workflow$/,
  );

  await page.keyboard.press("Control+K");
  await input.fill("Show security-related work");
  const security = page.getByRole("option", {
    name: /Show security-related work/,
  });
  await expect(security).toContainText("Adott Solution");
  await security.click();
  await expect(
    page.getByRole("dialog", { name: "Quick navigation" }),
  ).toBeHidden();
  await expect(page).toHaveURL(
    /\/en\/work\/adott-enterprise-project-workflow$/,
  );
});

test("locale switching preserves a case-study route, query and hash", async ({
  page,
}) => {
  await page.goto(
    "/en/work/samsung-smart-gate-analytics?visibility=anonymized#case-study-security",
  );
  await page.keyboard.press("Control+K");

  const input = page.getByRole("combobox", { name: "Search commands" });
  await input.fill("Switch to Hungarian");
  await input.press("Enter");

  await expect(page).toHaveURL(
    /\/hu\/work\/samsung-smart-gate-analytics\?visibility=anonymized#case-study-security$/,
  );
  await expect(page.locator("html")).toHaveAttribute("lang", "hu");
});

test("the open palette fits a 320 pixel viewport without page overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 844 });
  await page.goto("/en");
  await page.getByRole("button", { name: /Open quick navigation/ }).click();

  const dimensions = await page.evaluate(() => {
    const dialog = document.querySelector<HTMLDialogElement>(
      "#global-command-palette",
    );
    const rect = dialog?.getBoundingClientRect();

    return {
      dialogClientWidth: dialog?.clientWidth ?? 0,
      dialogLeft: rect?.left ?? -1,
      dialogRight: rect?.right ?? Number.POSITIVE_INFINITY,
      dialogScrollWidth: dialog?.scrollWidth ?? Number.POSITIVE_INFINITY,
      rootClientWidth: document.documentElement.clientWidth,
      rootScrollWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    };
  });

  expect(dimensions.rootScrollWidth).toBeLessThanOrEqual(
    dimensions.rootClientWidth,
  );
  expect(dimensions.dialogScrollWidth).toBeLessThanOrEqual(
    dimensions.dialogClientWidth,
  );
  expect(dimensions.dialogLeft).toBeGreaterThanOrEqual(0);
  expect(dimensions.dialogRight).toBeLessThanOrEqual(
    dimensions.viewportWidth,
  );
});
