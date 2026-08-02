import { expect, test } from "@playwright/test";

test("the hero blueprint uses the three real project fragments", async ({
  page,
}) => {
  await page.goto("/en");

  const blueprint = page.getByTestId("hero-blueprint");
  await expect(blueprint).toBeVisible();
  await expect(blueprint.getByRole("img")).toHaveCount(3);
  await expect(blueprint).toContainText("WORKFLOW");
  await expect(blueprint).toContainText("3D CONFIG");
  await expect(blueprint).toContainText("BOOKING");
  await expect(blueprint).toContainText("DATA / API");

  for (const image of await blueprint.getByRole("img").all()) {
    await expect(image).toHaveAttribute("src", /hero-blueprint-/);
    await expect(image).toHaveAttribute("alt", /.+/);
  }
});

test("the hero blueprint remains static with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");

  const motion = await page.locator(".blueprint-reveal").first().evaluate(
    (element) => {
      const style = getComputedStyle(element);
      return [style.animationDuration, style.transitionDuration]
        .flatMap((value) => value.split(","))
        .map((value) => {
          const duration = Number.parseFloat(value);
          return value.trim().endsWith("ms") ? duration : duration * 1_000;
        });
    },
  );

  expect(motion.every((duration) => duration <= 1)).toBe(true);
});
