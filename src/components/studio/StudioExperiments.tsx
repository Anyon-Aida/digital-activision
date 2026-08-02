import Image from "next/image";
import type { StudioLocaleContent } from "@/content/studio";
import {
  EditorialSection,
  TechnicalAnnotation,
} from "@/components/ui";

type StudioExperimentsProps = {
  content: StudioLocaleContent;
};

export function StudioExperiments({ content }: StudioExperimentsProps) {
  return (
    <EditorialSection
      aria-labelledby="studio-experiments-title"
      id="experiments"
      rule="top"
      spacing="compact"
      tone="light"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(16rem,0.65fr)_minmax(0,1.35fr)] lg:gap-16">
        <header className="max-w-lg">
          <h2
            className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl"
            id="studio-experiments-title"
          >
            {content.experimentsHeading}
          </h2>
          <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">
            {content.experimentsIntro}
          </p>
        </header>

        <ul className="grid gap-6 sm:grid-cols-3">
          {content.experiments.map((experiment) => (
            <li className="min-w-0" key={experiment.id}>
              <a
                className="group block no-underline"
                href={experiment.href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="relative block aspect-[4/3] overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)]">
                  <Image
                    alt={experiment.alt}
                    className="object-cover object-top transition-transform duration-[var(--motion-duration-default)] ease-[var(--motion-ease-standard)] group-hover:scale-[1.02]"
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 30vw, 100vw"
                    src={experiment.image}
                  />
                </span>
                <TechnicalAnnotation className="mt-4">
                  {content.experimentLabel}
                </TechnicalAnnotation>
                <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] group-hover:text-[var(--color-accent)]">
                  {experiment.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {experiment.description}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </EditorialSection>
  );
}
