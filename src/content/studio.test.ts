import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { studioContent, studioContentSchema } from "./studio";

describe("Studio content", () => {
  it("keeps the same content topology in Hungarian and English", () => {
    for (const key of [
      "services",
      "featuredWork",
      "process",
      "experiments",
    ] as const) {
      expect(studioContent.en[key].map(({ id }) => id)).toEqual(
        studioContent.hu[key].map(({ id }) => id),
      );
    }
  });

  it("fails closed when localized collection topology diverges", () => {
    const invalid = structuredClone(studioContent);
    invalid.en.services = invalid.en.services.slice(1);

    expect(() => studioContentSchema.parse(invalid)).toThrow(/topology/i);
  });

  it.each(["hu", "en"] as const)(
    "uses the compact V3 Studio structure in %s",
    (locale) => {
      const content = studioContent[locale];

      expect(content.services).toHaveLength(4);
      expect(content.featuredWork.map(({ id }) => id)).toEqual([
        "sanjiwani",
        "alba",
      ]);
      expect(content.experiments).toHaveLength(3);
      expect(content.process).toHaveLength(4);
      expect(content.scope.description).toMatch(
        /scope, ütemezés és ár|scope, timing and price/i,
      );
      expect("packages" in content).toBe(false);
      expect("pricingWarningTitle" in content).toBe(false);
    },
  );

  it("uses exact standalone HTML paths and existing images for legacy demos", () => {
    const expectedPaths = [
      "/projects/hamburger/index.html",
      "/projects/boxer-hero/index.html",
      "/projects/nati/index.html",
    ];

    for (const locale of ["hu", "en"] as const) {
      const paths = studioContent[locale].experiments.map(({ href }) => href);

      expect(paths).toEqual(expectedPaths);
      expect(paths.some((path) => path.startsWith("/works/"))).toBe(false);
      expect(
        paths.every((path) =>
          existsSync(join(process.cwd(), "public", path.replace(/^\//, ""))),
        ),
      ).toBe(true);
      expect(
        studioContent[locale].experiments.every(({ image }) =>
          existsSync(
            join(process.cwd(), "public", image.replace(/^\//, "")),
          ),
        ),
      ).toBe(true);
    }
  });

  it("uses only real V3 visual-work assets", () => {
    for (const locale of ["hu", "en"] as const) {
      for (const work of studioContent[locale].featuredWork) {
        expect(
          existsSync(
            join(process.cwd(), "public", work.image.replace(/^\//, "")),
          ),
        ).toBe(true);
        expect(work.imageWidth).toBeGreaterThan(0);
        expect(work.imageHeight).toBeGreaterThan(0);
      }
    }
  });

  it("does not restore audited misleading agency claims", () => {
    const serialized = JSON.stringify(studioContent);

    for (const prohibited of [
      /határidő.?garancia/i,
      /on-time guarantee/i,
      /csapatunk/i,
      /our team/i,
      /\bCEO\b/i,
      /iroda fejlesztés alatt/i,
      /office under development/i,
      /1 munkanapon belül/i,
      /within 1 business day/i,
      /hírlevél/i,
      /newsletter/i,
    ]) {
      expect(serialized).not.toMatch(prohibited);
    }
  });

  it.each(["hu", "en"] as const)(
    "provides an honest mail-only contact route in %s",
    (locale) => {
      const { contact } = studioContent[locale];

      expect(contact.href).toMatch(/^mailto:digitalactivision@gmail\.com/);
      expect(contact.description).toMatch(/e-mailben|email/i);
      expect(contact.privacyNote).toMatch(/kizárólag|only/i);
    },
  );
});
