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
    const capabilityEvidenceLinks = page.locator("#capabilities article > a");
    await expect(capabilityEvidenceLinks).toHaveCount(4);
    for (const link of await capabilityEvidenceLinks.all()) {
      await expect(link).toHaveAttribute(
        "href",
        new RegExp(`^/${locale}/work/[a-z0-9-]+$`),
      );
    }
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

test("contact form code loads only when the contact section is near the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1_440, height: 900 });
  await page.goto("/en");

  await expect(page.getByTestId("contact-form-fallback")).toBeVisible();
  await expect(page.locator("#contact-submit")).toHaveCount(0);

  await page.locator("#contact").scrollIntoViewIfNeeded();

  await expect(page.locator("#contact-submit")).toBeEnabled();
  await expect(page.getByTestId("contact-form-fallback")).toHaveCount(0);
});

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

test("public GitHub and LinkedIn links use safe external-link semantics", async ({
  page,
}) => {
  await page.goto("/en");

  for (const href of [
    "https://github.com/Anyon-Aida",
    "https://www.linkedin.com/company/digital-activision",
  ]) {
    const links = page.locator(`a[href="${href}"]`);
    const count = await links.count();

    expect(count).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) {
      await expect(links.nth(index)).toHaveAttribute("target", "_blank");
      await expect(links.nth(index)).toHaveAttribute(
        "rel",
        /^(?=.*\bnoopener\b)(?=.*\bnoreferrer\b)/u,
      );
    }
  }
});
