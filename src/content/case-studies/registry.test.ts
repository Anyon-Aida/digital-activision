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
  it("validates all five required case studies at module load", () => {
    expect(caseStudies).toHaveLength(5);
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
      expectLocalizedText(study.presentation.homepageSummary);
      expectLocalizedText(study.presentation.roleSummary);
      study.presentation.storySections.forEach((storySection) => {
        expectLocalizedText(storySection.title);
        storySection.paragraphs.forEach(expectLocalizedText);
      });
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

  it("provides a concise V3 presentation layer for every rich case study", () => {
    caseStudies.forEach((study) => {
      expect(study.presentation.storySections.length).toBeGreaterThanOrEqual(5);
      expect(study.presentation.storySections.length).toBeLessThanOrEqual(7);
      expect(
        new Set(study.presentation.storySections.map(({ id }) => id)).size,
      ).toBe(study.presentation.storySections.length);
      expect(new Set(study.presentation.featuredMedia).size).toBe(
        study.presentation.featuredMedia.length,
      );
    });

    expect(
      caseStudyBySlug["samsung-smart-gate-analytics"].presentation.featuredMedia,
    ).toEqual(["samsung-gate-flow"]);
    expect(
      caseStudyBySlug["questlog-offline-first-pwa"].presentation.featuredMedia,
    ).toEqual([]);
  });

  it("keeps the public V3 presentation free of audit-copy language", () => {
    const forbidden =
      /repository|verified evidence|owner-provided|not disclosed|not documented|not yet verified|public source set|nyilvános forrás|nem dokumentált|következő gate|next gate/i;

    for (const study of caseStudies) {
      for (const locale of ["hu", "en"] as const) {
        const publicCopy = [
          study.title[locale],
          study.presentation.homepageSummary[locale],
          study.presentation.roleSummary[locale],
          study.seo.title[locale],
          study.seo.description[locale],
          ...study.presentation.storySections.flatMap((section) => [
            section.title[locale],
            ...section.paragraphs.map((paragraph) => paragraph[locale]),
          ]),
        ].join(" ");

        expect(publicCopy).not.toMatch(forbidden);
      }
    }
  });

  it("keeps homepage and work-index ordering explicit and independent", () => {
    expect(homepageCaseStudyOrder).toEqual([
      "adott-enterprise-project-workflow",
      "alba-medence-3d-configurator",
      "sanjiwani-booking-experience",
    ]);
    expect(workCaseStudyOrder).toEqual([
      "adott-enterprise-project-workflow",
      "alba-medence-3d-configurator",
      "samsung-smart-gate-analytics",
      "sanjiwani-booking-experience",
      "questlog-offline-first-pwa",
    ]);
    expect(getCaseStudyCards("hu", homepageCaseStudyOrder).map(({ slug }) => slug)).toEqual(
      homepageCaseStudyOrder,
    );
    expect(getFeaturedCaseStudies("en").map(({ slug }) => slug)).toEqual(
      homepageCaseStudyOrder,
    );
    expect(getFeaturedCaseStudies("hu")[0]).toMatchObject({
      href: "/hu/work/adott-enterprise-project-workflow",
      statusLabel: "Privát esettanulmány",
      visibilityLabel: "Anonimizált",
      featuredMedia: [
        "adott-quote-structure",
        "adott-inquiry-roles",
        "adott-company-detail",
      ],
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

  it("presents Alba with real responsive configurator media and no fake metric", () => {
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
    expect(alba.technologies.every(({ state }) => state === "documented")).toBe(
      true,
    );
    expect(alba.results.every(({ state }) => state === "not-yet-verified")).toBe(
      true,
    );
    expect(alba.results.every(({ metric }) => metric === undefined)).toBe(true);
    expect(alba.presentation.featuredMedia).toEqual([
      "alba-configurator-desktop",
      "alba-configurator-mobile",
      "alba-website-3d-entry",
    ]);
  });

  it("registers Sanjiwani as a complete public booking case study", () => {
    const sanjiwani =
      caseStudyBySlug["sanjiwani-booking-experience"];

    expect(sanjiwani).toMatchObject({
      status: "demo",
      visibility: "public",
      presentation: {
        heroVariant: "booking",
        featuredMedia: [
          "sanjiwani-booking-flow-desktop",
          "sanjiwani-services-desktop",
          "sanjiwani-home-desktop",
        ],
      },
    });
    expect(sanjiwani.presentation.storySections).toHaveLength(5);
    expect(sanjiwani.results.every(({ metric }) => metric === undefined)).toBe(
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

  it("rejects a missing or oversized V3 presentation", () => {
    const missing = structuredClone(caseStudies);
    delete (
      missing[0] as unknown as {
        presentation?: unknown;
      }
    ).presentation;

    const oversized = structuredClone(caseStudies);
    oversized[0].presentation.storySections.push(
      structuredClone(oversized[0].presentation.storySections[0]),
      structuredClone(oversized[0].presentation.storySections[1]),
      structuredClone(oversized[0].presentation.storySections[2]),
    );

    expect(caseStudyRegistrySchema.safeParse(missing).success).toBe(false);
    expect(caseStudyRegistrySchema.safeParse(oversized).success).toBe(false);
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
