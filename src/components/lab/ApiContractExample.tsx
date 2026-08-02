import type { LabLocaleContent } from "@/content/lab";
import {
  EditorialSection,
  TechnicalAnnotation,
} from "@/components/ui";

type ApiContractExampleProps = {
  content: LabLocaleContent["apiContract"];
};

export function ApiContractExample({ content }: ApiContractExampleProps) {
  return (
    <EditorialSection
      aria-labelledby="api-contract-title"
      id="api-contract"
      tone="light"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <header className="max-w-xl">
          <TechnicalAnnotation>{content.eyebrow}</TechnicalAnnotation>
          <h2
            id="api-contract-title"
            className="mt-4 text-[length:var(--font-size-section)] font-semibold leading-[1] tracking-[var(--letter-spacing-heading)]"
          >
            {content.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.description}
          </p>
        </header>

        <div className="min-w-0 border border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
          <div className="border-b border-[var(--color-border-subtle)] p-5 sm:p-7">
            <p className="text-sm font-semibold text-[var(--color-text-muted)]">
              {content.endpointLabel}
            </p>
            <code className="mt-3 block whitespace-pre-wrap break-all bg-[var(--color-surface-subtle)] p-4 font-mono text-sm text-[var(--color-accent)]">
              {content.endpoint}
            </code>
          </div>
          <div className="grid lg:grid-cols-2">
            <div className="min-w-0 border-b border-[var(--color-border-subtle)] p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <h3 className="text-lg font-semibold">
                {content.requestLabel}
              </h3>
              <pre className="mt-3 whitespace-pre-wrap break-words bg-[var(--color-page)] p-4 font-mono text-sm leading-6 text-[var(--color-text-primary)]">
                <code>{content.requestExample}</code>
              </pre>
            </div>
            <div className="min-w-0 p-5 sm:p-7">
              <h3 className="text-lg font-semibold">
                {content.responseLabel}
              </h3>
              <pre className="mt-3 whitespace-pre-wrap break-words bg-[var(--color-page)] p-4 font-mono text-sm leading-6 text-[var(--color-text-primary)]">
                <code>{content.responseExample}</code>
              </pre>
            </div>
          </div>
          <div className="border-t border-[var(--color-border-subtle)] p-5 sm:p-7">
            <h3 className="text-lg font-semibold">{content.errorTitle}</h3>
            <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
              {content.errors.map((error) => (
                <li
                  key={error.status}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] gap-3 border-t border-[var(--color-border-subtle)] py-3"
                >
                  <span className="font-mono font-semibold text-[var(--color-industrial)]">
                    {error.status}
                  </span>
                  <span className="text-sm leading-6">{error.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <ul className="mt-8 grid gap-5 border-t border-[var(--color-border-strong)] pt-6 md:grid-cols-3">
        {content.notes.map((note) => (
          <li
            key={note}
            className="text-sm leading-6 text-[var(--color-text-secondary)] before:mr-2 before:text-[var(--color-signal)] before:content-['/']"
          >
            {note}
          </li>
        ))}
      </ul>
    </EditorialSection>
  );
}
