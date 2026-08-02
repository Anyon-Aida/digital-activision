import type { StudioLocaleContent } from "@/content/studio";
import {
  ButtonLink,
  EditorialSection,
  TechnicalAnnotation,
} from "@/components/ui";

type StudioContactProps = {
  content: StudioLocaleContent["contact"];
};

export function StudioContact({ content }: StudioContactProps) {
  return (
    <EditorialSection
      id="contact"
      rule="top"
      spacing="spacious"
      tone="light"
      aria-labelledby="studio-contact-title"
    >
      <div className="max-w-5xl">
        <TechnicalAnnotation>{content.eyebrow}</TechnicalAnnotation>
        <h2
          id="studio-contact-title"
          className="mt-5 max-w-4xl text-[length:var(--font-size-section)] font-semibold leading-[1] tracking-[var(--letter-spacing-heading)] text-balance"
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
      </div>
    </EditorialSection>
  );
}
