import { expect, test } from "@playwright/test";

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} developer homepage exposes the complete information architecture`, async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    await page.goto(`/${locale}`);

    await expect(page.locator("h1")).toHaveCount(1);
    for (const id of [
      "hero",
      "system-map",
      "featured-work",
      "capabilities",
      "experience",
      "standards",
      "studio",
      "contact",
    ]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    await expect(page.locator("#featured-work article")).toHaveCount(4);
    await expect(page.locator("#experience > div > ol > li")).toHaveCount(6);
    await expect(page.getByRole("button", { name: /CV/i }).first()).toBeDisabled();
    expect(consoleErrors).toEqual([]);
  });
}

for (const width of [320, 390] as const) {
  test(`homepage has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/en");

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  });
}

test("reduced-motion preference disables non-essential motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");

  const motion = await page.locator("#system-map button").first().evaluate((element) => {
    const styles = getComputedStyle(element);
    return {
      animationDuration: styles.animationDuration,
      transitionDuration: styles.transitionDuration,
    };
  });

  expect(motion.animationDuration).toBe("0.001s");
  expect(motion.transitionDuration).toBe("0.001s");
});
