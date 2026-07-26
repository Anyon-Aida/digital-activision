import { describe, expect, it } from "vitest";
import { caseStudySlugs, getCaseStudyPath } from "./case-studies";
import { homeContent } from "./home";

describe("developer homepage content", () => {
  it("keeps the HU and EN information architecture aligned", () => {
    expect(homeContent.hu.chrome.navigation.map(({ href }) => href)).toEqual(
      homeContent.en.chrome.navigation.map(({ href }) => href),
    );
    expect(homeContent.hu.systemMap.nodes.map(({ id }) => id)).toEqual(
      homeContent.en.systemMap.nodes.map(({ id }) => id),
    );
    expect(homeContent.hu.standards.items.map(({ state }) => state)).toEqual(
      homeContent.en.standards.items.map(({ state }) => state),
    );
  });

  it("keeps the unavailable CV state explicit in both locales", () => {
    expect(homeContent.hu.hero.cvUnavailable).toMatch(/nem érhető el/i);
    expect(homeContent.en.hero.cvUnavailable).toMatch(/not yet available/i);
  });

  it("provides a localized case-study action", () => {
    for (const locale of ["hu", "en"] as const) {
      expect(homeContent[locale].featuredWork.actionLabel).toBeTruthy();
    }
  });

  it("links every capability group to a localized case study", () => {
    for (const locale of ["hu", "en"] as const) {
      const evidenceSlugs = homeContent[locale].capabilities.groups.map(
        ({ evidenceSlug }) => evidenceSlug,
      );

      expect(evidenceSlugs).toEqual(
        expect.arrayContaining([...caseStudySlugs]),
      );
      expect(
        evidenceSlugs.map((slug) => getCaseStudyPath(slug, locale)),
      ).toEqual(
        evidenceSlugs.map((slug) => `/${locale}/work/${slug}`),
      );
    }
  });

  it("describes the migrated Studio route in the present tense", () => {
    expect(homeContent.hu.studio.migrationNote).toMatch(/már elérhető/i);
    expect(homeContent.en.studio.migrationNote).toMatch(/now available/i);
  });
});
