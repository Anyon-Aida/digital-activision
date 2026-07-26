import type { ReactNode } from "react";
import type { HomeContent } from "@/content/home";
import type { getFeaturedCaseStudies } from "@/content/case-studies";
import type { Locale } from "@/i18n/routing";
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  Section,
  Surface,
} from "@/components/ui";
import { SystemMap } from "./SystemMap";
import { DeferredContactForm } from "./DeferredContactForm";
import { LegacyStudioAnchorRedirect } from "@/components/studio/LegacyStudioAnchorRedirect";

type DeveloperHomepageProps = {
  content: HomeContent;
  featuredProjects: ReturnType<typeof getFeaturedCaseStudies>;
  locale: Locale;
};

type SectionHeadingProps = {
  description: string;
  eyebrow: string;
  title: string;
};

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-secondary)]">
      {children}
    </p>
  );
}

function SectionHeading({ description, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-[var(--color-text-secondary)]">{description}</p>
    </div>
  );
}

function TagList({ items }: { items: readonly string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item}>
          <Badge>{item}</Badge>
        </li>
      ))}
    </ul>
  );
}

export function DeveloperHomepage({
  content,
  featuredProjects,
  locale,
}: DeveloperHomepageProps) {
  return (
    <>
      <LegacyStudioAnchorRedirect locale={locale} />
      <Section
        className="relative isolate overflow-hidden border-b border-[var(--color-border-subtle)]"
        id="hero"
        spacing="spacious"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-44 -z-10 size-[32rem] rounded-full bg-[radial-gradient(circle,var(--color-accent-soft),transparent_68%)] opacity-90 blur-2xl"
        />
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-16">
          <div>
            <Eyebrow>{content.hero.eyebrow}</Eyebrow>
            <p className="mt-7 font-mono text-sm uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
              {content.hero.name} · {content.hero.role}
            </p>
            <h1 className="mt-5 max-w-5xl text-[clamp(2.9rem,7vw,6.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-balance">
              {content.hero.headline}
            </h1>
            <div className="mt-8 max-w-3xl space-y-4 text-lg text-[var(--color-text-secondary)] sm:text-xl">
              {content.hero.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`/${locale}/work`} size="large">
                {content.hero.primaryCta}
              </ButtonLink>
              <ButtonLink
                href={`/${locale}/lab`}
                size="large"
                variant="secondary"
              >
                {content.hero.secondaryCta}
              </ButtonLink>
            </div>
          </div>

          <Surface className="relative overflow-hidden" padding="large" variant="elevated">
            <span
              aria-hidden="true"
              className="absolute right-6 top-5 font-mono text-5xl text-[var(--color-text-secondary)]"
            >
              01
            </span>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
              {content.hero.stackLabel}
            </p>
            <TagList items={content.hero.stack} />
            <div className="mt-7 border-t border-[var(--color-border-subtle)] pt-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  className="font-semibold text-[var(--color-accent-secondary)] underline-offset-4 hover:underline"
                  href="https://github.com/Anyon-Aida"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {content.hero.githubLabel} ↗
                </a>
                <a
                  className="font-semibold text-[var(--color-accent-secondary)] underline-offset-4 hover:underline"
                  href="https://www.linkedin.com/company/digital-activision"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {content.hero.linkedInLabel} ↗
                </a>
              </div>
              <button
                className="mt-5 inline-flex min-h-[var(--target-min)] cursor-not-allowed items-center rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] px-4 text-sm text-[var(--color-text-secondary)]"
                disabled
                title={content.hero.cvUnavailable}
                type="button"
              >
                CV · {content.chrome.unavailable}
              </button>
              <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
                {content.hero.cvUnavailable}
              </p>
            </div>
          </Surface>
        </div>
      </Section>

      <section
        aria-labelledby="credibility-title"
        className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] py-8"
      >
        <Container>
          <h2 className="sr-only" id="credibility-title">
            {content.credibility.label}
          </h2>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-secondary)]">
            {content.credibility.label}
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {content.credibility.items.map((item, index) => (
              <li className="border-l border-[var(--color-border-strong)] pl-4 text-sm" key={item}>
                <span className="mb-2 block font-mono text-xs text-[var(--color-accent-secondary)]">
                  0{index + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <SystemMap content={content.systemMap} />

      <Section
        className="border-y border-[var(--color-border-subtle)]"
        id="featured-work"
        spacing="spacious"
        tone="subtle"
      >
        <SectionHeading
          description={content.featuredWork.description}
          eyebrow={content.featuredWork.eyebrow}
          title={content.featuredWork.title}
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <Card className="group flex h-full flex-col" key={project.slug} variant="elevated">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <Badge tone={project.visibility === "public" ? "success" : "warning"}>
                    {project.statusLabel}
                  </Badge>
                  <Badge>{project.visibilityLabel}</Badge>
                </div>
                <span className="font-mono text-sm text-[var(--color-text-secondary)]">0{index + 1}</span>
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                {project.title}
              </h3>
              <dl className="mt-7 grid gap-5 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                    {content.featuredWork.problemLabel}
                  </dt>
                  <dd className="mt-2">{project.problem}</dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                    {content.featuredWork.ownershipLabel}
                  </dt>
                  <dd className="mt-2">{project.ownership}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
                    {content.featuredWork.resultLabel}
                  </dt>
                  <dd className="mt-2">{project.result}</dd>
                </div>
              </dl>
              <div className="mt-auto pt-7">
                <TagList items={project.technologies.map(({ name }) => name)} />
                <a
                  className="mt-5 inline-flex min-h-[var(--target-min)] items-center border-t border-[var(--color-border-subtle)] pt-5 font-semibold text-[var(--color-accent-secondary)] underline-offset-4 hover:underline"
                  href={project.href}
                >
                  {content.featuredWork.actionLabel} →
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="capabilities" spacing="spacious">
        <SectionHeading
          description={content.capabilities.description}
          eyebrow={content.capabilities.eyebrow}
          title={content.capabilities.title}
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] md:grid-cols-2">
          {content.capabilities.groups.map((group) => (
            <article className="bg-[var(--color-surface)] p-6 sm:p-8" key={group.title}>
              <h3 className="text-xl font-semibold">{group.title}</h3>
              <ul className="mt-5 grid gap-2 text-sm text-[var(--color-text-secondary)] sm:grid-cols-2">
                {group.items.map((item) => (
                  <li className="flex gap-2" key={item}>
                    <span aria-hidden="true" className="text-[var(--color-accent-secondary)]">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                className="mt-7 inline-flex min-h-[var(--target-min)] items-center font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-secondary)] underline-offset-4 hover:underline"
                href={group.evidenceHref}
              >
                {content.capabilities.evidenceLabel}: {group.evidence}
              </a>
            </article>
          ))}
        </div>
      </Section>

      <Section
        className="border-y border-[var(--color-border-subtle)]"
        id="experience"
        spacing="spacious"
        tone="subtle"
      >
        <SectionHeading
          description={content.experience.description}
          eyebrow={content.experience.eyebrow}
          title={content.experience.title}
        />
        <ol className="relative mt-12 grid gap-5 before:absolute before:bottom-8 before:left-[1.65rem] before:top-8 before:w-px before:bg-[var(--color-border-strong)] md:before:left-[2.15rem]">
          {content.experience.entries.map((entry, index) => (
            <li className="relative grid grid-cols-[3.4rem_minmax(0,1fr)] gap-4 md:grid-cols-[4.4rem_minmax(0,1fr)]" key={`${entry.organization}-${index}`}>
              <span className="relative z-10 grid size-14 place-items-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-page)] font-mono text-xs text-[var(--color-accent-secondary)] md:size-[4.4rem]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <Card className="min-w-0" variant="outlined">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold sm:text-2xl">
                    {entry.organization}
                    {entry.location ? <span className="text-[var(--color-text-secondary)]"> · {entry.location}</span> : null}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
                    {content.experience.periodLabel}: {entry.period}
                  </span>
                </div>
                <dl className="mt-5 grid gap-4 text-sm md:grid-cols-2">
                  <div>
                    <dt className="font-semibold text-[var(--color-text-secondary)]">{content.experience.roleLabel}</dt>
                    <dd className="mt-1">{entry.role}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[var(--color-text-secondary)]">{content.experience.resultLabel}</dt>
                    <dd className="mt-1">{entry.result}</dd>
                  </div>
                </dl>
                <p className="mt-5 text-sm text-[var(--color-text-secondary)]">{entry.scope}</p>
                <div className="mt-5">
                  <TagList items={entry.stack} />
                </div>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="standards" spacing="spacious">
        <SectionHeading
          description={content.standards.description}
          eyebrow={content.standards.eyebrow}
          title={content.standards.title}
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.standards.items.map((item) => (
            <li key={item.title}>
              <Card as="div" className="h-full" variant="outlined">
                <Badge tone={item.state === "implemented" ? "success" : "warning"}>
                  {item.state === "implemented"
                    ? content.standards.implementedLabel
                    : content.standards.plannedLabel}
                </Badge>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">{item.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        className="border-y border-[var(--color-border-subtle)]"
        id="studio"
        spacing="spacious"
        tone="subtle"
      >
        <Surface className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end" padding="large" variant="elevated">
          <div className="max-w-3xl">
            <Eyebrow>{content.studio.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-5xl">
              {content.studio.title}
            </h2>
            <p className="mt-5 text-[var(--color-text-secondary)]">{content.studio.description}</p>
            <p className="mt-3 text-xs text-[var(--color-text-secondary)]">{content.studio.migrationNote}</p>
          </div>
          <ButtonLink href={`/${locale}/studio`} size="large" variant="secondary">
            {content.studio.action}
          </ButtonLink>
        </Surface>
      </Section>

      <Section id="contact" spacing="spacious">
        <SectionHeading
          description={content.contact.description}
          eyebrow={content.contact.eyebrow}
          title={content.contact.title}
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.55fr)] lg:items-start">
          <DeferredContactForm content={content.contact} locale={locale} />
          <Surface padding="large" variant="subtle">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
              {content.contact.topicsLabel}
            </h3>
            <ul className="mt-5 grid gap-3">
              {content.contact.topicOptions.map((topic) => (
                <li className="flex gap-3 border-b border-[var(--color-border-subtle)] pb-3 last:border-0 last:pb-0" key={topic.value}>
                  <span aria-hidden="true" className="text-[var(--color-accent-secondary)]">→</span>
                  {topic.label}
                </li>
              ))}
            </ul>
          </Surface>
        </div>
      </Section>
    </>
  );
}
