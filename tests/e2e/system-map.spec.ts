import { expect, test } from "@playwright/test";

test("the System Map supports keyboard and pointer selection", async ({
  page,
}) => {
  await page.goto("/en");

  const systemMap = page.locator("#system-map");
  const userInterface = systemMap.getByRole("button", {
    name: /User Interface/,
  });
  const businessService = systemMap.getByRole("button", {
    name: /Business service/,
  });
  const dataLayer = systemMap.getByRole("button", {
    name: /PostgreSQL \/ cache/,
  });
  const announcedDetail = systemMap.getByRole("status");

  await expect(userInterface).toHaveAttribute("aria-pressed", "true");
  await expect(announcedDetail).toHaveAttribute("aria-live", "polite");
  await expect(announcedDetail).toHaveAttribute("aria-atomic", "true");
  await expect(announcedDetail).toContainText(
    "Semantic, responsive interactions connect to explicit server contracts.",
  );

  await businessService.focus();
  await page.keyboard.press("Enter");

  await expect(businessService).toBeFocused();
  await expect(businessService).toHaveAttribute("aria-pressed", "true");
  await expect(userInterface).toHaveAttribute("aria-pressed", "false");
  await expect(announcedDetail).toContainText("Business service");
  await expect(announcedDetail).toContainText(
    "Workflow, transactional rules and integrations stay separate from UI and transport.",
  );

  await dataLayer.click();

  await expect(dataLayer).toHaveAttribute("aria-pressed", "true");
  await expect(businessService).toHaveAttribute("aria-pressed", "false");
  await expect(announcedDetail).toContainText("PostgreSQL / cache");
});

test("the System Map exposes the complete flow as semantic text", async ({
  page,
}) => {
  await page.goto("/en");

  const systemMap = page.locator("#system-map");
  const fallbackHeading = systemMap.getByRole("heading", {
    name: "The complete flow in text",
  });
  const fallback = fallbackHeading.locator("..");
  const fallbackList = fallback.locator(":scope > ol");
  const nodes = [
    "User Interface",
    "Next.js boundary",
    "API / Server Action",
    "Auth & authorization",
    "Business service",
    "PostgreSQL / cache",
    "Monitoring & audit",
  ];

  await expect(fallbackHeading).toBeVisible();
  await expect(fallbackList).toHaveCount(1);
  await expect(fallbackList.locator(":scope > li")).toHaveCount(nodes.length);

  for (const node of nodes) {
    await expect(
      fallbackList.getByRole("heading", { name: node, exact: true }),
    ).toBeVisible();
  }

  await expect(fallbackList).toContainText(
    "PII-free structured signals, request correlation and auditable state changes.",
  );
});

test("the System Map removes meaningful motion when reduced motion is requested", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");

  const node = page
    .locator("#system-map")
    .getByRole("button", { name: /Business service/ });

  await node.hover();

  const motion = await node.evaluate((element) => {
    const style = getComputedStyle(element);
    const durations = [style.animationDuration, style.transitionDuration]
      .flatMap((value) => value.split(","))
      .map((value) => {
        const duration = Number.parseFloat(value);
        return value.trim().endsWith("ms") ? duration : duration * 1_000;
      });

    return {
      durations,
      transform: style.transform,
    };
  });

  expect(motion.transform).toBe("none");
  expect(motion.durations.every((duration) => duration <= 1)).toBe(true);
});
