"use client";

import { useId, useState } from "react";
import type { LabLocaleContent } from "@/content/lab";
import { Badge, Card, Section, Surface } from "@/components/ui";

type ArchitectureContent = LabLocaleContent["architecture"];
type PermissionContent = LabLocaleContent["permissions"];
type ArchitectureView = ArchitectureContent["views"][number];
type ArchitectureNode = ArchitectureView["nodes"][number];
type NodeCategory = ArchitectureNode["category"];
type RoleId = PermissionContent["roles"][number]["id"];

type ArchitectureExplorerProps = {
  architecture: ArchitectureContent;
  permissions: PermissionContent;
};

const categoryStroke: Record<NodeCategory, string> = {
  client: "var(--color-focus-ring)",
  server: "var(--color-accent)",
  data: "var(--color-success)",
  security: "var(--color-danger)",
  operations: "var(--color-warning)",
};

function shortenDiagramLabel(label: string) {
  return label.length > 24 ? `${label.slice(0, 22)}…` : label;
}

function ArchitectureDiagram({
  view,
  selectedNodeId,
}: {
  view: ArchitectureView;
  selectedNodeId: string;
}) {
  const generatedId = useId().replace(/:/g, "");
  const titleId = `architecture-title-${generatedId}`;
  const descriptionId = `architecture-description-${generatedId}`;
  const markerId = `architecture-arrow-${generatedId}`;
  const nodes = new Map(view.nodes.map((node) => [node.id, node]));

  return (
    <div className="hidden overflow-x-auto rounded-[var(--radius-surface)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-4 md:block">
      <svg
        viewBox="0 0 1000 560"
        className="min-w-[720px]"
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
      >
        <title id={titleId}>{`${view.label}: ${view.summary}`}</title>
        <desc id={descriptionId}>{view.disclosure}</desc>
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-text-muted)" />
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
              x1={from.position.x * 10}
              y1={from.position.y * 5.6}
              x2={to.position.x * 10}
              y2={to.position.y * 5.6}
              stroke="var(--color-text-muted)"
              strokeWidth="2"
              strokeDasharray="6 5"
              markerEnd={`url(#${markerId})`}
            />
          );
        })}

        {view.nodes.map((node) => {
          const selected = node.id === selectedNodeId;
          const x = node.position.x * 10;
          const y = node.position.y * 5.6;

          return (
            <g key={node.id} aria-hidden="true">
              <rect
                x={x - 84}
                y={y - 30}
                width="168"
                height="60"
                rx="13"
                fill={selected ? "var(--color-accent)" : "var(--color-surface)"}
                stroke={selected ? "var(--color-accent)" : categoryStroke[node.category]}
                strokeWidth={selected ? "4" : "3"}
              />
              <text
                x={x}
                y={y - 3}
                textAnchor="middle"
                fill={
                  selected
                    ? "var(--color-on-accent)"
                    : "var(--color-text-primary)"
                }
                fontSize="14"
                fontWeight="700"
              >
                {shortenDiagramLabel(node.label)}
              </text>
              <text
                x={x}
                y={y + 17}
                textAnchor="middle"
                fill={
                  selected
                    ? "var(--color-on-accent)"
                    : "var(--color-text-secondary)"
                }
                fontSize="11"
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

function TextArchitectureFallback({
  content,
  views,
}: {
  content: ArchitectureContent;
  views: ArchitectureView[];
}) {
  return (
    <section
      className="mt-8 rounded-[var(--radius-surface)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-5 sm:p-7"
      aria-labelledby="architecture-text-fallback-title"
    >
      <h3 id="architecture-text-fallback-title" className="text-xl font-bold">
        {content.fallbackTitle}
      </h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
        {content.fallbackSummary}
      </p>

      <div className="mt-6 space-y-4">
        {views.map((view) => {
          const nodeLabels = new Map(
            view.nodes.map((node) => [node.id, node.label]),
          );

          return (
            <details
              key={view.id}
              className="rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] p-4"
            >
              <summary className="cursor-pointer rounded-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus-ring)]">
                {view.label}
              </summary>
              <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                {view.summary}
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                {view.disclosure}
              </p>

              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                {view.nodes.map((node) => (
                  <article
                    key={node.id}
                    className="rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] p-4"
                  >
                    <Badge tone="neutral">
                      {content.categoryLabels[node.category]}
                    </Badge>
                    <h4 className="mt-3 font-bold">{node.label}</h4>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                      {node.summary}
                    </p>
                    <dl className="mt-4 space-y-3 text-sm leading-6">
                      <div>
                        <dt className="font-semibold">
                          {content.panelLabels.responsibilities}
                        </dt>
                        <dd className="text-[var(--color-text-secondary)]">
                          {node.responsibilities.join(" ")}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold">
                          {content.panelLabels.flow}
                        </dt>
                        <dd className="text-[var(--color-text-secondary)]">
                          {node.flow}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold">
                          {content.panelLabels.security}
                        </dt>
                        <dd className="text-[var(--color-text-secondary)]">
                          {node.security}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-semibold">
                          {content.panelLabels.reliability}
                        </dt>
                        <dd className="text-[var(--color-text-secondary)]">
                          {node.reliability}
                        </dd>
                      </div>
                    </dl>
                  </article>
                ))}
              </div>

              <h4 className="mt-8 font-bold">{content.edgeListTitle}</h4>
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
        })}
      </div>
    </section>
  );
}

function PermissionMatrix({ content }: { content: PermissionContent }) {
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId>(
    content.roles[0].id,
  );
  const selectedRole =
    content.roles.find(({ id }) => id === selectedRoleId) ?? content.roles[0];

  return (
    <Section tone="subtle" aria-labelledby="permission-matrix-title">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {content.eyebrow}
          </p>
          <h2
            id="permission-matrix-title"
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

      <div className="mt-10" role="group" aria-label={content.roleSelectorLabel}>
        <p className="text-sm font-semibold text-[var(--color-text-muted)]">
          {content.roleSelectorLabel}
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {content.roles.map((role) => {
            const selected = role.id === selectedRole.id;

            return (
              <button
                key={role.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelectedRoleId(role.id)}
                className={`min-h-11 rounded-[var(--radius-control)] border px-4 py-2 text-sm font-semibold transition-colors duration-[var(--motion-duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] ${
                  selected
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-on-accent)]"
                    : "border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent-soft)]"
                }`}
              >
                {role.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8" aria-live="polite">
        <h3 className="text-xl font-bold">
          {content.selectedRoleLabel}: {selectedRole.label}
        </h3>
        <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {content.actions.map((action) => {
            const allowed = action.allowedRoles.includes(selectedRole.id);

            return (
              <Card as="li" key={action.id} variant="outlined">
                <Badge tone={allowed ? "success" : "neutral"}>
                  {allowed ? content.allowedLabel : content.deniedLabel}
                </Badge>
                <h4 className="mt-3 font-bold">{action.label}</h4>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {action.description}
                </p>
              </Card>
            );
          })}
        </ul>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold">{content.fullMatrixTitle}</h3>
        <div className="mt-4 overflow-x-auto rounded-[var(--radius-surface)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-strong)]">
                <th scope="col" className="p-4 font-bold">
                  {content.actionHeader}
                </th>
                {content.roles.map((role) => (
                  <th key={role.id} scope="col" className="p-4 text-center font-bold">
                    {role.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.actions.map((action) => (
                <tr
                  key={action.id}
                  className="border-b border-[var(--color-border-subtle)] last:border-b-0"
                >
                  <th scope="row" className="p-4 font-medium">
                    {action.label}
                  </th>
                  {content.roles.map((role) => {
                    const allowed = action.allowedRoles.includes(role.id);

                    return (
                      <td key={role.id} className="p-4 text-center">
                        <span
                          aria-hidden="true"
                          className={
                            allowed
                              ? "font-bold text-[var(--color-success)]"
                              : "text-[var(--color-text-muted)]"
                          }
                        >
                          {allowed ? "✓" : "—"}
                        </span>
                        <span className="sr-only">
                          {role.label}: {allowed ? content.allowedLabel : content.deniedLabel}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

export function ArchitectureExplorer({
  architecture,
  permissions,
}: ArchitectureExplorerProps) {
  const [activeViewId, setActiveViewId] = useState<ArchitectureView["id"]>(
    architecture.views[0].id,
  );
  const [selectedNodeId, setSelectedNodeId] = useState(
    architecture.views[0].nodes[0].id,
  );
  const activeView =
    architecture.views.find(({ id }) => id === activeViewId) ??
    architecture.views[0];
  const selectedNode =
    activeView.nodes.find(({ id }) => id === selectedNodeId) ??
    activeView.nodes[0];

  function selectView(viewId: ArchitectureView["id"]) {
    const nextView =
      architecture.views.find(({ id }) => id === viewId) ??
      architecture.views[0];

    setActiveViewId(nextView.id);
    setSelectedNodeId(nextView.nodes[0].id);
  }

  return (
    <>
      <Section aria-labelledby="architecture-explorer-title">
        <header className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {architecture.eyebrow}
          </p>
          <h2
            id="architecture-explorer-title"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {architecture.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--color-text-secondary)]">
            {architecture.description}
          </p>
        </header>

        <div
          className="mt-10"
          role="group"
          aria-label={architecture.viewSelectorLabel}
        >
          <p className="text-sm font-semibold text-[var(--color-text-muted)]">
            {architecture.viewSelectorLabel}
          </p>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {architecture.views.map((view) => {
              const selected = view.id === activeView.id;

              return (
                <button
                  key={view.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => selectView(view.id)}
                  className={`min-h-11 rounded-[var(--radius-control)] border p-4 text-left transition-colors duration-[var(--motion-duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] ${
                    selected
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                      : "border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-subtle)]"
                  }`}
                >
                  <span className="block font-bold">{view.label}</span>
                  <span className="mt-2 block text-sm leading-6 text-[var(--color-text-secondary)]">
                    {view.summary}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <Surface as="aside" variant="subtle" className="mt-6">
          <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
            {activeView.disclosure}
          </p>
        </Surface>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,0.65fr)]">
          <div>
            <ArchitectureDiagram
              view={activeView}
              selectedNodeId={selectedNode.id}
            />

            <div
              className="mt-6"
              role="group"
              aria-label={architecture.nodeSelectorLabel}
            >
              <p className="text-sm font-semibold text-[var(--color-text-muted)]">
                {architecture.nodeSelectorLabel}
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {activeView.nodes.map((node) => {
                  const selected = node.id === selectedNode.id;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`min-h-11 rounded-[var(--radius-control)] border p-3 text-left transition-colors duration-[var(--motion-duration-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] ${
                        selected
                          ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                          : "border-[var(--color-border-subtle)] bg-[var(--color-surface)] hover:border-[var(--color-border-strong)]"
                      }`}
                    >
                      <span className="block text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                        {architecture.categoryLabels[node.category]}
                      </span>
                      <span className="mt-1 block font-bold">{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <Surface as="article" variant="elevated" aria-live="polite">
            <p className="text-sm font-semibold text-[var(--color-text-muted)]">
              {architecture.selectedNodeLabel}
            </p>
            <Badge tone="accent" className="mt-4">
              {architecture.categoryLabels[selectedNode.category]}
            </Badge>
            <h3 className="mt-4 text-2xl font-bold">{selectedNode.label}</h3>
            <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
              {selectedNode.summary}
            </p>

            <div className="mt-7 space-y-6">
              <div>
                <h4 className="font-bold">
                  {architecture.panelLabels.responsibilities}
                </h4>
                <ul className="mt-2 space-y-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {selectedNode.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold">{architecture.panelLabels.flow}</h4>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {selectedNode.flow}
                </p>
              </div>
              <div>
                <h4 className="font-bold">{architecture.panelLabels.security}</h4>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {selectedNode.security}
                </p>
              </div>
              <div>
                <h4 className="font-bold">
                  {architecture.panelLabels.reliability}
                </h4>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {selectedNode.reliability}
                </p>
              </div>
            </div>
          </Surface>
        </div>

        <TextArchitectureFallback
          content={architecture}
          views={architecture.views}
        />
      </Section>

      <PermissionMatrix content={permissions} />
    </>
  );
}
