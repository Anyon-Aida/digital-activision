import { expect, test } from "@playwright/test";

test("localized homepage shell renders without browser errors", async ({
  page,
}) => {
  const runtimeErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") {
      runtimeErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => runtimeErrors.push(error.message));

  for (const locale of ["hu", "en"] as const) {
    const response = await page.goto(`/${locale}`);

    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
  }

  expect(runtimeErrors).toEqual([]);
});

test("core keyboard and deferred-contact interactions work", async ({
  page,
}) => {
  await page.goto("/en");

  await page.keyboard.press("Control+K");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await expect(page.locator("#contact-submit")).toBeEnabled();
});

test("engineering, Lab and Studio routes render their primary content", async ({
  page,
}) => {
  for (const pathname of [
    "/en/work/samsung-smart-gate-analytics",
    "/en/lab",
    "/hu/studio",
  ]) {
    const response = await page.goto(pathname);

    expect(response?.ok()).toBe(true);
    await expect(page.locator("h1")).toBeVisible();
  }
});
