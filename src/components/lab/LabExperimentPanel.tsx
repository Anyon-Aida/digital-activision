"use client";

import { useId, useState } from "react";
import type { LabLocaleContent } from "@/content/lab";
import {
  EditorialSection,
  Surface,
  TechnicalAnnotation,
} from "@/components/ui";
import { cn } from "@/lib/cn";

type ArchitectureContent = LabLocaleContent["architecture"];
type ArchitectureView = ArchitectureContent["views"][number];
type ArchitectureNode = ArchitectureView["nodes"][number];
type NodeCategory = ArchitectureNode["category"];

type LabExperimentPanelProps = {
  architecture: ArchitectureContent;
  index: number;
  view: ArchitectureView;
};

const categoryStroke: Record<NodeCategory, string> = {
  client: "var(--color-signal)",
  server: "var(--color-accent)",
  data: "var(--color-success)",
  security: "var(--color-danger)",
  operations: "var(--color-warning)",
};

const categoryRadius: Record<NodeCategory, number> = {
  client: 28,
  server: 10,
  data: 3,
  security: 0,
  operations: 15,
};

function shortenDiagramLabel(label: string) {
  return label.length > 24 ? `${label.slice(0, 22)}…` : label;
}

function ExperimentDiagram({
  selectedNodeId,
  view,
}: {
  selectedNodeId: string;
  view: ArchitectureView;
}) {
  const generatedId = useId().replace(/:/g, "");
  const titleId = `${generatedId}-title`;
  const descriptionId = `${generatedId}-description`;
  const markerId = `${generatedId}-arrow`;
  const nodes = new Map(view.nodes.map((node) => [node.id, node]));

  return (
    <div className="hidden min-w-0 overflow-hidden border-y border-[var(--color-border-subtle)] bg-[var(--color-surface)] py-5 md:block">
      <svg
        aria-labelledby={`${titleId} ${descriptionId}`}
        className="h-auto w-full"
        role="img"
        viewBox="0 0 1000 560"
      >
        <title id={titleId}>{view.label}</title>
        <desc id={descriptionId}>{view.summary}</desc>
        <defs>
          <marker
            id={markerId}
            markerHeight="7"
            markerWidth="7"
            orient="auto-start-reverse"
            refX="9"
            refY="5"
            viewBox="0 0 10 10"
          >
            <path
              d="M 0 0 L 10 5 L 0 10 z"
              fill="var(--color-text-muted)"
            />
          </marker>
        </defs>

        {view.edges.map((edge) => {
          const from = nodes.get(edge.from);
          const to = nodes.get(edge.to);

          if (!from || !to) {
            return null;
          }

          return (
            <line
              key={`${edge.from}-${edge.to}`}
              markerEnd={`url(#${markerId})`}
              stroke="var(--color-text-muted)"
              strokeDasharray={
                view.id === "offline-sync" ? "9 7" : "5 5"
              }
              strokeWidth="2"
              x1={from.position.x * 10}
              x2={to.position.x * 10}
              y1={from.position.y * 5.6}
              y2={to.position.y * 5.6}
            />
          );
        })}

        {view.nodes.map((node) => {
          const selected = node.id === selectedNodeId;
          const x = node.position.x * 10;
          const y = node.position.y * 5.6;

          return (
            <g aria-hidden="true" key={node.id}>
              <rect
                fill={
                  selected
                    ? "var(--color-accent)"
                    : "var(--color-surface)"
                }
                height="62"
                rx={categoryRadius[node.category]}
                stroke={
                  selected
                    ? "var(--color-accent)"
                    : categoryStroke[node.category]
                }
                strokeDasharray={
                  node.category === "operations" ? "7 4" : undefined
                }
                strokeWidth={selected ? "4" : "2.5"}
                transform={
                  node.category === "security"
                    ? `rotate(45 ${x} ${y})`
                    : undefined
                }
                width={node.category === "security" ? "82" : "172"}
                x={
                  node.category === "security"
                    ? x - 41
                    : x - 86
                }
                y={y - 31}
              />
              <text
                fill={
                  selected
                    ? "var(--color-on-accent)"
                    : "var(--color-text-primary)"
                }
                fontSize="14"
                fontWeight="700"
                textAnchor="middle"
                x={x}
                y={y - 2}
              >
                {shortenDiagramLabel(node.label)}
              </text>
              <text
                fill={
                  selected
                    ? "var(--color-on-accent)"
                    : "var(--color-text-secondary)"
                }
                fontSize="11"
                textAnchor="middle"
                x={x}
                y={y + 18}
              >
                {node.category}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function CompleteTextView({
  architecture,
  view,
}: {
  architecture: ArchitectureContent;
  view: ArchitectureView;
}) {
  const nodeLabels = new Map(
    view.nodes.map((node) => [node.id, node.label]),
  );

  return (
    <details className="border-t border-[var(--color-border-subtle)] pt-5">
      <summary className="flex min-h-[var(--target-min)] cursor-pointer items-center font-semibold text-[var(--color-text-primary)] marker:text-[var(--color-accent)]">
        {architecture.fallbackTitle}
      </summary>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
        {architecture.fallbackSummary}
      </p>
      <div className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2">
        {view.nodes.map((node) => (
          <article
            className="border-t border-[var(--color-border-subtle)] pt-4"
            key={node.id}
          >
            <TechnicalAnnotation>
              {architecture.categoryLabels[node.category]}
            </TechnicalAnnotation>
            <h4 className="mt-2 font-semibold">{node.label}</h4>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              {node.summary}
            </p>
            <dl className="mt-4 space-y-3 text-sm leading-6">
              <div>
                <dt className="font-semibold">
                  {architecture.panelLabels.responsibilities}
                </dt>
                <dd className="text-[var(--color-text-secondary)]">
                  {node.responsibilities.join(" ")}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">
                  {architecture.panelLabels.flow}
                </dt>
                <dd className="text-[var(--color-text-secondary)]">
                  {node.flow}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">
                  {architecture.panelLabels.security}
                </dt>
                <dd className="text-[var(--color-text-secondary)]">
                  {node.security}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">
                  {architecture.panelLabels.reliability}
                </dt>
                <dd className="text-[var(--color-text-secondary)]">
                  {node.reliability}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <h4 className="mt-8 font-semibold">{architecture.edgeListTitle}</h4>
      <ol className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-secondary)]">
        {view.edges.map((edge) => (
          <li key={`${edge.from}-${edge.to}`}>
            <span className="font-medium text-[var(--color-text-primary)]">
              {nodeLabels.get(edge.from)} → {nodeLabels.get(edge.to)}
            </span>{" "}
            — {edge.label} ({edge.protocol})
          </li>
        ))}
      </ol>
    </details>
  );
}

export function LabExperimentPanel({
  architecture,
  index,
  view,
}: LabExperimentPanelProps) {
  const [selectedNodeId, setSelectedNodeId] = useState(
    view.nodes[0]?.id ?? "",
  );
  const selectedNode =
    view.nodes.find(({ id }) => id === selectedNodeId) ?? view.nodes[0];
  const headingId =
    index === 0
      ? "architecture-explorer-title"
      : `lab-${view.id}-title`;
  const reversed = view.id === "approval-workflow";

  if (!selectedNode) {
    return null;
  }

  return (
    <EditorialSection
      aria-labelledby={headingId}
      id={view.id}
      rule="bottom"
      tone={index === 1 ? "subtle" : "light"}
    >
      <header className="grid gap-6 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
        <TechnicalAnnotation>
          {String(index + 1).padStart(2, "0")} / 03
        </TechnicalAnnotation>
        <div>
          <h2
            className="text-[length:var(--font-size-section)] font-semibold leading-[1] tracking-[var(--letter-spacing-heading)]"
            id={headingId}
          >
            {view.label}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">
            {view.summary}
          </p>
        </div>
      </header>

      <div className="mt-12 grid gap-8 xl:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] xl:gap-12">
        <div className={cn(reversed && "xl:order-2")}>
          <ExperimentDiagram
            selectedNodeId={selectedNode.id}
            view={view}
          />
          <div
            aria-label={architecture.nodeSelectorLabel}
            className="mt-6"
            role="group"
          >
            <p className="text-sm font-semibold text-[var(--color-text-muted)]">
              {architecture.nodeSelectorLabel}
            </p>
            <div className="mt-3 grid border-t border-[var(--color-border-strong)] sm:grid-cols-2">
              {view.nodes.map((node) => {
                const selected = node.id === selectedNode.id;

                return (
                  <button
                    aria-pressed={selected}
                    className={cn(
                      "min-h-[var(--target-min)] border-b border-[var(--color-border-subtle)] px-4 py-4 text-left transition-colors duration-[var(--motion-duration-fast)]",
                      selected
                        ? "border-l-2 border-l-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                        : "hover:bg-[var(--color-surface-subtle)]",
                    )}
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    type="button"
                  >
                    <span className="block font-mono text-[length:var(--font-size-meta)] font-semibold uppercase tracking-[0.1em] text-[var(--color-accent-secondary)]">
                      {architecture.categoryLabels[node.category]}
                    </span>
                    <span className="mt-1 block font-semibold">
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <Surface
          aria-live="polite"
          as="article"
          className={cn(reversed && "xl:order-1")}
          padding="large"
          radius="card"
          variant="elevated"
        >
          <TechnicalAnnotation>
            {architecture.selectedNodeLabel}
          </TechnicalAnnotation>
          <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
            {architecture.categoryLabels[selectedNode.category]}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em]">
            {selectedNode.label}
          </h3>
          <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
            {selectedNode.summary}
          </p>
          <dl className="mt-7 space-y-5 text-sm leading-6">
            <div>
              <dt className="font-semibold">
                {architecture.panelLabels.responsibilities}
              </dt>
              <dd className="mt-1 text-[var(--color-text-secondary)]">
                {selectedNode.responsibilities.join(" ")}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">
                {architecture.panelLabels.flow}
              </dt>
              <dd className="mt-1 text-[var(--color-text-secondary)]">
                {selectedNode.flow}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">
                {architecture.panelLabels.security}
              </dt>
              <dd className="mt-1 text-[var(--color-text-secondary)]">
                {selectedNode.security}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">
                {architecture.panelLabels.reliability}
              </dt>
              <dd className="mt-1 text-[var(--color-text-secondary)]">
                {selectedNode.reliability}
              </dd>
            </div>
          </dl>
        </Surface>
      </div>

      <div className="mt-10">
        <CompleteTextView architecture={architecture} view={view} />
      </div>
    </EditorialSection>
  );
}
