import { z } from "zod";
import {
  caseStudySlugs,
  type CaseStudySlug,
} from "@/lib/case-study-routes";
import {
  projectMediaIds,
  type ProjectMediaId,
} from "@/content/project-media";

export const caseStudySectionIds = [
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
] as const;

export const caseStudySectionStates = [
  "documented",
  "not-applicable",
  "not-disclosed",
  "planned",
  "not-yet-verified",
] as const;

export const locales = ["hu", "en"] as const;

export type CaseStudyLocale = (typeof locales)[number];
export type CaseStudySectionId = (typeof caseStudySectionIds)[number];
export type CaseStudySectionState = (typeof caseStudySectionStates)[number];
export { caseStudySlugs };
export type { CaseStudySlug };

const nonEmptyTextSchema = z.string().trim().min(1);

export const localizedTextSchema = z
  .object({
    hu: nonEmptyTextSchema,
    en: nonEmptyTextSchema,
  })
  .strict();

export type LocalizedText = z.infer<typeof localizedTextSchema>;

const sectionIdSchema = z.enum(caseStudySectionIds);
const sectionStateSchema = z.enum(caseStudySectionStates);
const caseStudySlugSchema = z.enum(caseStudySlugs);
const projectMediaIdSchema = z.enum(projectMediaIds);

export const caseStudyHeroVariants = [
  "workflow",
  "3d",
  "booking",
  "data",
] as const;

const storySectionSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: localizedTextSchema,
    paragraphs: z.array(localizedTextSchema).min(1),
    mediaIds: z.array(projectMediaIdSchema),
  })
  .strict();

const presentationSchema = z
  .object({
    featuredMedia: z.array(projectMediaIdSchema),
    heroVariant: z.enum(caseStudyHeroVariants),
    storySections: z
      .array(storySectionSchema)
      .min(5)
      .max(7)
      .superRefine((sections, context) => {
        const ids = sections.map(({ id }) => id);
        if (new Set(ids).size !== ids.length) {
          context.addIssue({
            code: "custom",
            path: [],
            message: "Presentation story-section ids must be unique.",
          });
        }
      }),
    homepageSummary: localizedTextSchema,
    roleSummary: localizedTextSchema,
  })
  .strict()
  .superRefine((presentation, context) => {
    if (
      new Set(presentation.featuredMedia).size !==
      presentation.featuredMedia.length
    ) {
      context.addIssue({
        code: "custom",
        path: ["featuredMedia"],
        message: "Featured media ids must be unique.",
      });
    }
  });

const disclosureSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    kind: z.enum([
      "anonymization",
      "confidentiality",
      "conceptual-diagram",
      "metric-attribution",
      "status",
      "verification",
    ]),
    text: localizedTextSchema,
  })
  .strict();

const evidenceSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    kind: z.enum([
      "owner-confirmation",
      "public-link",
      "public-repository",
      "public-screenshot",
      "specification",
    ]),
    access: z.enum(["public", "private"]),
    verification: z.enum(["verified", "not-yet-verified"]),
    label: localizedTextSchema,
    href: z
      .string()
      .refine(
        (value) =>
          value.startsWith("/") ||
          (() => {
            try {
              return new URL(value).protocol === "https:";
            } catch {
              return false;
            }
          })(),
        "Evidence links must be root-relative or use HTTPS.",
      )
      .optional(),
    sectionIds: z.array(sectionIdSchema).min(1),
  })
  .strict()
  .superRefine((evidence, context) => {
    if (evidence.access === "public" && !evidence.href) {
      context.addIssue({
        code: "custom",
        path: ["href"],
        message: "Public evidence must provide a link.",
      });
    }

    if (evidence.access === "private" && evidence.href) {
      context.addIssue({
        code: "custom",
        path: ["href"],
        message: "Private evidence must not expose a link.",
      });
    }
  });

const caseStudySectionSchema = z
  .object({
    id: sectionIdSchema,
    state: sectionStateSchema,
    content: z.array(localizedTextSchema).min(1),
    evidenceIds: z.array(nonEmptyTextSchema),
    disclosureIds: z.array(nonEmptyTextSchema),
  })
  .strict()
  .superRefine((section, context) => {
    if (section.state === "documented" && section.evidenceIds.length === 0) {
      context.addIssue({
        code: "custom",
        path: ["evidenceIds"],
        message: "Documented sections must reference evidence.",
      });
    }

    if (
      (section.state === "not-disclosed" ||
        section.state === "not-yet-verified") &&
      section.disclosureIds.length === 0
    ) {
      context.addIssue({
        code: "custom",
        path: ["disclosureIds"],
        message: `${section.state} sections must explain their limitation.`,
      });
    }
  });

const orderedSectionsSchema = z
  .array(caseStudySectionSchema)
  .length(caseStudySectionIds.length)
  .superRefine((sections, context) => {
    caseStudySectionIds.forEach((expectedId, index) => {
      if (sections[index]?.id !== expectedId) {
        context.addIssue({
          code: "custom",
          path: [index, "id"],
          message: `Expected section ${expectedId} at position ${index + 1}.`,
        });
      }
    });
  });

const architectureNodeSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    label: localizedTextSchema,
  })
  .strict();

const architectureSchema = z
  .object({
    state: z.enum(["conceptual", "planned", "not-yet-verified"]),
    nodes: z.array(architectureNodeSchema),
    edges: z.array(
      z
        .object({
          from: nonEmptyTextSchema,
          to: nonEmptyTextSchema,
          label: localizedTextSchema.optional(),
        })
        .strict(),
    ),
    disclosureIds: z.array(nonEmptyTextSchema),
  })
  .strict()
  .superRefine((architecture, context) => {
    const nodeIds = new Set(architecture.nodes.map((node) => node.id));

    architecture.edges.forEach((edge, index) => {
      if (!nodeIds.has(edge.from)) {
        context.addIssue({
          code: "custom",
          path: ["edges", index, "from"],
          message: `Unknown architecture node: ${edge.from}.`,
        });
      }
      if (!nodeIds.has(edge.to)) {
        context.addIssue({
          code: "custom",
          path: ["edges", index, "to"],
          message: `Unknown architecture node: ${edge.to}.`,
        });
      }
    });

    if (
      architecture.state !== "not-yet-verified" &&
      architecture.nodes.length === 0
    ) {
      context.addIssue({
        code: "custom",
        path: ["nodes"],
        message: "Conceptual and planned architectures need at least one node.",
      });
    }
  });

const resultSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    state: z.enum(["documented", "not-yet-verified", "planned"]),
    claim: localizedTextSchema,
    evidenceIds: z.array(nonEmptyTextSchema),
    metric: z
      .object({
        value: z.number().finite(),
        unit: z.enum(["percent"]),
        direction: z.enum(["improvement"]),
        attribution: localizedTextSchema,
      })
      .strict()
      .optional(),
  })
  .strict()
  .superRefine((result, context) => {
    if (result.state === "documented" && result.evidenceIds.length === 0) {
      context.addIssue({
        code: "custom",
        path: ["evidenceIds"],
        message: "Documented results must reference evidence.",
      });
    }

    if (result.metric && result.evidenceIds.length === 0) {
      context.addIssue({
        code: "custom",
        path: ["metric"],
        message: "Metrics must reference evidence and include attribution.",
      });
    }
  });

const caseStudyLinkSchema = z
  .object({
    kind: z.enum(["demo", "live", "reference", "repository"]),
    href: z.string().url().refine((value) => value.startsWith("https:")),
    label: localizedTextSchema,
    verification: z.enum(["verified", "not-yet-verified"]),
  })
  .strict();

const caseStudyMediaSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    kind: z.enum(["diagram", "screenshot"]),
    representation: z.enum([
      "conceptual",
      "portfolio-reference",
      "public-project-screenshot",
    ]),
    source: z.string().startsWith("/"),
    alt: localizedTextSchema,
    evidenceId: nonEmptyTextSchema,
    disclosureIds: z.array(nonEmptyTextSchema),
  })
  .strict();

const technologySchema = z
  .object({
    name: nonEmptyTextSchema,
    state: z.enum(["documented", "planned", "not-yet-verified"]),
  })
  .strict();

