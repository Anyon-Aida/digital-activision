import { expect, test } from "@playwright/test";

const localeExpectations = {
  hu: {
    heading: "Rendszerhatárok, amelyeket végig lehet követni",
    description: /Hozzáférhető, koncepcionális architektúra/,
    panelHeadings: ["Validált request", "Approval workflow", "Offline sync"],
  },
  en: {
    heading: "System boundaries you can inspect end to end",
    description: /Accessible conceptual demonstrations of architecture/,
    panelHeadings: ["Validated request", "Approval workflow", "Offline sync"],
  },
} as const;

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} Lab route exposes localized metadata and three conceptual views`, async ({
    page,
  }) => {
    const response = await page.goto(`/${locale}/lab`);
    const expected = localeExpectations[locale];

    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      expected.heading,
    );
    await expect(page).toHaveTitle("Engineering Lab | Kovács Zalán");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      expected.description,
    );
    await expect(
      page.locator('[data-lab-status="conceptual-demonstration"]'),
    ).toHaveCount(1);

    for (const panelHeading of expected.panelHeadings) {
      await expect(
        page.getByRole("heading", { level: 2, name: panelHeading }),
      ).toBeVisible();
    }
    await expect(page.locator("main [role='note']")).toHaveCount(1);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname).toBe(`/${locale}/lab`);

    for (const alternateLocale of ["hu", "en", "x-default"] as const) {
      const href = await page
        .locator(`link[rel="alternate"][hreflang="${alternateLocale}"]`)
        .getAttribute("href");
      const targetLocale = alternateLocale === "x-default" ? "hu" : alternateLocale;

      expect(new URL(href!).pathname).toBe(`/${targetLocale}/lab`);
    }
  });
}

test("all architecture panels and text fallbacks are present in the server HTML", async ({
  page,
  request,
}) => {
  const response = await request.get("/en/lab");
  const html = await response.text();

  expect(response.status()).toBe(200);
  expect(html).toContain("Complete architecture text view");
  expect(html).toContain("Validated request");
  expect(html).toContain("Approval workflow");
  expect(html).toContain("Offline sync");

  await page.goto("/en/lab");
  const panels = page.locator(
    "#validated-request, #approval-workflow, #offline-sync",
  );
  const fallbacks = panels.locator("details");

  await expect(panels).toHaveCount(3);
  await expect(fallbacks).toHaveCount(3);
  await expect(fallbacks.locator("summary")).toHaveText([
    "Complete architecture text view",
    "Complete architecture text view",
    "Complete architecture text view",
  ]);
});

test("architecture panels support pointer, Enter and Space node selection", async ({
  page,
}) => {
  await page.goto("/en/lab");

  const validatedPanel = page.locator("#validated-request");
  const authorizationNode = validatedPanel
    .getByRole("group", { name: "Select a node" })
    .getByRole("button", { name: /Authorization policy/ });
  await authorizationNode.click();
  await expect(authorizationNode).toHaveAttribute("aria-pressed", "true");
  await expect(
    validatedPanel
      .locator('article[aria-live="polite"]')
      .getByRole("heading", { name: "Authorization policy" }),
  ).toBeVisible();

  const approvalPanel = page.locator("#approval-workflow");
  const permissionNode = approvalPanel
    .getByRole("group", { name: "Select a node" })
    .getByRole("button", { name: /Permission policy/ });
  await permissionNode.focus();
  await permissionNode.press("Enter");
  await expect(permissionNode).toHaveAttribute("aria-pressed", "true");
  await expect(
    approvalPanel
      .locator('article[aria-live="polite"]')
      .getByRole("heading", { name: "Permission policy" }),
  ).toBeVisible();

  const offlinePanel = page.locator("#offline-sync");
  const conflictNode = offlinePanel
    .getByRole("group", { name: "Select a node" })
    .getByRole("button", {
      name: /Conflict policy/,
    });
  await conflictNode.focus();
  await conflictNode.press("Space");
  await expect(conflictNode).toHaveAttribute("aria-pressed", "true");
  await expect(
    offlinePanel
      .locator('article[aria-live="polite"]')
      .getByRole("heading", { name: "Conflict policy" }),
  ).toBeVisible();
});

test("RBAC demonstration exposes compact role state and a complete disclosure matrix", async ({
  page,
}) => {
  await page.goto("/en/lab");

  const permissionSection = page.locator("#permissions");
  const roleSelector = permissionSection.getByRole("group", {
    name: "Select a role",
  });
  await expect(roleSelector.getByRole("button")).toHaveCount(4);

  const guestRole = roleSelector.getByRole("button", {
    name: "Guest customer",
    exact: true,
  });
  await guestRole.click();
  await expect(guestRole).toHaveAttribute("aria-pressed", "true");
  await expect(
    permissionSection.getByRole("heading", {
      name: "Selected role: Guest customer",
    }),
  ).toBeVisible();

  const editStructure = permissionSection
    .locator("li")
    .filter({ hasText: "Edit structure" });
  const approveSpecification = permissionSection
    .locator("li")
    .filter({ hasText: "Approve specification" });
  await expect(editStructure).toContainText("Denied");
  await expect(approveSpecification).toContainText("Allowed");

  await permissionSection
    .getByText("Complete permission matrix", { exact: true })
    .click();

  const matrix = permissionSection.locator("table");
  await expect(matrix).toHaveCount(1);
  await expect(matrix).toBeVisible();
  await expect(matrix.locator("thead th")).toHaveCount(5);
  await expect(matrix.locator("tbody tr")).toHaveCount(8);
  await expect(matrix.getByRole("cell")).toHaveCount(32);
  await expect(
    matrix.getByRole("cell", {
      name: "Guest customer: Allowed",
      exact: true,
    }),
  ).toHaveCount(4);
  await expect(
    matrix.getByRole("cell", {
      name: "Guest customer: Denied",
      exact: true,
    }),
  ).toHaveCount(4);
  await expect(page.locator("main [role='note']")).toHaveCount(1);
});

test("synthetic API contract documents its stable validation and conflict surface", async ({
  page,
}) => {
  await page.goto("/en/lab");

  await expect(
    page.getByRole("heading", { name: "A predictable decision endpoint" }),
  ).toBeVisible();
  await expect(
    page.getByText("POST /example-api/projects/:projectId/decision", {
      exact: true,
    }),
  ).toBeVisible();

  for (const status of ["400", "401", "403", "409"] as const) {
    await expect(page.getByText(status, { exact: true })).toBeVisible();
  }

  await expect(
    page.getByText(/This portfolio does not serve the endpoint/),
  ).toHaveCount(0);
});

test("Lab respects reduced motion and contains wide demos without page overflow", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en/lab");

  const motion = await page
    .locator("#validated-request")
    .getByRole("group", { name: "Select a node" })
    .getByRole("button")
    .first()
    .evaluate((element) => {
      const styles = getComputedStyle(element);
      return {
        animationDuration: styles.animationDuration,
        transitionDuration: styles.transitionDuration,
      };
    });

  expect(motion.animationDuration).toBe("0.001s");
  expect(motion.transitionDuration).toBe("0.001s");

  for (const scenario of [
    { locale: "en", width: 320 },
    { locale: "hu", width: 390 },
  ] as const) {
    await page.setViewportSize({ width: scenario.width, height: 844 });
    await page.goto(`/${scenario.locale}/lab`);
    await page.evaluate(() => document.fonts.ready);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  }
});
