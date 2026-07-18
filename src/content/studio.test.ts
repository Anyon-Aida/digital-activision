import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { studioContent, studioContentSchema } from "./studio";

describe("Studio content", () => {
  it("keeps the same content topology in Hungarian and English", () => {
    for (const key of [
      "benefits",
      "services",
      "process",
      "packages",
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
    "marks every %s package as awaiting owner confirmation",
    (locale) => {
      const content = studioContent[locale];

      expect(content.pricingWarningTitle).toMatch(/megerősítés|confirmation/i);
      expect(content.pricingWarningBody).toMatch(/nem minősül|not a binding/i);
      expect(content.packages).toHaveLength(3);
      expect(
        content.packages.every(
          ({ status }) => status === "needs-owner-confirmation",
        ),
      ).toBe(true);
    },
  );

  it("uses only exact standalone HTML paths for legacy demos", () => {
    const expectedPaths = [
      "/projects/hamburger/index.html",
      "/projects/boxer-hero/index.html",
      "/projects/nati/index.html",
      "/projects/nati/chat/index.html",
    ];

    for (const locale of ["hu", "en"] as const) {
      const paths = studioContent[locale].experiments.flatMap(({ links }) =>
        links.map(({ href }) => href),
      );

      expect(paths).toEqual(expectedPaths);
      expect(paths.some((path) => path.startsWith("/works/"))).toBe(false);
      expect(
        paths.every((path) =>
          existsSync(join(process.cwd(), "public", path.replace(/^\//, ""))),
        ),
      ).toBe(true);
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
      expect(contact.description).toMatch(/e-mailben|by email/i);
      expect(contact.description).toMatch(/nincs|no /i);
    },
  );
});
