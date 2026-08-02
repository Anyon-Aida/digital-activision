import { describe, expect, it } from "vitest";
import { privacyContent } from "./privacy";

describe("privacy content parity", () => {
  it("keeps the same section topology in Hungarian and English", () => {
    expect(privacyContent.en.sections.map(({ id }) => id)).toEqual(
      privacyContent.hu.sections.map(({ id }) => id),
    );
    expect(privacyContent.en.sources).toHaveLength(privacyContent.hu.sources.length);
  });

  it.each(["hu", "en"] as const)(
    "contains the legal-review warning and controller contact in %s",
    (locale) => {
      const content = privacyContent[locale];

      expect(content.reviewTitle).toMatch(/jogi|legal/i);
      expect(`${content.reviewTitle} ${content.reviewBody}`).toMatch(/Production/i);
      expect(content.sections[0].paragraphs.join(" ")).toContain(
        "digitalactivision@gmail.com",
      );
    },
  );

  it.each(["hu", "en"] as const)(
    "documents the first-party contact path and conditional protection in %s",
    (locale) => {
      const content = privacyContent[locale];
      const notice = content.sections
        .flatMap(({ paragraphs }) => paragraphs)
        .join(" ");

      expect(notice).toContain("/api/contact");
      expect(notice).toMatch(/SMTP/i);
      expect(notice).toMatch(/HMAC/i);
      expect(notice).toMatch(/Turnstile/i);
      expect(notice).toMatch(/rate limit/i);
      expect(notice).toMatch(/consent|hozzájárul/i);
    },
  );

  it.each(["hu", "en"] as const)(
    "does not retain obsolete Formspree, map, or newsletter claims in %s",
    (locale) => {
      const serialized = JSON.stringify(privacyContent[locale]);

      expect(serialized).not.toMatch(/Formspree|OpenStreetMap|newsletter|hírlevél/i);
      expect(privacyContent[locale].sources.map(({ href }) => href)).toEqual(
        expect.arrayContaining([
          "https://vercel.com/legal/privacy-notice",
          "https://www.cloudflare.com/privacypolicy/",
        ]),
      );
    },
  );
});
