import { expect, test } from "@playwright/test";

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} homepage exposes the V3 editorial information architecture`, async ({
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
      "featured-work",
      "samsung-impact",
      "experience",
      "capabilities",
      "lab",
      "studio",
      "contact",
    ]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }

    const showcases = page.locator("#featured-work article");
    await expect(showcases).toHaveCount(3);
    await expect(
      showcases.getByRole("link", {
        name:
          locale === "hu"
            ? "Esettanulmány megnyitása"
            : "Open case study",
      }),
    ).toHaveCount(3);
    await expect(page.locator("#experience ol > li")).toHaveCount(4);
    await expect(page.locator("#capabilities h4")).toHaveCount(4);

    const cvHref =
      locale === "hu"
        ? "/cv/kovacs-zalan-cv-hu.pdf"
        : "/cv/kovacs-zalan-cv-en.pdf";
    const cvLinks = page.locator(`a[href="${cvHref}"]`);
    expect(await cvLinks.count()).toBeGreaterThanOrEqual(2);
    await expect(cvLinks.first()).toHaveAttribute("download");

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

test("desktop hero uses the V3 type system and stays within three headline lines", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1_440, height: 1_000 });
  await page.goto("/hu");
  await page.evaluate(() => document.fonts.ready);

  const headline = page.locator("#hero h1");
  const headlineMetrics = await headline.evaluate((element) => {
    const styles = getComputedStyle(element);
    const lineHeight = Number.parseFloat(styles.lineHeight);

    return {
      fontFamily: styles.fontFamily,
      fontSize: Number.parseFloat(styles.fontSize),
      lineCount: Math.round(element.getBoundingClientRect().height / lineHeight),
    };
  });

  expect(headlineMetrics.fontFamily).toContain("Manrope");
  expect(headlineMetrics.fontSize).toBeGreaterThanOrEqual(80);
  expect(headlineMetrics.lineCount).toBeLessThanOrEqual(3);
  await expect(headline.locator(".font-serif")).toHaveCSS(
    "font-family",
    /Instrument Serif/u,
  );
  await expect(page.locator("#hero .font-mono").first()).toHaveCSS(
    "font-family",
    /IBM Plex Mono/u,
  );
});

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

test("deferred contact form preserves the document layout when it loads", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");

  const boundary = page.getByTestId("contact-form-boundary");
  await expect(page.getByTestId("contact-form-fallback")).toBeVisible();
  const before = await page.evaluate(() => ({
    boundaryHeight: document
      .querySelector<HTMLElement>("[data-testid='contact-form-boundary']")
      ?.getBoundingClientRect().height,
    footerTop:
      (document.querySelector("footer")?.getBoundingClientRect().top ?? 0) +
      window.scrollY,
  }));

  await boundary.scrollIntoViewIfNeeded();
  await expect(page.locator("#contact-submit")).toBeEnabled();
  const after = await page.evaluate(() => ({
    boundaryHeight: document
      .querySelector<HTMLElement>("[data-testid='contact-form-boundary']")
      ?.getBoundingClientRect().height,
    footerTop:
      (document.querySelector("footer")?.getBoundingClientRect().top ?? 0) +
      window.scrollY,
  }));
  const shift = Math.abs(after.footerTop - before.footerTop);

  expect(shift, JSON.stringify({ after, before, shift })).toBeLessThanOrEqual(1);
});

test("desktop deferred contact form preserves the document layout when it loads", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1_440, height: 1_000 });
  await page.goto("/en");

  const boundary = page.getByTestId("contact-form-boundary");
  await expect(page.getByTestId("contact-form-fallback")).toBeVisible();
  const before = await page.evaluate(() => ({
    boundaryHeight: document
      .querySelector<HTMLElement>("[data-testid='contact-form-boundary']")
      ?.getBoundingClientRect().height,
    footerTop:
      (document.querySelector("footer")?.getBoundingClientRect().top ?? 0) +
      window.scrollY,
  }));

  await boundary.scrollIntoViewIfNeeded();
  await expect(page.locator("#contact-submit")).toBeEnabled();
  const after = await page.evaluate(() => ({
    boundaryHeight: document
      .querySelector<HTMLElement>("[data-testid='contact-form-boundary']")
      ?.getBoundingClientRect().height,
    footerTop:
      (document.querySelector("footer")?.getBoundingClientRect().top ?? 0) +
      window.scrollY,
  }));
  const shift = Math.abs(after.footerTop - before.footerTop);

  expect(shift, JSON.stringify({ after, before, shift })).toBeLessThanOrEqual(1);
});

test("reduced-motion preference disables the blueprint motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");

  const motion = await page.locator(".blueprint-reveal").first().evaluate(
    (element) => {
      const styles = getComputedStyle(element);
      return {
        animationDuration: styles.animationDuration,
        transitionDuration: styles.transitionDuration,
      };
    },
  );

  expect(motion.animationDuration).toBe("0.001s");
  expect(motion.transitionDuration).toBe("0.001s");
});

test("Lab teaser selector exposes complete flows and supports arrow keys", async ({
  page,
}) => {
  await page.goto("/en");

  const teaser = page.getByTestId("lab-teaser-flow");
  const requestTab = teaser.getByRole("tab", { name: "Request" });
  const approvalTab = teaser.getByRole("tab", { name: "Approval" });
  const offlineTab = teaser.getByRole("tab", { name: "Offline" });

  await expect(requestTab).toHaveAttribute("aria-selected", "true");
  await expect(
    teaser.getByRole("tabpanel").locator("ol > li > span:last-child"),
  ).toHaveText(["Input", "Validate", "Authorize", "Persist"]);

  await approvalTab.click();
  await expect(approvalTab).toHaveAttribute("aria-selected", "true");
  await expect(
    teaser.getByRole("tabpanel").locator("ol > li > span:last-child"),
  ).toHaveText(["Identity", "Permission", "Decision", "Audit"]);

  await approvalTab.press("ArrowRight");
  await expect(offlineTab).toBeFocused();
  await expect(offlineTab).toHaveAttribute("aria-selected", "true");
  await expect(
    teaser.getByRole("tabpanel").locator("ol > li > span:last-child"),
  ).toHaveText(["Local state", "Outbox", "Sync", "Conflict"]);

  await offlineTab.press("Home");
  await expect(requestTab).toBeFocused();
  await expect(requestTab).toHaveAttribute("aria-selected", "true");
});

test("Lab teaser selector removes transition motion when requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");

  const transitionDuration = await page
    .getByTestId("lab-teaser-flow")
    .getByRole("tab", { name: "Request" })
    .evaluate((element) => getComputedStyle(element).transitionDuration);

  expect(transitionDuration).toBe("0.001s");
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
