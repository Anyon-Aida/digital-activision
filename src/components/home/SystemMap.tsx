"use client";

import { useId, useState } from "react";
import type { SystemMapContent } from "@/content/home";
import { cn } from "@/lib/cn";
import { Section, Surface } from "@/components/ui";

export type SystemMapProps = {
  content: SystemMapContent;
};

export function SystemMap({ content }: SystemMapProps) {
  const headingId = useId();
  const mapLabelId = useId();
  const detailId = useId();
  const markerId = `${useId().replace(/[^a-zA-Z0-9_-]/g, "")}-arrow`;
  const [selectedId, setSelectedId] = useState(
    () => content.nodes.at(0)?.id ?? "",
  );
  const selectedNode =
    content.nodes.find((node) => node.id === selectedId) ??
    content.nodes.at(0);

  return (
    <Section
      id="system-map"
      aria-labelledby={headingId}
      container="wide"
      tone="dark"
    >
      <div className="grid gap-8 lg:gap-10">
        <header className="max-w-[var(--layout-readable-max)]">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-secondary)]">
            {content.eyebrow}
          </p>
          <h2
            id={headingId}
            className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl"
          >
            {content.title}
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)]">
            {content.description}
          </p>
        </header>

        <Surface
          variant="inverse"
          padding="large"
          radius="card"
          className="grid gap-6 lg:gap-8"
        >
          <figure aria-labelledby={mapLabelId} className="grid gap-5">
            <figcaption
              id={mapLabelId}
              className="font-mono text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]"
            >
              {content.conceptualLabel}
            </figcaption>

            <div className="relative min-w-0">
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 40 700"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-y-6 left-1/2 h-[calc(100%-3rem)] w-8 -translate-x-1/2 text-[var(--color-accent-secondary)] lg:hidden"
              >
                <defs>
                  <marker
                    id={`${markerId}-vertical`}
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M 0 0 L 8 4 L 0 8 Z" fill="currentColor" />
                  </marker>
                </defs>
                <path
                  d="M 20 20 V 670"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="7 8"
                  vectorEffect="non-scaling-stroke"
                  markerEnd={`url(#${markerId}-vertical)`}
                />
              </svg>

              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 700 80"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-x-0 top-3 hidden h-20 w-full text-[var(--color-accent-secondary)] lg:block"
              >
                <defs>
                  <marker
                    id={`${markerId}-horizontal`}
                    markerWidth="8"
                    markerHeight="8"
                    refX="6"
                    refY="4"
                    orient="auto"
                  >
                    <path d="M 0 0 L 8 4 L 0 8 Z" fill="currentColor" />
                  </marker>
                </defs>
                <path
                  d="M 50 40 H 650"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="7 8"
                  vectorEffect="non-scaling-stroke"
                  markerEnd={`url(#${markerId}-horizontal)`}
                />
              </svg>

              <ol className="relative grid min-w-0 gap-3 lg:grid-cols-7 lg:gap-2">
                {content.nodes.map((node, index) => {
                  const isSelected = node.id === selectedNode?.id;

                  return (
                    <li key={node.id} className="min-w-0">
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        aria-controls={detailId}
                        onClick={() => setSelectedId(node.id)}
                        className={cn(
                          "relative z-10 flex min-h-24 w-full min-w-0 flex-col items-start gap-1 rounded-[var(--radius-surface)] border px-4 py-3 text-left transition-[border-color,background-color,transform] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-standard)] motion-safe:hover:-translate-y-0.5 motion-reduce:transform-none lg:min-h-36 lg:px-3",
                          isSelected
                            ? "border-[var(--color-accent-secondary)] bg-[var(--color-accent-soft)]"
                            : "border-[var(--color-border-strong)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-accent-secondary)]",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="inline-flex min-h-7 min-w-7 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-accent)] px-2 font-mono text-xs font-bold text-[var(--color-on-accent)]"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-1 break-words font-semibold leading-tight text-[var(--color-text-primary)]">
                          {node.label}
                        </span>
                        <span className="break-words text-sm leading-snug text-[var(--color-text-secondary)]">
                          {node.summary}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </figure>

          {selectedNode ? (
            <div
              id={detailId}
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className="rounded-[var(--radius-surface)] border border-[var(--color-border-strong)] bg-[var(--color-surface-subtle)] p-5 sm:p-6"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-accent-secondary)]">
                {content.detailLabel}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-[var(--color-text-primary)]">
                {selectedNode.label}
              </h3>
              <p className="mt-2 max-w-[var(--layout-readable-max)] text-[var(--color-text-secondary)]">
                {selectedNode.detail}
              </p>
            </div>
          ) : null}
        </Surface>

        <div aria-labelledby={`${headingId}-fallback`} className="grid gap-4">
          <h3
            id={`${headingId}-fallback`}
            className="text-xl font-semibold text-[var(--color-text-primary)] sm:text-2xl"
          >
            {content.fallbackTitle}
          </h3>
          <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {content.nodes.map((node, index) => (
              <li
                key={node.id}
                className="min-w-0 rounded-[var(--radius-surface)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-5"
              >
                <p className="font-mono text-xs font-semibold text-[var(--color-accent-secondary)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-2 break-words font-semibold text-[var(--color-text-primary)]">
                  {node.label}
                </h4>
                <p className="mt-1 text-sm font-medium text-[var(--color-text-muted)]">
                  {node.summary}
                </p>
                <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
                  {node.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
