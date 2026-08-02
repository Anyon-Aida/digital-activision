import type { StudioLocaleContent } from "@/content/studio";
import { EditorialSection } from "@/components/ui";

type StudioProcessProps = {
  content: StudioLocaleContent;
};

export function StudioProcess({ content }: StudioProcessProps) {
  return (
    <EditorialSection
      aria-labelledby="studio-process-title"
      id="process"
      tone="subtle"
    >
      <div className="max-w-3xl">
        <h2
          id="studio-process-title"
          className="text-[length:var(--font-size-section)] font-semibold leading-[1] tracking-[var(--letter-spacing-heading)]"
        >
          {content.processHeading}
        </h2>
        <p className="mt-4 text-lg leading-8 text-[var(--color-text-secondary)]">
          {content.processIntro}
        </p>
      </div>

      <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {content.process.map((step, index) => (
          <li
            key={step.id}
            className="border-t border-[var(--color-border-strong)] pt-5"
          >
            <p className="font-mono text-sm font-semibold text-[var(--color-accent)]">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
            <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
              {step.description}
            </p>
            <p className="mt-4 text-sm font-medium leading-6 text-[var(--color-text-muted)]">
              {step.output}
            </p>
          </li>
        ))}
      </ol>
    </EditorialSection>
  );
}
