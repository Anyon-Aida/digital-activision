import type { StudioLocaleContent } from "@/content/studio";
import {
  ButtonLink,
  EditorialSection,
  TechnicalAnnotation,
} from "@/components/ui";

type StudioScopeProps = {
  content: StudioLocaleContent["scope"];
};

export function StudioScope({ content }: StudioScopeProps) {
  return (
    <EditorialSection
      aria-labelledby="studio-scope-title"
      id="scope"
      rule="both"
      spacing="compact"
      tone="light"
    >
      <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div className="max-w-4xl">
          <TechnicalAnnotation>{content.eyebrow}</TechnicalAnnotation>
          <h2
            className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl"
            id="studio-scope-title"
          >
            {content.title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.description}
          </p>
        </div>
        <ButtonLink href="#contact" size="large">
          {content.action}
        </ButtonLink>
      </div>
    </EditorialSection>
  );
}
