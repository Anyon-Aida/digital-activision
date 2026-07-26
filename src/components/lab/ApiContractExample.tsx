import type { LabLocaleContent } from "@/content/lab";
import { Badge, Card, Section, Surface } from "@/components/ui";

type ApiContractExampleProps = {
  content: LabLocaleContent["apiContract"];
};

export function ApiContractExample({ content }: ApiContractExampleProps) {
  return (
    <Section tone="subtle" aria-labelledby="api-contract-title">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {content.eyebrow}
          </p>
          <h2
            id="api-contract-title"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {content.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.description}
          </p>
        </header>
        <Surface as="aside" variant="default">
          <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
            {content.disclosure}
          </p>
        </Surface>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <Card as="div" className="min-w-0" variant="elevated">
          <p className="text-sm font-semibold text-[var(--color-text-muted)]">
            {content.endpointLabel}
          </p>
          <code className="mt-3 block overflow-x-auto rounded-[var(--radius-control)] bg-[var(--color-surface-subtle)] p-4 font-mono text-sm text-[var(--color-accent)]">
            {content.endpoint}
          </code>
          <h3 className="mt-6 text-lg font-bold">{content.requestLabel}</h3>
          <pre className="mt-3 overflow-x-auto rounded-[var(--radius-control)] bg-[var(--color-page)] p-4 text-sm leading-6 text-[var(--color-text-primary)]">
            <code>{content.requestExample}</code>
          </pre>
        </Card>

        <Card as="div" className="min-w-0" variant="elevated">
          <h3 className="text-lg font-bold">{content.responseLabel}</h3>
          <pre className="mt-3 overflow-x-auto rounded-[var(--radius-control)] bg-[var(--color-page)] p-4 text-sm leading-6 text-[var(--color-text-primary)]">
            <code>{content.responseExample}</code>
          </pre>
          <h3 className="mt-6 text-lg font-bold">{content.errorTitle}</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {content.errors.map((error) => (
              <li
                key={error.status}
                className="flex items-start gap-3 rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] p-3"
              >
                <Badge tone={error.status === 409 ? "warning" : "neutral"}>
                  {error.status}
                </Badge>
                <span className="text-sm leading-6">{error.label}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <ul className="mt-6 grid gap-3 md:grid-cols-3">
        {content.notes.map((note) => (
          <li
            key={note}
            className="rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-4 text-sm leading-6 text-[var(--color-text-secondary)]"
          >
            {note}
          </li>
        ))}
      </ul>
    </Section>
  );
}
