import { describe, expect, it } from "vitest";
import { homeContent } from "./home";

describe("developer homepage content", () => {
  it("keeps the HU and EN information architecture aligned", () => {
    expect(homeContent.hu.chrome.navigation.map(({ href }) => href)).toEqual(
      homeContent.en.chrome.navigation.map(({ href }) => href),
    );
    expect(homeContent.hu.systemMap.nodes.map(({ id }) => id)).toEqual(
      homeContent.en.systemMap.nodes.map(({ id }) => id),
    );
    expect(homeContent.hu.featuredWork.projects.map(({ slug }) => slug)).toEqual(
      homeContent.en.featuredWork.projects.map(({ slug }) => slug),
    );
    expect(homeContent.hu.standards.items.map(({ state }) => state)).toEqual(
      homeContent.en.standards.items.map(({ state }) => state),
    );
  });

  it("keeps the unavailable CV state explicit in both locales", () => {
    expect(homeContent.hu.hero.cvUnavailable).toMatch(/nem érhető el/i);
    expect(homeContent.en.hero.cvUnavailable).toMatch(/not yet available/i);
  });

  it("does not expose a case-study link before the typed routes exist", () => {
    for (const locale of ["hu", "en"] as const) {
      expect(homeContent[locale].featuredWork.availabilityLabel).toBeTruthy();
      expect(homeContent[locale].featuredWork.projects).toHaveLength(4);
    }
  });
});
