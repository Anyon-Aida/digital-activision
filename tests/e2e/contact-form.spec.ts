import { expect, test, type Page } from "@playwright/test";
import { homeContent } from "../../src/content/home";

const validMessage =
  "I would like to discuss a production engineering collaboration in detail.";

async function fillValidContactForm(page: Page) {
  await expect(page.locator("#contact-submit")).toBeEnabled();
  await page.locator("#contact-name").fill(" Ada Lovelace ");
  await page.locator("#contact-email").fill("ADA@Example.COM");
  await page.locator("#contact-topic").selectOption("career-engineering");
  await page.locator("#contact-message").fill(` ${validMessage} `);
  await page.locator("#contact-privacy").check();
}

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} contact form exposes localized client validation`, async ({
    page,
  }) => {
    const content = homeContent[locale].contact;
    let requestCount = 0;

    await page.route("**/api/contact", async (route) => {
      requestCount += 1;
      await route.fulfill({ status: 500 });
    });
    await page.goto(`/${locale}#contact`);

    await page
      .getByRole("button", { name: content.submitLabel, exact: true })
      .click();

    await expect(page.locator("#contact-name-error")).toHaveText(
      content.errors.name,
    );
    await expect(page.locator("#contact-email-error")).toHaveText(
      content.errors.email,
    );
    await expect(page.locator("#contact-topic-error")).toHaveText(
      content.errors.topic,
    );
    await expect(page.locator("#contact-message-error")).toHaveText(
      content.errors.message,
    );
    await expect(page.locator("#contact-privacy-error")).toHaveText(
      content.errors.privacy,
    );
    expect(requestCount).toBe(0);
  });
}

test("contact form sends one strict JSON payload and resets after a 202 response", async ({
  page,
}) => {
  const locale = "en" as const;
  const content = homeContent[locale].contact;
  const requestId = "8ef6db83-44a7-4d65-a333-6e31fa558891";
  let capturedContentType: string | undefined;
  let capturedPayload: Record<string, unknown> | undefined;
  let requestCount = 0;
  let releaseResponse: (() => void) | undefined;
  const responseGate = new Promise<void>((resolve) => {
    releaseResponse = resolve;
  });

  await page.route("**/api/contact", async (route) => {
    requestCount += 1;
    capturedContentType = route.request().headers()["content-type"];
    capturedPayload = route.request().postDataJSON() as Record<string, unknown>;

    await responseGate;
    await route.fulfill({
      body: JSON.stringify({ ok: true, requestId }),
      contentType: "application/json",
      headers: { "x-request-id": requestId },
      status: 202,
    });
  });

  await page.goto(`/${locale}#contact`);
  await fillValidContactForm(page);

  const submitButton = page.locator("#contact-submit");
  await submitButton.evaluate((element) => {
    (element as HTMLButtonElement).click();
    (element as HTMLButtonElement).click();
  });

  await expect(submitButton).toBeDisabled();
  releaseResponse?.();
  await expect(page.getByText(content.successMessage, { exact: false })).toBeVisible();
  await expect(page.getByText(`${content.requestIdLabel}: ${requestId}`)).toBeVisible();
  expect(requestCount).toBe(1);
  expect(capturedContentType).toBe("application/json");

  const payload = capturedPayload;
  expect(payload).toBeDefined();
  if (!payload) {
    throw new Error("Expected the contact request payload to be captured.");
  }

  expect(Object.keys(payload).sort()).toEqual(
    [
      "email",
      "locale",
      "message",
      "name",
      "privacyAccepted",
      "startedAt",
      "topic",
      "website",
    ].sort(),
  );
  expect(payload).toMatchObject({
    email: "ada@example.com",
    locale,
    message: validMessage,
    name: "Ada Lovelace",
    privacyAccepted: true,
    topic: "career-engineering",
    website: "",
  });
  expect(payload.startedAt).toEqual(expect.any(Number));
  expect(payload.startedAt).toBeGreaterThan(Date.now() - 60_000);
  expect(payload.startedAt).toBeLessThanOrEqual(Date.now());

  await expect(page.locator("#contact-name")).toHaveValue("");
  await expect(page.locator("#contact-email")).toHaveValue("");
  await expect(page.locator("#contact-topic")).toHaveValue("");
  await expect(page.locator("#contact-message")).toHaveValue("");
  await expect(page.locator("#contact-privacy")).not.toBeChecked();
});

const responseCases = [
  { copyKey: "genericErrorMessage", status: 400 },
  { copyKey: "rateLimitMessage", status: 429 },
  { copyKey: "disabledMessage", status: 503 },
  { copyKey: "genericErrorMessage", status: 502 },
] as const;

for (const locale of ["hu", "en"] as const) {
  for (const { copyKey, status } of responseCases) {
    test(`${locale.toUpperCase()} contact form maps ${status} to localized safe feedback`, async ({
      page,
    }) => {
      const content = homeContent[locale].contact;

      await page.route("**/api/contact", async (route) => {
        await route.fulfill({
          body: JSON.stringify({
            code: "INTERNAL_DETAIL_MUST_NOT_RENDER",
            ok: false,
            requestId: "error-request-id",
          }),
          contentType: "application/json",
          status,
        });
      });
      await page.goto(`/${locale}#contact`);
      await fillValidContactForm(page);
      await page
        .getByRole("button", { name: content.submitLabel, exact: true })
        .click();

      await expect(page.getByText(content[copyKey], { exact: true })).toBeVisible();
      await expect(page.getByText("INTERNAL_DETAIL_MUST_NOT_RENDER")).toHaveCount(0);
      await expect(page.getByText("error-request-id")).toHaveCount(0);
    });
  }
}
