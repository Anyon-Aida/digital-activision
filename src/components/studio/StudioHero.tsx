import type { StudioLocaleContent } from "@/content/studio";
import { ButtonLink, Section, Surface } from "@/components/ui";

type StudioHeroProps = {
  content: StudioLocaleContent["hero"];
};

export function StudioHero({ content }: StudioHeroProps) {
  return (
    <Section tone="dark" spacing="spacious" container="wide">
      <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <header className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-secondary)]">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-bold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-heading)] sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
            {content.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="#contact" size="large">
              {content.primaryAction}
            </ButtonLink>
            <ButtonLink href="#services" size="large" variant="secondary">
              {content.secondaryAction}
            </ButtonLink>
          </div>
        </header>

        <Surface as="aside" variant="inverse" className="border-[var(--color-border-strong)]">
          <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
            {content.boundary}
          </p>
        </Surface>
      </div>
    </Section>
  );
}
