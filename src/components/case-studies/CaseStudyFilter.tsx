"use client";

import { useMemo, useState } from "react";
import type { getCaseStudyCards } from "@/content/case-studies";
import { Badge, Card } from "@/components/ui";
import type { CaseStudyUi } from "./labels";

type CaseStudyFilterProps = {
  cards: ReturnType<typeof getCaseStudyCards>;
  labels: CaseStudyUi;
};

type Filter = "all" | "public" | "anonymized" | "in-progress";

export function CaseStudyFilter({ cards, labels }: CaseStudyFilterProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const filters: readonly { id: Filter; label: string }[] = [
    { id: "all", label: labels.filterAll },
    { id: "public", label: labels.filterPublic },
    { id: "anonymized", label: labels.filterAnonymized },
    { id: "in-progress", label: labels.filterInProgress },
  ];
  const visibleCards = useMemo(
    () =>
      cards.filter((card) => {
        if (activeFilter === "all") return true;
        if (activeFilter === "in-progress") return card.status === activeFilter;
        return card.visibility === activeFilter;
      }),
    [activeFilter, cards],
  );

  return (
    <div className="mt-12">
      <div aria-label={labels.filterLabel} className="flex flex-wrap gap-2" role="group">
        {filters.map((filter) => (
          <button
            aria-pressed={activeFilter === filter.id}
            className="inline-flex min-h-[var(--target-min)] items-center rounded-[var(--radius-pill)] border border-[var(--color-border-strong)] px-4 text-sm font-semibold transition-colors hover:bg-[var(--color-surface-subtle)] aria-pressed:border-[var(--color-accent-secondary)] aria-pressed:bg-[var(--color-accent-soft)] aria-pressed:text-[var(--color-text-primary)]"
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-[var(--color-text-secondary)]">
        {labels.filterResult.replace("{count}", String(visibleCards.length))}
      </p>

      <ol className="mt-7 grid gap-5 lg:grid-cols-2">
        {visibleCards.map((card, index) => (
          <li className="min-w-0" key={card.slug}>
            <Card className="flex h-full min-w-0 flex-col" variant="elevated">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <Badge tone={card.status === "production" ? "success" : "warning"}>
                    {labels.status[card.status]}
                  </Badge>
                  <Badge>{labels.visibility[card.visibility]}</Badge>
                </div>
                <span className="font-mono text-sm text-[var(--color-text-secondary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h2 className="mt-7 text-2xl font-semibold tracking-[-0.025em] sm:text-3xl">
                <a
                  className="underline decoration-[var(--color-border-strong)] underline-offset-4 transition-colors hover:decoration-[var(--color-accent-secondary)]"
                  href={card.href}
                >
                  {card.title}
                </a>
              </h2>
              <p className="mt-4 text-[var(--color-text-secondary)]">{card.summary}</p>

              <dl className="mt-7">
                <div>
                  <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                    {labels.role}
                  </dt>
                  <dd className="mt-2 text-sm">{card.role}</dd>
                </div>
              </dl>

              <div className="mt-7">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                  {labels.technologies}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {card.technologies.map((technology) => (
                    <li key={technology.name}>
                      <Badge
                        tone={technology.state === "documented" ? "neutral" : "warning"}
                        title={labels.technologyState[technology.state]}
                      >
                        {technology.name}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-8">
                <a
                  className="inline-flex min-h-[var(--target-min)] items-center rounded-[var(--radius-control)] border border-[var(--color-border-strong)] px-4 py-2 font-semibold text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-accent-secondary)] hover:bg-[var(--color-surface-subtle)]"
                  href={card.href}
                >
                  {labels.readCaseStudy}
                  <span aria-hidden="true" className="ml-2">→</span>
                </a>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
