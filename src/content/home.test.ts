import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { homeContent } from "./home";

describe("portfolio V3 homepage content", () => {
  it("keeps the HU and EN information architecture aligned", () => {
    expect(homeContent.hu.chrome.navigation.map(({ href }) => href)).toEqual(
      homeContent.en.chrome.navigation.map(({ href }) => href),
    );
    expect(homeContent.hu.chrome.navigation.map(({ href }) => href)).toEqual([
      "/work",
      "#experience",
      "/lab",
      "/studio",
      "#contact",
    ]);

    expect(
      homeContent.hu.selectedWork.projects.map(({ slug }) => slug),
    ).toEqual(
      homeContent.en.selectedWork.projects.map(({ slug }) => slug),
    );
  });

  it("features the three specified visual projects in order", () => {
    expect(
      homeContent.hu.selectedWork.projects.map(({ slug }) => slug),
    ).toEqual([
      "adott-enterprise-project-workflow",
      "alba-medence-3d-configurator",
      "sanjiwani-booking-experience",
    ]);
  });

  it("provides real locale-specific CV downloads", () => {
    for (const locale of ["hu", "en"] as const) {
      const { chrome } = homeContent[locale];
      expect(chrome.cvHref).toMatch(
        new RegExp(`kovacs-zalan-cv-${locale}\\.pdf$`),
      );
      expect(
        existsSync(
          join(process.cwd(), "public", chrome.cvHref.replace(/^\//, "")),
        ),
      ).toBe(true);
    }
  });

  it("keeps the concise V3 profile structure", () => {
    for (const locale of ["hu", "en"] as const) {
      expect(homeContent[locale].profile.experience).toHaveLength(4);
      expect(homeContent[locale].profile.capabilities).toHaveLength(4);
      expect(homeContent[locale].hero.proofPoints).toHaveLength(3);
      expect(homeContent[locale].labTeaser.flows).toHaveLength(3);
      for (const flow of homeContent[locale].labTeaser.flows) {
        expect(flow.nodes).toHaveLength(4);
      }
    }
  });

  it("does not expose V2 audit or unavailable-copy language", () => {
    const serialized = JSON.stringify(homeContent).toLocaleLowerCase();

    for (const forbidden of [
      "repository proves",
      "amit ez a repository",
      "verified evidence",
      "nyilvános forráskészletben nem dokumentált",
      "not documented in the public source set",
      "next gate",
      "következő gate",
    ]) {
      expect(serialized).not.toContain(forbidden);
    }
  });
});