export const caseStudySchema = z
  .object({
    slug: caseStudySlugSchema,
    status: z.enum(["production", "demo", "private-case-study", "in-progress"]),
    visibility: z.enum(["public", "anonymized"]),
    title: localizedTextSchema,
    summary: localizedTextSchema,
    role: localizedTextSchema,
    period: localizedTextSchema.optional(),
    technologies: z.array(technologySchema),
    responsibilities: z.array(localizedTextSchema),
    presentation: presentationSchema,
    sections: orderedSectionsSchema,
    architecture: architectureSchema,
    results: z.array(resultSchema).min(1),
    relatedSlugs: z.array(caseStudySlugSchema),
    disclosures: z.array(disclosureSchema).min(1),
    evidence: z.array(evidenceSchema).min(1),
    links: z.array(caseStudyLinkSchema),
    media: z.array(caseStudyMediaSchema),
    seo: z
      .object({
        title: localizedTextSchema,
        description: localizedTextSchema,
      })
      .strict(),
  })
  .strict()
  .superRefine((study, context) => {
    const disclosureIds = new Set(study.disclosures.map(({ id }) => id));
    const evidenceById = new Map(study.evidence.map((item) => [item.id, item]));
    const usedEvidenceIds = new Set<string>();

    const duplicateIds = (ids: readonly string[]) =>
      ids.filter((id, index) => ids.indexOf(id) !== index);

    duplicateIds(study.disclosures.map(({ id }) => id)).forEach((id) => {
      context.addIssue({
        code: "custom",
        path: ["disclosures"],
        message: `Duplicate disclosure id: ${id}.`,
      });
    });
    duplicateIds(study.evidence.map(({ id }) => id)).forEach((id) => {
      context.addIssue({
        code: "custom",
        path: ["evidence"],
        message: `Duplicate evidence id: ${id}.`,
      });
    });

    const validateDisclosureIds = (ids: readonly string[], path: (string | number)[]) => {
      ids.forEach((id, index) => {
        if (!disclosureIds.has(id)) {
          context.addIssue({
            code: "custom",
            path: [...path, index],
            message: `Unknown disclosure id: ${id}.`,
          });
        }
      });
    };

    study.sections.forEach((section, sectionIndex) => {
      validateDisclosureIds(section.disclosureIds, [
        "sections",
        sectionIndex,
        "disclosureIds",
      ]);

      section.evidenceIds.forEach((id, evidenceIndex) => {
        const evidence = evidenceById.get(id);
        if (!evidence) {
          context.addIssue({
            code: "custom",
            path: ["sections", sectionIndex, "evidenceIds", evidenceIndex],
            message: `Unknown evidence id: ${id}.`,
          });
          return;
        }

        usedEvidenceIds.add(id);
        if (!evidence.sectionIds.includes(section.id)) {
          context.addIssue({
            code: "custom",
            path: ["sections", sectionIndex, "evidenceIds", evidenceIndex],
            message: `Evidence ${id} does not cover section ${section.id}.`,
          });
        }
      });
    });

    validateDisclosureIds(study.architecture.disclosureIds, [
      "architecture",
      "disclosureIds",
    ]);

    study.results.forEach((result, resultIndex) => {
      result.evidenceIds.forEach((id, evidenceIndex) => {
        if (!evidenceById.has(id)) {
          context.addIssue({
            code: "custom",
            path: ["results", resultIndex, "evidenceIds", evidenceIndex],
            message: `Unknown evidence id: ${id}.`,
          });
        } else {
          usedEvidenceIds.add(id);
        }
      });
    });

    study.media.forEach((media, mediaIndex) => {
      if (!evidenceById.has(media.evidenceId)) {
        context.addIssue({
          code: "custom",
          path: ["media", mediaIndex, "evidenceId"],
          message: `Unknown evidence id: ${media.evidenceId}.`,
        });
      } else {
        usedEvidenceIds.add(media.evidenceId);
      }
      validateDisclosureIds(media.disclosureIds, [
        "media",
        mediaIndex,
        "disclosureIds",
      ]);
    });

    study.evidence.forEach((item, index) => {
      if (!usedEvidenceIds.has(item.id)) {
        context.addIssue({
          code: "custom",
          path: ["evidence", index],
          message: `Evidence ${item.id} is not used by content, results, or media.`,
        });
      }
    });

    if (study.relatedSlugs.includes(study.slug)) {
      context.addIssue({
        code: "custom",
        path: ["relatedSlugs"],
        message: "A case study cannot relate to itself.",
      });
    }

    if (study.visibility === "anonymized") {
      const disclosureKinds = new Set(
        study.disclosures.map((disclosure) => disclosure.kind),
      );
      ["anonymization", "confidentiality", "conceptual-diagram"].forEach(
        (kind) => {
          if (!disclosureKinds.has(kind as z.infer<typeof disclosureSchema>["kind"])) {
            context.addIssue({
              code: "custom",
              path: ["disclosures"],
              message: `Anonymized studies require a ${kind} disclosure.`,
            });
          }
        },
      );

      if (study.status !== "private-case-study") {
        context.addIssue({
          code: "custom",
          path: ["status"],
          message: "Anonymized studies must use private-case-study status.",
        });
      }
      if (study.architecture.state !== "conceptual") {
        context.addIssue({
          code: "custom",
          path: ["architecture", "state"],
          message: "Anonymized architecture must be explicitly conceptual.",
        });
      }
      if (study.links.length > 0) {
        context.addIssue({
          code: "custom",
          path: ["links"],
          message: "Anonymized studies must not expose project links.",
        });
      }
      if (
        study.media.some(
          ({ representation }) => representation === "public-project-screenshot",
        )
      ) {
        context.addIssue({
          code: "custom",
          path: ["media"],
          message: "Anonymized studies must not publish project screenshots.",
        });
      }
    }
  });

export type CaseStudy = z.infer<typeof caseStudySchema>;
export type CaseStudyPresentation = z.infer<typeof presentationSchema>;
export type StorySection = z.infer<typeof storySectionSchema>;
export type { ProjectMediaId };

export const caseStudyRegistrySchema = z
  .array(caseStudySchema)
  .length(caseStudySlugs.length)
  .superRefine((studies, context) => {
    const slugSet = new Set(studies.map(({ slug }) => slug));

    if (slugSet.size !== studies.length) {
      context.addIssue({
        code: "custom",
        path: [],
        message: "Case-study slugs must be unique.",
      });
    }

    caseStudySlugs.forEach((slug) => {
      if (!slugSet.has(slug)) {
        context.addIssue({
          code: "custom",
          path: [],
          message: `Missing required case study: ${slug}.`,
        });
      }
    });

    studies.forEach((study, studyIndex) => {
      study.relatedSlugs.forEach((slug, relatedIndex) => {
        if (!slugSet.has(slug)) {
          context.addIssue({
            code: "custom",
            path: [studyIndex, "relatedSlugs", relatedIndex],
            message: `Unknown related case study: ${slug}.`,
          });
        }
      });
    });
  });

export type CaseStudyRegistry = z.infer<typeof caseStudyRegistrySchema>;
