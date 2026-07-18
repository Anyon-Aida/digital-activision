import { expect, test } from "@playwright/test";

const requestIdPattern = /^[A-Za-z0-9-]{1,64}$/u;

test("health endpoint exposes only safe, uncached build metadata", async ({
  request,
}) => {
  const response = await request.get("/api/health");

  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toContain("no-store");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-request-id"]).toMatch(requestIdPattern);

  const payload = (await response.json()) as Record<string, unknown>;
  expect(Object.keys(payload).sort()).toEqual([
    "buildTime",
    "status",
    "version",
  ]);
  expect(payload.status).toBe("ok");
  expect(payload.version).toMatch(/^(?:unknown|[a-f0-9]{7})$/u);
  expect(
    payload.buildTime === null ||
      (typeof payload.buildTime === "string" &&
        new Date(payload.buildTime).toISOString() === payload.buildTime),
  ).toBe(true);
});

test("contact endpoint fails closed when delivery is not configured", async ({
  request,
}) => {
  const response = await request.post("/api/contact", {
    data: {
      email: "ada@example.com",
      locale: "en",
      message: "This request must not reach an email provider in local QA.",
      name: "Ada Lovelace",
      privacyAccepted: true,
      startedAt: Date.now() - 5_000,
      topic: "career-engineering",
      website: "",
    },
  });

  expect(response.status()).toBe(503);
  expect(response.headers()["cache-control"]).toContain("no-store");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
  expect(response.headers()["x-request-id"]).toMatch(requestIdPattern);

  const payload = (await response.json()) as Record<string, unknown>;
  expect(Object.keys(payload).sort()).toEqual(["code", "ok", "requestId"]);
  expect(payload).toMatchObject({ code: "CONTACT_DISABLED", ok: false });
  expect(payload.requestId).toMatch(requestIdPattern);
});
