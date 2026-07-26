import { expect, test } from "@playwright/test";

const redirectContract = [
  ["/adatkezeles", "/hu/privacy"],
  ["/works/hamburger", "/projects/hamburger/index.html"],
  ["/works/boxer-hero", "/projects/boxer-hero/index.html"],
  ["/works/nati", "/projects/nati/index.html"],
  ["/works/nati/chat", "/projects/nati/chat/index.html"],
  ["/projects/hamburger", "/projects/hamburger/index.html"],
  ["/projects/boxer-hero", "/projects/boxer-hero/index.html"],
  ["/projects/nati", "/projects/nati/index.html"],
  ["/projects/nati/chat", "/projects/nati/chat/index.html"],
] as const;

for (const [source, destination] of redirectContract) {
  for (const suffix of ["", "/"] as const) {
    test(`${source}${suffix} permanently redirects to its exact legacy target`, async ({
      request,
    }) => {
      const response = await request.get(`${source}${suffix}`, {
        maxRedirects: 0,
      });

      expect(response.status()).toBe(308);
      expect(response.headers().location).toBe(destination);
    });
  }
}

for (const directUrl of [
  "/projects/hamburger/index.html",
  "/projects/boxer-hero/index.html",
  "/projects/nati/index.html",
  "/projects/nati/chat/index.html",
]) {
  test(`${directUrl} remains directly available`, async ({ request }) => {
    const response = await request.get(directUrl, { maxRedirects: 0 });

    expect(response.status()).toBe(200);
    expect(response.headers().location).toBeUndefined();
  });
}

for (const unknownUrl of [
  "/works/not-a-demo",
  "/works/nati/not-allowlisted",
  "/projects/not-a-demo",
  "/projects/nati/not-allowlisted",
]) {
  test(`${unknownUrl} remains a real 404`, async ({ request }) => {
    const response = await request.get(unknownUrl, { maxRedirects: 0 });

    expect(response.status()).toBe(404);
    expect(response.headers().location).toBeUndefined();
  });
}
