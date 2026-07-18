export const caseStudySlugs = [
  "samsung-smart-gate-analytics",
  "adott-enterprise-project-workflow",
  "alba-medence-3d-configurator",
  "questlog-offline-first-pwa",
] as const;

export type CaseStudySlug = (typeof caseStudySlugs)[number];

export function isCaseStudySlug(value: string): value is CaseStudySlug {
  return caseStudySlugs.some((slug) => slug === value);
}
