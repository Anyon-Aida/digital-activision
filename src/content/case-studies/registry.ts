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
  "adott-enterprise-project-workflow",
  "alba-medence-3d-configurator",
  "sanjiwani-booking-experience",
] as const satisfies readonly CaseStudySlug[];

export const workCaseStudyOrder = [
  "adott-enterprise-project-workflow",
  "alba-medence-3d-configurator",
  "samsung-smart-gate-analytics",
  "sanjiwani-booking-experience",
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

export const caseStudyStatusLabels: Record<CaseStudy["status"], LocalizedText> = {
  production: { hu: "Production rendszer", en: "Production system" },
  demo: { hu: "Publikus bemutató", en: "Public demo" },
  "private-case-study": {
    hu: "Privát esettanulmány",
    en: "Private case study",
  },
  "in-progress": { hu: "Fejlesztés alatt", en: "In progress" },
};

export const caseStudyVisibilityLabels: Record<
  CaseStudy["visibility"],
  LocalizedText
> = {
  public: { hu: "Publikus", en: "Public" },
  anonymized: { hu: "Anonimizált", en: "Anonymized" },
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
    statusLabel: localize(caseStudyStatusLabels[study.status], locale),
    visibility: study.visibility,
    visibilityLabel: localize(
      caseStudyVisibilityLabels[study.visibility],
      locale,
    ),
    title: localize(study.title, locale),
    summary: localize(study.presentation.homepageSummary, locale),
    role: localize(study.presentation.roleSummary, locale),
    featuredMedia: [...study.presentation.featuredMedia],
    heroVariant: study.presentation.heroVariant,
    technologies: study.technologies.map(({ name, state }) => ({ name, state })),
  };
};

export const getCaseStudyCards = (
  locale: CaseStudyLocale,
  order: readonly CaseStudySlug[] = workCaseStudyOrder,
) => order.map((slug) => getCaseStudyCard(slug, locale));

export const getFeaturedCaseStudies = (locale: CaseStudyLocale) =>
  homepageCaseStudyOrder.map((slug) => {
    const study = getCaseStudy(slug);
    const openingParagraph = study.presentation.storySections.at(0)?.paragraphs.at(0);

    return {
      ...getCaseStudyCard(slug, locale),
      problem: openingParagraph ? localize(openingParagraph, locale) : "",
      ownership: localize(study.presentation.roleSummary, locale),
      result: localize(study.results[0].claim, locale),
    };
  });

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
