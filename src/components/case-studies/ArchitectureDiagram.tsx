import type { CaseStudy, CaseStudyLocale } from "@/content/case-studies";
import { localize } from "@/content/case-studies";
import { Badge, Surface } from "@/components/ui";
import type { CaseStudyUi } from "./labels";

type ArchitectureDiagramProps = {
  labels: CaseStudyUi;
  locale: CaseStudyLocale;
  study: CaseStudy;
};

const diagramWidth = 1_000;
const diagramCenterY = 180;

export function ArchitectureDiagram({
  labels,
  locale,
  study,
}: ArchitectureDiagramProps) {
  const { architecture } = study;
  const disclosureById = new Map(
    study.disclosures.map((disclosure) => [disclosure.id, disclosure]),
  );

  if (architecture.nodes.length === 0) {
    return (
      <Surface
        as="aside"
        className="mt-6"
        padding="small"
        variant="subtle"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Badge tone="warning">
            {labels.architectureState[architecture.state]}
          </Badge>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {labels.architectureUnavailable}
          </p>
        </div>
        {architecture.disclosureIds.map((id) => {
          const disclosure = disclosureById.get(id);
          return disclosure ? (
            <p
              className="mt-3 text-sm text-[var(--color-text-secondary)]"
              key={id}
            >
              {localize(disclosure.text, locale)}
            </p>
          ) : null;
        })}
      </Surface>
    );
  }

  const xByNode = new Map(
    architecture.nodes.map((node, index) => [
      node.id,
      ((index + 0.5) * diagramWidth) / architecture.nodes.length,
    ]),
  );
  const nodeById = new Map(
    architecture.nodes.map((node) => [node.id, node]),
  );

  return (
    <figure className="mt-7 rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-semibold text-[var(--color-text-primary)]">
          {labels.architectureTitle}
        </span>
        <Badge tone={architecture.state === "conceptual" ? "warning" : "neutral"}>
          {labels.architectureState[architecture.state]}
        </Badge>
      </figcaption>

      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1000 360"
        className="mt-4 h-auto w-full text-[var(--color-accent-secondary)]"
      >
        <defs>
          <marker
            id="case-study-flow-arrow"
            markerHeight="10"
            markerWidth="10"
            orient="auto"
            refX="8"
            refY="5"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="currentColor" />
          </marker>
        </defs>

        {architecture.edges.map((edge, index) => {
          const fromX = xByNode.get(edge.from);
          const toX = xByNode.get(edge.to);

          if (fromX === undefined || toX === undefined) {
            return null;
          }

          const direction = Math.sign(toX - fromX) || 1;
          const startX = fromX + direction * 44;
          const endX = toX - direction * 44;
          const distance = Math.abs(
            architecture.nodes.findIndex(({ id }) => id === edge.to) -
              architecture.nodes.findIndex(({ id }) => id === edge.from),
          );
          const path =
            distance <= 1
              ? `M ${startX} ${diagramCenterY} L ${endX} ${diagramCenterY}`
              : `M ${startX} ${diagramCenterY} Q ${(startX + endX) / 2} ${
                  index % 2 === 0 ? 58 : 302
                } ${endX} ${diagramCenterY}`;

          return (
            <path
              d={path}
              fill="none"
              key={`${edge.from}-${edge.to}-${index}`}
              markerEnd="url(#case-study-flow-arrow)"
              stroke="currentColor"
              strokeDasharray={distance > 1 ? "8 8" : undefined}
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}

        {architecture.nodes.map((node, index) => {
          const x = xByNode.get(node.id) as number;
          return (
            <g key={node.id}>
              <circle
                cx={x}
                cy={diagramCenterY}
                fill="var(--color-surface-elevated)"
                r="38"
                stroke="currentColor"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
              <text
                dominantBaseline="central"
                fill="var(--color-text-primary)"
                fontFamily="var(--font-family-mono)"
                fontSize="25"
                fontWeight="700"
                textAnchor="middle"
                x={x}
                y={diagramCenterY}
              >
                {String(index + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-5 border-t border-[var(--color-border-subtle)] pt-5">
        <h3 className="font-semibold text-[var(--color-text-primary)]">
          {labels.architectureFallback}
        </h3>
        <h4 className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
          {labels.architectureNodes}
        </h4>
        <ol className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {architecture.nodes.map((node, index) => (
            <li
              className="flex min-w-0 gap-3 rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-3 text-sm"
              key={node.id}
            >
              <span className="font-mono text-[var(--color-accent-secondary)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{localize(node.label, locale)}</span>
            </li>
          ))}
        </ol>

        <h4 className="mt-6 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
          {labels.architectureConnections}
        </h4>
        <ul className="mt-3 grid gap-2">
          {architecture.edges.map((edge, index) => {
            const from = nodeById.get(edge.from);
            const to = nodeById.get(edge.to);

            if (!from || !to) {
              return null;
            }

            return (
              <li className="text-sm text-[var(--color-text-secondary)]" key={`${edge.from}-${edge.to}-${index}`}>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {localize(from.label, locale)}
                </span>{" "}
                <span aria-hidden="true">→</span>{" "}
                <span className="sr-only">{labels.connection}</span>
                <span className="font-medium text-[var(--color-text-primary)]">
                  {localize(to.label, locale)}
                </span>
                {edge.label ? ` · ${localize(edge.label, locale)}` : null}
              </li>
            );
          })}
        </ul>
      </div>

      {architecture.disclosureIds.length > 0 ? (
        <aside className="mt-6 border-l-2 border-[var(--color-warning)] pl-4">
          {architecture.disclosureIds.map((id) => {
            const disclosure = disclosureById.get(id);
            return disclosure ? (
              <p
                className="text-sm text-[var(--color-text-secondary)]"
                key={id}
              >
                {localize(disclosure.text, locale)}
              </p>
            ) : null;
          })}
        </aside>
      ) : null}
    </figure>
  );
}
