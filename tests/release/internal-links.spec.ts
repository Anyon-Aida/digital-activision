import { expect, test } from "@playwright/test";

const getPathname = (absoluteUrl: string) => {
  const url = new URL(absoluteUrl);
  return `${url.pathname}${url.search}`;
};

test("canonical portfolio pages have no broken same-origin links", async ({
  baseURL,
  page,
  request,
}) => {
  expect(baseURL).toBeTruthy();

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);

  const sitemap = await sitemapResponse.text();
  const sourceRoutes = new Set([
    "/hu",
    "/en",
    ...[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gu)].map(([, location]) =>
      getPathname(location),
    ),
  ]);
  const internalTargets = new Set<string>();
  const fragmentTargets = new Set<string>();

  for (const sourceRoute of sourceRoutes) {
    const response = await page.goto(sourceRoute, {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status(), sourceRoute).toBeLessThan(400);

    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((anchors) =>
        anchors.map((anchor) => anchor.getAttribute("href")).filter(Boolean),
      );

    for (const href of hrefs) {
      const target = new URL(href!, page.url());
      if (
        target.origin !== new URL(page.url()).origin ||
        !["http:", "https:"].includes(target.protocol) ||
        target.pathname.startsWith("/_next/")
      ) {
        continue;
      }

      const pathname = `${target.pathname}${target.search}`;
      internalTargets.add(pathname);
      if (target.hash) {
        fragmentTargets.add(`${pathname}${target.hash}`);
      }
    }
  }

  const brokenTargets: Array<{ pathname: string; status: number }> = [];
  for (const pathname of [...internalTargets].sort()) {
    const response = await request.get(pathname, { maxRedirects: 5 });
    if (response.status() >= 400) {
      brokenTargets.push({ pathname, status: response.status() });
    }
  }

  expect(brokenTargets).toEqual([]);

  const missingFragments: string[] = [];
  for (const target of [...fragmentTargets].sort()) {
    const url = new URL(target, baseURL);
    await page.goto(`${url.pathname}${url.search}`, {
      waitUntil: "domcontentloaded",
    });
    const fragmentId = decodeURIComponent(url.hash.slice(1));
    const fragmentExists = await page.evaluate(
      (id) => Boolean(document.getElementById(id)),
      fragmentId,
    );

    if (!fragmentExists) {
      missingFragments.push(target);
    }
  }

  expect(missingFragments).toEqual([]);
});
