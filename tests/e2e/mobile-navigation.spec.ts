import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test("the mobile navigation is keyboard-operable and restores focus", async ({
  page,
}) => {
  await page.goto("/en");

  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.focus();
  await page.keyboard.press("Enter");

  const sheet = page.getByRole("dialog", { name: "Navigation" });
  const closeButton = page.getByRole("button", { name: "Close navigation" });

  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(sheet).toBeVisible();
  await expect(closeButton).toBeFocused();

  await page.keyboard.press("Tab");
  await expect(page.locator("#mobile-navigation :focus")).toHaveCount(1);

  await page.keyboard.press("Escape");
  await expect(sheet).toBeHidden();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});
