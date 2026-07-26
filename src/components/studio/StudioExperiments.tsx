import type { StudioLocaleContent } from "@/content/studio";
import { Badge, ButtonLink, Card, Section } from "@/components/ui";

type StudioExperimentsProps = {
  content: StudioLocaleContent;
};

export function StudioExperiments({ content }: StudioExperimentsProps) {
  return (
    <Section id="experiments" aria-labelledby="studio-experiments-title">
      <div className="max-w-3xl">
        <h2
          id="studio-experiments-title"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {content.experimentsHeading}
        </h2>
        <p className="mt-4 text-lg leading-8 text-[var(--color-text-secondary)]">
          {content.experimentsIntro}
        </p>
      </div>

      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {content.experiments.map((experiment) => {
          const classificationLabel =
            experiment.classification === "ui-concept"
              ? content.experimentLabels.uiConcept
              : content.experimentLabels.staticExperiment;

          return (
            <Card as="li" key={experiment.id} className="flex h-full flex-col">
              <Badge tone="neutral">{classificationLabel}</Badge>
              <h3 className="mt-4 text-xl font-bold">{experiment.title}</h3>
              <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
                {experiment.description}
              </p>
              <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
                {experiment.availabilityNote}
              </p>
              {experiment.links.length > 0 ? (
                <div className="mt-auto flex flex-wrap gap-3 pt-6">
                  {experiment.links.map((link) => (
                    <ButtonLink
                      key={link.href}
                      href={link.href}
                      size="small"
                      target="_blank"
                      variant="secondary"
                    >
                      {link.label}
                    </ButtonLink>
                  ))}
                </div>
              ) : null}
            </Card>
          );
        })}
      </ul>
    </Section>
  );
}
