import type { StudioLocaleContent } from "@/content/studio";
import { EditorialSection } from "@/components/ui";

type StudioServicesProps = {
  content: StudioLocaleContent;
};

export function StudioServices({ content }: StudioServicesProps) {
  return (
    <EditorialSection
      aria-labelledby="studio-services-title"
      id="services"
      tone="light"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(16rem,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
        <header className="max-w-xl">
          <h2
            className="text-[length:var(--font-size-section)] font-semibold leading-[1] tracking-[var(--letter-spacing-heading)] text-balance"
            id="studio-services-title"
          >
            {content.servicesHeading}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.servicesIntro}
          </p>
        </header>

        <ul className="border-t border-[var(--color-border-strong)]">
          {content.services.map((service) => (
            <li
              className="border-b border-[var(--color-border-subtle)] py-7"
              key={service.id}
            >
              <h3 className="text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 max-w-2xl leading-7 text-[var(--color-text-secondary)]">
                {service.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-text-muted)]">
                {service.includes.map((item) => (
                  <li
                    className="before:mr-2 before:text-[var(--color-signal)] before:content-['/']"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </EditorialSection>
  );
}
