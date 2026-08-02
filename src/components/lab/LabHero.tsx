import type { LabLocaleContent } from "@/content/lab";
import {
  EditorialSection,
  TechnicalAnnotation,
} from "@/components/ui";

type LabHeroProps = {
  content: LabLocaleContent["hero"];
  status: LabLocaleContent["status"];
};

export function LabHero({ content, status }: LabHeroProps) {
  return (
    <EditorialSection
      container="wide"
      rule="bottom"
      spacing="spacious"
      tone="light"
    >
      <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:gap-20">
        <header className="max-w-5xl">
          <TechnicalAnnotation data-lab-status={status}>
            {content.demoLabel}
          </TechnicalAnnotation>
          <p className="mt-6 text-sm font-semibold text-[var(--color-text-muted)]">
            {content.eyebrow}
          </p>
          <h1 className="mt-4 text-[clamp(3rem,6vw,6.1rem)] font-semibold leading-[0.95] tracking-[var(--letter-spacing-heading)] text-balance">
            {content.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
            {content.description}
          </p>
        </header>

        <aside
          className="border-l-2 border-[var(--color-signal)] bg-[var(--color-signal-soft)] px-6 py-5"
          role="note"
        >
          <p className="text-sm leading-6 text-[var(--color-text-muted)]">
            {content.disclosure}
          </p>
        </aside>
      </div>
    </EditorialSection>
  );
}
