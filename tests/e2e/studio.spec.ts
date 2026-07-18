import { expect, test } from "@playwright/test";

for (const locale of ["hu", "en"] as const) {
  test(`${locale.toUpperCase()} Studio route preserves the audited agency content safely`, async ({
    page,
  }) => {
    const response = await page.goto(`/${locale}/studio`);

    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    for (const id of [
      "benefits",
      "services",
      "experiments",
      "process",
      "pricing",
      "contact",
    ]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
    await expect(page.locator("[data-status='needs-owner-confirmation']")).toHaveCount(3);
    await expect(page.locator("[data-preview-only-price]")).toHaveCount(3);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical!).pathname).toBe(`/${locale}/studio`);
  });
}

test("unconfirmed package pricing remains off the developer homepage", async ({
  page,
}) => {
  await page.goto("/en");

  await expect(page.locator("#pricing")).toHaveCount(0);
  await expect(page.getByText("490 000", { exact: false })).toHaveCount(0);
  await expect(page.locator('#studio a[href="/en/studio"]')).toBeVisible();
});

for (const [legacyHash, studioHash] of [
  ["features", "benefits"],
  ["services", "services"],
  ["works", "experiments"],
  ["process", "process"],
  ["pricing", "pricing"],
] as const) {
  test(`legacy #${legacyHash} anchor moves to Studio #${studioHash}`, async ({
    page,
  }) => {
    await page.goto(`/en#${legacyHash}`);

    await expect(page).toHaveURL(new RegExp(`/en/studio#${studioHash}$`));
    await expect(page.locator(`#${studioHash}`)).toBeVisible();
  });
}

const legacyExperiments = [
  {
    path: "/projects/hamburger/index.html",
    banner: "UI concept — no real orders",
  },
  {
    path: "/projects/boxer-hero/index.html",
    banner: "Visual concept — static interface, no real sign-up or services",
  },
  {
    path: "/projects/nati/index.html",
    banner: "Simulated support UI prototype — not AI, not live support",
  },
  {
    path: "/projects/nati/chat/index.html",
    banner: "Simulated support UI prototype — not AI, not live support",
  },
] as const;

for (const experiment of legacyExperiments) {
  test(`${experiment.path} is explicitly classified and noindexed`, async ({
    page,
  }) => {
    const response = await page.goto(experiment.path);

    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    await expect(page.getByRole("note")).toHaveText(experiment.banner);
    await expect(page.locator('a[href="#"], a[href=""]')).toHaveCount(0);
  });
}

test("Nati prototype cannot submit data or reach the removed server", async ({
  page,
  request,
}) => {
  const chatRequests: string[] = [];
  page.on("request", (networkRequest) => {
    if (networkRequest.url().includes("/api/chat")) {
      chatRequests.push(networkRequest.url());
    }
  });

  await page.goto("/projects/nati/chat/index.html");
  await expect(page.locator("textarea")).toBeDisabled();
  await expect(page.getByRole("button", { name: /Sending disabled/i })).toBeDisabled();
  expect(chatRequests).toEqual([]);

  const removedServer = await request.get("/projects/nati/server.js");
  expect(removedServer.status()).toBe(404);
});
