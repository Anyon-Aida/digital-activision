import Image from "next/image";
import type {
  CaseStudy,
  CaseStudyLocale,
  CaseStudySectionState,
} from "@/content/case-studies";
import {
  getCaseStudy,
  getCaseStudyPath,
  getCaseStudySections,
  localize,
} from "@/content/case-studies";
import { Badge, Card, Section, Surface } from "@/components/ui";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { caseStudyUi, type CaseStudyUi } from "./labels";

type CaseStudyDetailProps = {
  locale: CaseStudyLocale;
  study: CaseStudy;
};

type EvidenceListProps = {
  evidenceIds: readonly string[];
  labels: CaseStudyUi;
  locale: CaseStudyLocale;
  showHeading?: boolean;
  study: CaseStudy;
};

function stateTone(state: CaseStudySectionState) {
  if (state === "documented") {
    return "success" as const;
  }

  if (state === "not-applicable") {
    return "neutral" as const;
  }

  return "warning" as const;
}

function EvidenceList({
  evidenceIds,
  labels,
  locale,
  showHeading = true,
  study,
}: EvidenceListProps) {
  const evidenceById = new Map(study.evidence.map((item) => [item.id, item]));
  const items = evidenceIds.flatMap((id) => {
    const evidence = evidenceById.get(id);
    return evidence ? [evidence] : [];
  });

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      {showHeading ? (
        <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
          {labels.sectionEvidence}
        </h3>
      ) : null}
      <ul className={showHeading ? "mt-3 grid gap-3" : "grid gap-3"}>
        {items.map((evidence) => {
          const label = localize(evidence.label, locale);
          const external = evidence.href?.startsWith("https://") ?? false;

          return (
            <li
              className="rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] p-4 text-sm"
              key={evidence.id}
            >
              <div className="flex flex-wrap gap-2">
                <Badge
                  tone={
                    evidence.verification === "verified"
                      ? "success"
                      : "warning"
                  }
                >
                  {labels.verification[evidence.verification]}
                </Badge>
                <Badge>{labels.evidenceAccess[evidence.access]}</Badge>
              </div>
              {evidence.href ? (
                <a
                  className="mt-3 inline-flex font-medium text-[var(--color-accent-secondary)] underline underline-offset-4"
                  href={evidence.href}
                  rel={external ? "noopener noreferrer" : undefined}
                  target={external ? "_blank" : undefined}
                >
                  {label}
                  {external ? (
                    <span className="sr-only"> ({labels.externalLink})</span>
                  ) : null}
                </a>
              ) : (
                <p className="mt-3 font-medium text-[var(--color-text-primary)]">
                  {label}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function CaseStudyDetail({ locale, study }: CaseStudyDetailProps) {
  const labels = caseStudyUi[locale];
  const sections = getCaseStudySections(study.slug, locale);
  const disclosureById = new Map(
    study.disclosures.map((disclosure) => [disclosure.id, disclosure]),
  );

  return (
    <article>
      <Section spacing="spacious" tone="dark">
        <nav aria-label={labels.breadcrumbLabel}>
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <li>
              <a className="underline underline-offset-4" href={`/${locale}`}>
                {labels.home}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a
                className="underline underline-offset-4"
                href={`/${locale}/work`}
              >
                {labels.work}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-[var(--color-text-primary)]">
              {localize(study.title, locale)}
            </li>
          </ol>
        </nav>

        <header className="mt-10 max-w-5xl">
          <div className="flex flex-wrap gap-2">
            <Badge tone={study.status === "production" ? "success" : "warning"}>
              {labels.status[study.status]}
            </Badge>
            <Badge>{labels.visibility[study.visibility]}</Badge>
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl">
            {localize(study.title, locale)}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-[var(--color-text-secondary)] sm:text-xl">
            {localize(study.summary, locale)}
          </p>
        </header>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Surface padding="large" variant="inverse">
            <dl className="grid gap-6 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                  {labels.role}
                </dt>
                <dd className="mt-2">{localize(study.role, locale)}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                  {labels.period}
                </dt>
                <dd className="mt-2">
                  {study.period
                    ? localize(study.period, locale)
                    : labels.notDocumented}
                </dd>
              </div>
            </dl>

            <h2 className="mt-7 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {labels.technologies}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {study.technologies.map((technology) => (
                <li key={technology.name}>
                  <Badge
                    tone={
                      technology.state === "documented" ? "neutral" : "warning"
                    }
                    title={labels.technologyState[technology.state]}
                  >
                    {technology.name}
                  </Badge>
                </li>
              ))}
            </ul>
          </Surface>

          <Surface padding="large" variant="inverse">
            <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {labels.responsibilities}
            </h2>
            <ul className="mt-4 grid gap-3">
              {study.responsibilities.map((responsibility) => (
                <li className="flex gap-3" key={localize(responsibility, locale)}>
                  <span
                    aria-hidden="true"
                    className="text-[var(--color-accent-secondary)]"
                  >
                    →
                  </span>
                  <span>{localize(responsibility, locale)}</span>
                </li>
              ))}
            </ul>
          </Surface>
        </div>

        <aside
          aria-labelledby="case-study-disclosures-title"
          className="mt-6 rounded-[var(--radius-surface)] border border-[var(--color-warning)] bg-[var(--color-surface-subtle)] p-5 sm:p-6"
        >
          <h2
            className="font-semibold text-[var(--color-text-primary)]"
            id="case-study-disclosures-title"
          >
            {labels.disclosures}
          </h2>
          <ul className="mt-3 grid gap-2 text-sm text-[var(--color-text-secondary)]">
            {study.disclosures.map((disclosure) => (
              <li className="flex gap-3" key={disclosure.id}>
                <span aria-hidden="true">—</span>
                <span>{localize(disclosure.text, locale)}</span>
              </li>
            ))}
          </ul>
        </aside>
      </Section>

      <Section spacing="spacious">
        <div className="grid items-start gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
          <nav
            aria-label={labels.contents}
            className="rounded-[var(--radius-surface)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-5 lg:sticky lg:top-24"
          >
            <h2 className="font-semibold">{labels.contents}</h2>
            <ol className="mt-4 grid gap-2 text-sm">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    className="flex gap-3 rounded-[var(--radius-control)] px-2 py-1.5 text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-primary)]"
                    href={`#case-study-${section.id}`}
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[var(--color-accent-secondary)]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{section.heading}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="min-w-0">
            {sections.map((section, index) => (
              <section
                aria-labelledby={`case-study-${section.id}-title`}
                className="scroll-mt-8 border-b border-[var(--color-border-subtle)] py-10 first:pt-0 last:border-b-0 last:pb-0"
                data-case-study-section={section.id}
                id={`case-study-${section.id}`}
                key={section.id}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 font-mono text-sm text-[var(--color-accent-secondary)]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2
                      className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
                      id={`case-study-${section.id}-title`}
                    >
                      {section.heading}
                    </h2>
                  </div>
                  <Badge tone={stateTone(section.state)}>
                    <span className="sr-only">{labels.state}: </span>
                    {labels.sectionState[section.state]}
                  </Badge>
                </div>

                <div className="mt-6 grid gap-4 text-[var(--color-text-secondary)]">
                  {section.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.id === "architecture" ? (
                  <ArchitectureDiagram
                    labels={labels}
                    locale={locale}
                    study={study}
                  />
                ) : null}

                {section.disclosures.length > 0 ? (
                  <aside className="mt-6 border-l-2 border-[var(--color-warning)] pl-4">
                    <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                      {labels.sectionDisclosures}
                    </h3>
                    <ul className="mt-3 grid gap-2 text-sm text-[var(--color-text-secondary)]">
                      {section.disclosures.map((disclosure) => (
                        <li key={disclosure}>{disclosure}</li>
                      ))}
                    </ul>
                  </aside>
                ) : null}

                <EvidenceList
                  evidenceIds={section.evidenceIds}
                  labels={labels}
                  locale={locale}
                  study={study}
                />
              </section>
            ))}
          </div>
        </div>
      </Section>

      <Section spacing="spacious" tone="subtle">
        <div className="grid gap-12">
          <section aria-labelledby="case-study-results-title">
            <h2
              className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
              id="case-study-results-title"
            >
              {labels.results}
            </h2>
            <ul className="mt-7 grid gap-4 lg:grid-cols-2">
              {study.results.map((result) => (
                <li key={result.id}>
                  <Card as="div" className="h-full" variant="elevated">
                    <Badge
                      tone={
                        result.state === "documented" ? "success" : "warning"
                      }
                    >
                      {labels.resultState[result.state]}
                    </Badge>
                    <p className="mt-5 text-lg font-medium">
                      {localize(result.claim, locale)}
                    </p>
                    {result.metric ? (
                      <div className="mt-5 border-t border-[var(--color-border-subtle)] pt-5">
                        <p className="font-mono text-3xl font-semibold text-[var(--color-accent-secondary)]">
                          {result.metric.value}% {labels.metricImprovement}
                        </p>
                        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                          <span className="font-semibold">
                            {labels.metricAttribution}: {" "}
                          </span>
                          {localize(result.metric.attribution, locale)}
                        </p>
                      </div>
                    ) : null}
                  </Card>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="case-study-resources-title">
            <h2
              className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl"
              id="case-study-resources-title"
            >
              {labels.resources}
            </h2>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              <Surface padding="large">
                <h3 className="font-semibold">{labels.links}</h3>
                {study.links.length > 0 ? (
                  <ul className="mt-4 grid gap-3">
                    {study.links.map((link) => (
                      <li key={`${link.kind}-${link.href}`}>
                        <a
                          className="font-medium text-[var(--color-accent-secondary)] underline underline-offset-4"
                          href={link.href}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {localize(link.label, locale)}
                          <span className="sr-only">
                            {" "}({labels.externalLink})
                          </span>
                        </a>
                        <Badge
                          className="ml-3"
                          tone={
                            link.verification === "verified"
                              ? "success"
                              : "warning"
                          }
                        >
                          {labels.verification[link.verification]}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                    {labels.noLinks}
                  </p>
                )}
              </Surface>

              <Surface padding="large">
                <h3 className="font-semibold">{labels.media}</h3>
                {study.media.length > 0 ? (
                  <div className="mt-4 grid gap-5">
                    {study.media.map((media) => (
                      <figure key={media.id}>
                        <div className="relative aspect-[1054/658] overflow-hidden rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)]">
                          <Image
                            alt={localize(media.alt, locale)}
                            className="object-cover"
                            fill
                            sizes="(min-width: 1024px) 36rem, 90vw"
                            src={media.source}
                          />
                        </div>
                        <figcaption className="mt-3 text-sm text-[var(--color-text-secondary)]">
                          {localize(media.alt, locale)}
                        </figcaption>
                        {media.disclosureIds.map((id) => {
                          const disclosure = disclosureById.get(id);
                          return disclosure ? (
                            <p
                              className="mt-2 text-xs text-[var(--color-text-secondary)]"
                              key={id}
                            >
                              {localize(disclosure.text, locale)}
                            </p>
                          ) : null;
                        })}
                      </figure>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-[var(--color-text-secondary)]">
                    {labels.noMedia}
                  </p>
                )}
              </Surface>
            </div>
          </section>

          <section aria-labelledby="case-study-evidence-title">
            <h2
              className="text-2xl font-semibold tracking-[-0.025em]"
              id="case-study-evidence-title"
            >
              {labels.evidenceRegister}
            </h2>
            <div className="mt-5">
              <EvidenceList
                evidenceIds={study.evidence.map(({ id }) => id)}
                labels={labels}
                locale={locale}
                showHeading={false}
                study={study}
              />
            </div>
          </section>

          <section aria-labelledby="case-study-related-title">
            <h2
              className="text-2xl font-semibold tracking-[-0.025em]"
              id="case-study-related-title"
            >
              {labels.related}
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {study.relatedSlugs.map((slug) => {
                const related = getCaseStudy(slug);
                return (
                  <li key={slug}>
                    <a
                      className="flex min-h-[var(--target-min)] items-center justify-between rounded-[var(--radius-control)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-3 font-semibold hover:border-[var(--color-accent-secondary)]"
                      href={getCaseStudyPath(slug, locale)}
                    >
                      <span>{localize(related.title, locale)}</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <a
            className="inline-flex min-h-[var(--target-min)] w-fit items-center rounded-[var(--radius-control)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2 font-semibold hover:border-[var(--color-accent-secondary)]"
            href={`/${locale}/work`}
          >
            <span aria-hidden="true" className="mr-2">
              ←
            </span>
            {labels.backToWork}
          </a>
        </div>
      </Section>
    </article>
  );
}
