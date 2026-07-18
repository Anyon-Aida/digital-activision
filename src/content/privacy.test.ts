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
});
