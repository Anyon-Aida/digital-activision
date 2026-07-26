import { describe, expect, it } from "vitest";

import {
  caseStudies,
  caseStudyBySlug,
  caseStudyRegistrySchema,
  caseStudySectionIds,
  caseStudySectionStates,
  caseStudySlugs,
  getCaseStudyCards,
  getFeaturedCaseStudies,
  getCaseStudySections,
  homepageCaseStudyOrder,
  workCaseStudyOrder,
  type LocalizedText,
} from ".";

const expectLocalizedText = (value: LocalizedText) => {
  expect(value.hu.trim()).not.toHaveLength(0);
  expect(value.en.trim()).not.toHaveLength(0);
};

describe("case-study registry", () => {
  it("validates all four required case studies at module load", () => {
    expect(caseStudies).toHaveLength(4);
    expect(caseStudyRegistrySchema.safeParse(caseStudies).success).toBe(true);
    expect(caseStudies.map(({ slug }) => slug).sort()).toEqual(
      [...caseStudySlugs].sort(),
    );
  });

  it("uses the canonical 16-section structure in the required order", () => {
    expect(caseStudySectionIds).toEqual([
      "summary",
      "context",
      "ownership",
      "constraints",
      "architecture",
      "data-flow",
      "frontend",
      "backend-api",
      "security",
      "performance-reliability",
      "testing",
      "deployment-monitoring",
      "impact",
      "tradeoffs",
      "improvements",
      "related",
    ]);

    caseStudies.forEach((study) => {
      expect(study.sections.map(({ id }) => id)).toEqual(caseStudySectionIds);
      expect(study.sections).toHaveLength(16);
      study.sections.forEach(({ state }) => {
        expect(caseStudySectionStates).toContain(state);
      });
    });
  });

  it("keeps every content-bearing field bilingual", () => {
    caseStudies.forEach((study) => {
      expectLocalizedText(study.title);
      expectLocalizedText(study.summary);
      expectLocalizedText(study.role);
      expectLocalizedText(study.seo.title);
      expectLocalizedText(study.seo.description);
      if (study.period) expectLocalizedText(study.period);

      study.responsibilities.forEach(expectLocalizedText);
      study.sections.forEach(({ content }) =>
        content.forEach(expectLocalizedText),
      );
      study.disclosures.forEach(({ text }) => expectLocalizedText(text));
      study.evidence.forEach(({ label }) => expectLocalizedText(label));
      study.results.forEach(({ claim, metric }) => {
        expectLocalizedText(claim);
        if (metric) expectLocalizedText(metric.attribution);
      });
      study.media.forEach(({ alt }) => expectLocalizedText(alt));
      study.links.forEach(({ label }) => expectLocalizedText(label));
    });

    const huSections = getCaseStudySections(caseStudySlugs[0], "hu");
    const enSections = getCaseStudySections(caseStudySlugs[0], "en");
    expect(huSections.map(({ id }) => id)).toEqual(
      enSections.map(({ id }) => id),
    );
  });

  it("keeps homepage and work-index ordering explicit and independent", () => {
    expect(homepageCaseStudyOrder).toEqual([
      "samsung-smart-gate-analytics",
      "adott-enterprise-project-workflow",
      "alba-medence-3d-configurator",
      "questlog-offline-first-pwa",
    ]);
    expect(workCaseStudyOrder).toEqual([
      "adott-enterprise-project-workflow",
      "samsung-smart-gate-analytics",
      "alba-medence-3d-configurator",
      "questlog-offline-first-pwa",
    ]);
    expect(getCaseStudyCards("hu", homepageCaseStudyOrder).map(({ slug }) => slug)).toEqual(
      homepageCaseStudyOrder,
    );
    expect(getFeaturedCaseStudies("en").map(({ slug }) => slug)).toEqual(
      homepageCaseStudyOrder,
    );
    expect(getFeaturedCaseStudies("hu")[0]).toMatchObject({
      href: "/hu/work/samsung-smart-gate-analytics",
      statusLabel: "Privát esettanulmány",
      visibilityLabel: "Anonimizált",
    });
  });

  it("resolves every related project and every evidence reference", () => {
    const registeredSlugs = new Set(caseStudies.map(({ slug }) => slug));

    caseStudies.forEach((study) => {
      const evidenceById = new Map(study.evidence.map((item) => [item.id, item]));

      study.relatedSlugs.forEach((slug) => {
        expect(registeredSlugs.has(slug)).toBe(true);
        expect(slug).not.toBe(study.slug);
      });

      study.sections.forEach((section) => {
        section.evidenceIds.forEach((id) => {
          const evidence = evidenceById.get(id);
          expect(evidence).toBeDefined();
          expect(evidence?.sectionIds).toContain(section.id);
        });
      });
    });
  });

  it("keeps private enterprise studies anonymized and conceptual", () => {
    const privateStudies = [
      caseStudyBySlug["samsung-smart-gate-analytics"],
      caseStudyBySlug["adott-enterprise-project-workflow"],
    ];

    privateStudies.forEach((study) => {
      expect(study.status).toBe("private-case-study");
      expect(study.visibility).toBe("anonymized");
      expect(study.architecture.state).toBe("conceptual");
      expect(study.links).toEqual([]);
      expect(study.media).toEqual([]);
      expect(study.disclosures.map(({ kind }) => kind)).toEqual(
        expect.arrayContaining([
          "anonymization",
          "confidentiality",
          "conceptual-diagram",
        ]),
      );
    });
  });

  it("attributes Samsung's only numeric claim as a shared system outcome", () => {
    const samsung = caseStudyBySlug["samsung-smart-gate-analytics"];
    const metrics = samsung.results.flatMap(({ metric }) =>
      metric ? [metric] : [],
    );

    expect(metrics).toHaveLength(1);
    expect(metrics[0]).toMatchObject({
      value: 20,
      unit: "percent",
      direction: "improvement",
    });
    expect(metrics[0].attribution.hu).toMatch(/nem kizárólagos egyéni/i);
    expect(metrics[0].attribution.en).toMatch(/not an exclusively individual/i);
  });

  it("limits Alba to public repository, screenshot, and reference evidence", () => {
    const alba = caseStudyBySlug["alba-medence-3d-configurator"];

    expect(alba.status).not.toBe("production");
    expect(alba.links).toEqual([
      expect.objectContaining({
        kind: "reference",
        verification: "not-yet-verified",
      }),
    ]);
    expect(alba.evidence.map(({ kind }) => kind).sort()).toEqual([
      "public-link",
      "public-repository",
      "public-screenshot",
    ]);
    expect(alba.technologies.every(({ state }) => state === "not-yet-verified")).toBe(
      true,
    );
    expect(alba.results.every(({ state }) => state === "not-yet-verified")).toBe(
      true,
    );
  });

  it("keeps QuestLog visibly in progress and separates plans from implementation", () => {
    const questlog = caseStudyBySlug["questlog-offline-first-pwa"];

    expect(questlog.status).toBe("in-progress");
    expect(questlog.links).toEqual([]);
    expect(questlog.architecture.state).toBe("planned");
    expect(questlog.technologies.every(({ state }) => state === "planned")).toBe(
      true,
    );
    expect(
      questlog.sections
        .filter(({ id }) => id === "backend-api" || id === "deployment-monitoring")
        .every(({ state }) => state === "planned"),
    ).toBe(true);
  });
});

