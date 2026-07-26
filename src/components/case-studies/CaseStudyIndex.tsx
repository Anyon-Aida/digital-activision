import type { CaseStudyLocale } from "@/content/case-studies";
import { getCaseStudyCards } from "@/content/case-studies";
import { Section } from "@/components/ui";
import { CaseStudyFilter } from "./CaseStudyFilter";
import { caseStudyUi } from "./labels";

type CaseStudyIndexProps = {
  locale: CaseStudyLocale;
};

export function CaseStudyIndex({ locale }: CaseStudyIndexProps) {
  const labels = caseStudyUi[locale];
  const cards = getCaseStudyCards(locale);

  return (
    <Section spacing="spacious">
      <header className="max-w-[var(--layout-readable-max)]">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-secondary)]">
          {labels.indexEyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
          {labels.indexTitle}
        </h1>
        <p className="mt-6 text-lg text-[var(--color-text-secondary)]">
          {labels.indexDescription}
        </p>
      </header>

      <CaseStudyFilter cards={cards} labels={labels} />
    </Section>
  );
}
