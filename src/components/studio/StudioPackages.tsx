import type { StudioLocaleContent } from "@/content/studio";
import { Badge, Card, Section, Surface } from "@/components/ui";

type StudioPackagesProps = {
  content: StudioLocaleContent;
};

export function StudioPackages({ content }: StudioPackagesProps) {
  return (
    <Section id="pricing" tone="subtle" aria-labelledby="studio-packages-title">
      <div className="max-w-3xl">
        <h2
          id="studio-packages-title"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {content.packagesHeading}
        </h2>
        <p className="mt-4 text-lg leading-8 text-[var(--color-text-secondary)]">
          {content.packagesIntro}
        </p>
      </div>

      <Surface
        as="aside"
        className="mt-8 border-[var(--color-warning)] bg-[color-mix(in_srgb,var(--color-warning)_8%,var(--color-surface))]"
        aria-labelledby="studio-pricing-warning"
      >
        <h3 id="studio-pricing-warning" className="text-lg font-bold">
          {content.pricingWarningTitle}
        </h3>
        <p className="mt-2 max-w-4xl leading-7 text-[var(--color-text-secondary)]">
          {content.pricingWarningBody}
        </p>
      </Surface>

      <ul className="mt-8 grid gap-6 lg:grid-cols-3">
        {content.packages.map((studioPackage) => (
          <Card as="li" key={studioPackage.id} variant="elevated">
            <Badge tone="warning" data-status={studioPackage.status}>
              {content.packageStatusLabel}
            </Badge>
            <h3 className="mt-5 text-2xl font-bold">{studioPackage.name}</h3>
            {process.env.VERCEL_ENV === "production" ? (
              <p className="mt-2 text-lg font-bold text-[var(--color-accent)]">
                {content.productionPriceFallback}
              </p>
            ) : (
              <p
                className="mt-2 text-2xl font-bold text-[var(--color-accent)]"
                data-preview-only-price
              >
                {studioPackage.retainedPrice}
              </p>
            )}
            <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">
              {studioPackage.positioning}
            </p>
            <ul className="mt-6 space-y-3 border-t border-[var(--color-border-subtle)] pt-6">
              {studioPackage.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6">
                  <span aria-hidden="true" className="text-[var(--color-success)]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-6 text-[var(--color-text-muted)]">
              {studioPackage.scopeNote}
            </p>
          </Card>
        ))}
      </ul>
    </Section>
  );
}
