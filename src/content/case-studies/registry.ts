import { caseStudies } from "./content";
import {
  caseStudySectionIds,
  caseStudySlugs,
  type CaseStudy,
  type CaseStudyLocale,
  type CaseStudySectionId,
  type CaseStudySlug,
  type LocalizedText,
} from "./schema";

export const homepageCaseStudyOrder = [
  "samsung-smart-gate-analytics",
  "adott-enterprise-project-workflow",
  "alba-medence-3d-configurator",
  "questlog-offline-first-pwa",
] as const satisfies readonly CaseStudySlug[];

export const workCaseStudyOrder = [
  "adott-enterprise-project-workflow",
  "samsung-smart-gate-analytics",
  "alba-medence-3d-configurator",
  "questlog-offline-first-pwa",
] as const satisfies readonly CaseStudySlug[];

export const caseStudySectionLabels: Record<
  CaseStudySectionId,
  LocalizedText
> = {
  summary: { hu: "Projektösszefoglaló", en: "Project summary" },
  context: {
    hu: "Kontextus és üzleti probléma",
    en: "Context and business problem",
  },
  ownership: {
    hu: "Szerepköröm és felelősségem",
    en: "My role and ownership",
  },
  constraints: { hu: "Korlátok", en: "Constraints" },
  architecture: { hu: "Rendszerarchitektúra", en: "System architecture" },
  "data-flow": { hu: "Adatmodell és adatfolyam", en: "Data model and data flow" },
  frontend: { hu: "Frontend struktúra", en: "Frontend structure" },
  "backend-api": { hu: "Backend és API", en: "Backend and API" },
  security: {
    hu: "Authentikáció, autorizáció és biztonság",
    en: "Authentication, authorization and security",
  },
  "performance-reliability": {
    hu: "Teljesítmény és megbízhatóság",
    en: "Performance and reliability",
  },
  testing: { hu: "Tesztstratégia", en: "Testing strategy" },
  "deployment-monitoring": {
    hu: "Deployment és monitoring",
    en: "Deployment and monitoring",
  },
  impact: { hu: "Eredmény és hatás", en: "Result and impact" },
  tradeoffs: { hu: "Trade-offok", en: "Trade-offs" },
  improvements: {
    hu: "Mit fejlesztenék ma tovább",
    en: "What I would improve today",
  },
  related: {
    hu: "Kapcsolódó készségek és projektek",
    en: "Related skills and projects",
  },
};

const entries = caseStudies.map((study) => [study.slug, study] as const);

export const caseStudyBySlug = Object.freeze(
  Object.fromEntries(entries) as Record<CaseStudySlug, CaseStudy>,
);

export const localize = (value: LocalizedText, locale: CaseStudyLocale) =>
  value[locale];

export const getCaseStudy = (slug: CaseStudySlug) => caseStudyBySlug[slug];

export const getCaseStudies = (
  order: readonly CaseStudySlug[] = workCaseStudyOrder,
) => order.map(getCaseStudy);

export const getCaseStudyPath = (
  slug: CaseStudySlug,
  locale: CaseStudyLocale,
) => `/${locale}/work/${slug}` as const;

export const getCaseStudyCard = (
  slug: CaseStudySlug,
  locale: CaseStudyLocale,
) => {
  const study = getCaseStudy(slug);

  return {
    slug,
    href: getCaseStudyPath(slug, locale),
    status: study.status,
    visibility: study.visibility,
    title: localize(study.title, locale),
    summary: localize(study.summary, locale),
    role: localize(study.role, locale),
    technologies: study.technologies.map(({ name, state }) => ({ name, state })),
  };
};

export const getCaseStudyCards = (
  locale: CaseStudyLocale,
  order: readonly CaseStudySlug[] = workCaseStudyOrder,
) => order.map((slug) => getCaseStudyCard(slug, locale));

export const getCaseStudySeo = (
  slug: CaseStudySlug,
  locale: CaseStudyLocale,
) => {
  const study = getCaseStudy(slug);

  return {
    title: localize(study.seo.title, locale),
    description: localize(study.seo.description, locale),
  };
};

export const getCaseStudySections = (
  slug: CaseStudySlug,
  locale: CaseStudyLocale,
) => {
  const study = getCaseStudy(slug);
  const disclosures = new Map(
    study.disclosures.map((disclosure) => [
      disclosure.id,
      localize(disclosure.text, locale),
    ]),
  );

  return study.sections.map((section) => ({
    id: section.id,
    heading: localize(caseStudySectionLabels[section.id], locale),
    state: section.state,
    content: section.content.map((paragraph) => localize(paragraph, locale)),
    disclosures: section.disclosureIds.map((id) => disclosures.get(id) as string),
    evidenceIds: [...section.evidenceIds],
  }));
};

// Keep these exports colocated with the registry so route generators can use the
// same canonical source instead of duplicating slugs or section structure.
export { caseStudies, caseStudySectionIds, caseStudySlugs };
