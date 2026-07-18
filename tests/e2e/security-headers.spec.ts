import { expect, test } from "@playwright/test";

test("pages expose the global browser security policy", async ({ request }) => {
  const response = await request.get("/en");
  const headers = response.headers();

  expect(response.status()).toBe(200);
  expect(headers["content-security-policy"]).toContain("default-src 'self'");
  expect(headers["content-security-policy"]).toContain(
    "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
  );
  expect(headers["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
  expect(headers["x-content-type-options"]).toBe("nosniff");
  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["permissions-policy"]).toContain("camera=()");
  expect(headers["strict-transport-security"]).toBeUndefined();
});

test("legacy experiments retain noindex on top of global protections", async ({
  request,
}) => {
  const response = await request.get("/projects/boxer-hero/index.html");
  const headers = response.headers();

  expect(response.status()).toBe(200);
  expect(headers["x-robots-tag"]).toContain("noindex");
  expect(headers["content-security-policy"]).toContain(
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  );
  expect(headers["x-content-type-options"]).toBe("nosniff");
});
