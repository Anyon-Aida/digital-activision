import type { StudioLocaleContent } from "@/content/studio";
import {
  ButtonLink,
  EditorialSection,
  TechnicalAnnotation,
} from "@/components/ui";

type StudioHeroProps = {
  content: StudioLocaleContent["hero"];
};

export function StudioHero({ content }: StudioHeroProps) {
  return (
    <EditorialSection
      container="wide"
      rule="bottom"
      spacing="spacious"
      tone="light"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-20">
        <header className="max-w-5xl">
          <TechnicalAnnotation>{content.eyebrow}</TechnicalAnnotation>
          <h1 className="mt-6 max-w-5xl text-[clamp(3rem,6.2vw,6.1rem)] font-semibold leading-[0.94] tracking-[var(--letter-spacing-heading)] text-balance">
            {content.title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
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

        <div
          aria-hidden="true"
          className="relative min-h-72 overflow-hidden border-y border-[var(--color-border-strong)]"
        >
          <div className="absolute inset-x-0 top-[18%] h-px bg-[var(--color-border-subtle)]" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-[var(--color-border-subtle)]" />
          <div className="absolute inset-x-0 top-[82%] h-px bg-[var(--color-border-subtle)]" />
          <div className="absolute bottom-[18%] left-[8%] top-[18%] w-px bg-[var(--color-industrial)]" />
          <div className="absolute bottom-[18%] left-1/2 top-1/2 w-px bg-[var(--color-accent)]" />
          <div className="absolute right-[8%] top-[18%] size-3 -translate-y-1/2 rounded-full border-2 border-[var(--color-signal)] bg-[var(--color-page)]" />
          <div className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-[var(--color-accent)] bg-[var(--color-page)]" />
          <div className="absolute bottom-[18%] left-[8%] size-3 -translate-x-1/2 translate-y-1/2 bg-[var(--color-industrial)]" />
        </div>
      </div>
    </EditorialSection>
  );
}
