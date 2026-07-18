import type { StudioLocaleContent } from "@/content/studio";
import { ButtonLink, Section, Surface } from "@/components/ui";

type StudioContactProps = {
  content: StudioLocaleContent["contact"];
};

export function StudioContact({ content }: StudioContactProps) {
  return (
    <Section
      id="contact"
      tone="dark"
      spacing="spacious"
      aria-labelledby="studio-contact-title"
    >
      <Surface variant="inverse" padding="large">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-secondary)]">
          {content.eyebrow}
        </p>
        <h2
          id="studio-contact-title"
          className="mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl"
        >
          {content.title}
        </h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">
          {content.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href={content.href} size="large">
            {content.action}
          </ButtonLink>
          <a
            href={content.href}
            className="rounded-sm text-sm font-semibold text-[var(--color-text-secondary)] underline decoration-[var(--color-border-strong)] underline-offset-4 hover:text-[var(--color-text-primary)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]"
          >
            {content.email}
          </a>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">
          {content.privacyNote}
        </p>
      </Surface>
    </Section>
  );
}
