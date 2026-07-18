import type { LabLocaleContent } from "@/content/lab";
import { Badge, Section, Surface } from "@/components/ui";

type LabHeroProps = {
  content: LabLocaleContent["hero"];
  status: LabLocaleContent["status"];
};

export function LabHero({ content, status }: LabHeroProps) {
  return (
    <Section tone="dark" spacing="spacious" container="wide">
      <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <header className="max-w-4xl">
          <Badge tone="accent" data-lab-status={status}>
            {content.demoLabel}
          </Badge>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-secondary)]">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-heading)] sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
            {content.description}
          </p>
        </header>

        <Surface
          as="aside"
          variant="inverse"
          className="border-[var(--color-border-strong)]"
        >
          <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
            {content.disclosure}
          </p>
        </Surface>
      </div>
    </Section>
  );
}
