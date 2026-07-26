import type { StudioLocaleContent } from "@/content/studio";
import { Card, Section } from "@/components/ui";

type StudioServicesProps = {
  content: StudioLocaleContent;
};

export function StudioServices({ content }: StudioServicesProps) {
  return (
    <>
      <Section id="benefits" spacing="compact" aria-labelledby="studio-benefits-title">
        <div className="max-w-3xl">
          <h2
            id="studio-benefits-title"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {content.benefitsHeading}
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.benefitsIntro}
          </p>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {content.benefits.map((benefit) => (
            <Card as="li" key={benefit.id} variant="subtle">
              <h3 className="text-xl font-bold">{benefit.title}</h3>
              <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
                {benefit.description}
              </p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section
        id="services"
        tone="subtle"
        aria-labelledby="studio-services-title"
      >
        <div className="max-w-3xl">
          <h2
            id="studio-services-title"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {content.servicesHeading}
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.servicesIntro}
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.services.map((service) => (
            <Card as="li" key={service.id} className="flex h-full flex-col">
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
                {service.description}
              </p>
              <ul className="mt-5 space-y-2 border-t border-[var(--color-border-subtle)] pt-5">
                {service.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6">
                    <span aria-hidden="true" className="text-[var(--color-accent)]">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-5 text-sm leading-6 text-[var(--color-text-muted)]">
                {service.boundary}
              </p>
            </Card>
          ))}
        </ul>
      </Section>
    </>
  );
}
