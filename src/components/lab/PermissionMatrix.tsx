"use client";

import { useState } from "react";
import type { LabLocaleContent } from "@/content/lab";
import {
  EditorialSection,
  TechnicalAnnotation,
} from "@/components/ui";
import { cn } from "@/lib/cn";

type PermissionContent = LabLocaleContent["permissions"];
type RoleId = PermissionContent["roles"][number]["id"];

type PermissionMatrixProps = {
  content: PermissionContent;
};

export function PermissionMatrix({ content }: PermissionMatrixProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<RoleId>(
    content.roles[0].id,
  );
  const selectedRole =
    content.roles.find(({ id }) => id === selectedRoleId) ??
    content.roles[0];

  return (
    <EditorialSection
      aria-labelledby="permission-matrix-title"
      id="permissions"
      tone="subtle"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
        <header className="max-w-xl">
          <TechnicalAnnotation>{content.eyebrow}</TechnicalAnnotation>
          <h2
            className="mt-4 text-[length:var(--font-size-section)] font-semibold leading-[1] tracking-[var(--letter-spacing-heading)]"
            id="permission-matrix-title"
          >
            {content.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.description}
          </p>
        </header>

        <div>
          <div aria-label={content.roleSelectorLabel} role="group">
            <p className="text-sm font-semibold text-[var(--color-text-muted)]">
              {content.roleSelectorLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {content.roles.map((role) => {
                const selected = role.id === selectedRole.id;

                return (
                  <button
                    aria-pressed={selected}
                    className={cn(
                      "min-h-[var(--target-min)] border px-4 py-2 text-sm font-semibold transition-colors duration-[var(--motion-duration-fast)]",
                      selected
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-on-accent)]"
                        : "border-[var(--color-border-strong)] bg-[var(--color-surface)] hover:bg-[var(--color-accent-soft)]",
                    )}
                    key={role.id}
                    onClick={() => setSelectedRoleId(role.id)}
                    type="button"
                  >
                    {role.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div aria-live="polite" className="mt-8">
            <h3 className="text-xl font-semibold">
              {content.selectedRoleLabel}: {selectedRole.label}
            </h3>
            <ul className="mt-4 grid border-t border-[var(--color-border-strong)] sm:grid-cols-2">
              {content.actions.map((action) => {
                const allowed = action.allowedRoles.includes(selectedRole.id);

                return (
                  <li
                    className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 border-b border-[var(--color-border-subtle)] py-4 sm:px-3"
                    key={action.id}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 font-mono font-semibold",
                        allowed
                          ? "text-[var(--color-success)]"
                          : "text-[var(--color-text-secondary)]",
                      )}
                    >
                      {allowed ? "✓" : "—"}
                    </span>
                    <span>
                      <span className="block font-semibold">
                        {action.label}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-[var(--color-text-secondary)]">
                        {allowed
                          ? content.allowedLabel
                          : content.deniedLabel}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <details className="mt-10 border-t border-[var(--color-border-strong)] pt-5">
        <summary className="flex min-h-[var(--target-min)] cursor-pointer items-center font-semibold marker:text-[var(--color-accent)]">
          {content.fullMatrixTitle}
        </summary>
        <div
          aria-label={content.fullMatrixTitle}
          className="mt-4 overflow-x-auto border border-[var(--color-border-subtle)] bg-[var(--color-surface)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
          role="region"
          tabIndex={0}
        >
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-strong)]">
                <th className="p-4 font-semibold" scope="col">
                  {content.actionHeader}
                </th>
                {content.roles.map((role) => (
                  <th
                    className="p-4 text-center font-semibold"
                    key={role.id}
                    scope="col"
                  >
                    {role.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.actions.map((action) => (
                <tr
                  className="border-b border-[var(--color-border-subtle)] last:border-b-0"
                  key={action.id}
                >
                  <th className="p-4 font-medium" scope="row">
                    {action.label}
                  </th>
                  {content.roles.map((role) => {
                    const allowed = action.allowedRoles.includes(role.id);

                    return (
                      <td
                        aria-label={`${role.label}: ${
                          allowed
                            ? content.allowedLabel
                            : content.deniedLabel
                        }`}
                        className="p-4 text-center"
                        key={role.id}
                      >
                        <span
                          aria-hidden="true"
                          className={
                            allowed
                              ? "font-semibold text-[var(--color-success)]"
                              : "text-[var(--color-text-muted)]"
                          }
                        >
                          {allowed ? "✓" : "—"}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </EditorialSection>
  );
}