describe("case-study fail-closed validation", () => {
  it("rejects duplicate slugs", () => {
    const invalid = structuredClone(caseStudies);
    invalid[1].slug = invalid[0].slug;

    expect(caseStudyRegistrySchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects a missing locale", () => {
    const invalid = structuredClone(caseStudies);
    delete (invalid[0].summary as unknown as Record<string, string>).en;

    expect(caseStudyRegistrySchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects missing, reordered, or malformed required sections", () => {
    const missing = structuredClone(caseStudies);
    missing[0].sections.pop();

    const reordered = structuredClone(caseStudies);
    [reordered[0].sections[0], reordered[0].sections[1]] = [
      reordered[0].sections[1],
      reordered[0].sections[0],
    ];

    expect(caseStudyRegistrySchema.safeParse(missing).success).toBe(false);
    expect(caseStudyRegistrySchema.safeParse(reordered).success).toBe(false);
  });

  it("rejects unknown or out-of-scope evidence references", () => {
    const missingEvidence = structuredClone(caseStudies);
    missingEvidence[0].sections[0].evidenceIds = ["missing-evidence"];

    const wrongScope = structuredClone(caseStudies);
    wrongScope[0].evidence[0].sectionIds = ["context"];

    expect(caseStudyRegistrySchema.safeParse(missingEvidence).success).toBe(false);
    expect(caseStudyRegistrySchema.safeParse(wrongScope).success).toBe(false);
  });

  it("rejects an invalid self-referencing relationship", () => {
    const invalid = structuredClone(caseStudies);
    invalid[0].relatedSlugs = [invalid[0].slug];

    expect(caseStudyRegistrySchema.safeParse(invalid).success).toBe(false);
  });

  it("rejects unsafe anonymized content", () => {
    const invalid = structuredClone(caseStudies);
    invalid[0].architecture.state = "planned";
    invalid[0].links.push({
      kind: "live",
      href: "https://example.com/internal",
      label: { hu: "Belső link", en: "Internal link" },
      verification: "verified",
    });

    expect(caseStudyRegistrySchema.safeParse(invalid).success).toBe(false);
  });
});
