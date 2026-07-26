import { describe, expect, it } from "vitest";

import { createHealthHandler, getHealthPayload } from "./health";

describe("health endpoint", () => {
  it("exposes only allowlisted, validated build metadata", () => {
    const payload = getHealthPayload({
      VERCEL_GIT_COMMIT_SHA: "ABCDEF1234567890",
      BUILD_TIME: "2026-07-18T12:00:00.000Z",
      SMTP_PASS: "must-not-leak",
      CONTACT_TO: "private@example.com",
      INTERNAL_SERVICE_URL: "https://internal.example",
    });

    expect(payload).toEqual({
      status: "ok",
      version: "abcdef1",
      buildTime: "2026-07-18T12:00:00.000Z",
    });
    const serialized = JSON.stringify(payload);
    expect(serialized).not.toContain("must-not-leak");
    expect(serialized).not.toContain("private@example.com");
    expect(serialized).not.toContain("internal.example");
  });

  it("uses safe placeholders for malformed or unavailable metadata", () => {
    expect(
      getHealthPayload({
        VERCEL_GIT_COMMIT_SHA: "not a commit",
        BUILD_TIME: "not a timestamp",
      }),
    ).toEqual({ status: "ok", version: "unknown", buildTime: null });
  });

  it("returns an uncached liveness response without probing email", async () => {
    const handler = createHealthHandler(
      { VERCEL_GIT_COMMIT_SHA: "1234567890abcdef" },
      () => "health-request-id",
    );
    const response = await handler();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store, max-age=0");
    expect(response.headers.get("x-request-id")).toBe("health-request-id");
    await expect(response.json()).resolves.toEqual({
      status: "ok",
      version: "1234567",
      buildTime: null,
    });
  });
});
