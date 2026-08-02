"use client";

import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { HomeContent } from "@/content/home";
import { cn } from "@/lib/cn";

type LabTeaserFlowProps = {
  content: HomeContent["labTeaser"];
};

export function LabTeaserFlow({ content }: LabTeaserFlowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const generatedId = useId().replace(/:/gu, "");

  function selectWithKeyboard(index: number) {
    setActiveIndex(index);
    buttonRefs.current[index]?.focus();
  }

  function handleKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | undefined;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % content.flows.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex =
          (index - 1 + content.flows.length) % content.flows.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = content.flows.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    selectWithKeyboard(nextIndex);
  }

  return (
    <div data-testid="lab-teaser-flow">
      <div
        aria-label={content.eyebrow}
        className="flex flex-wrap gap-2"
        role="tablist"
      >
        {content.flows.map((flow, index) => {
          const selected = index === activeIndex;
          const tabId = `${generatedId}-tab-${index}`;
          const panelId = `${generatedId}-panel-${index}`;

          return (
            <button
              aria-controls={panelId}
              aria-selected={selected}
              className={cn(
                "min-h-[var(--target-min)] rounded-[var(--radius-control)] px-4 py-2 font-mono text-xs motion-safe:transition-colors motion-safe:duration-[var(--motion-duration-fast)]",
                selected
                  ? "border border-transparent bg-[var(--color-accent)] text-[var(--color-on-accent)]"
                  : "border border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-text-primary)]",
              )}
              id={tabId}
              key={flow.label}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              role="tab"
              tabIndex={selected ? 0 : -1}
              type="button"
            >
              {flow.label}
            </button>
          );
        })}
      </div>

      {content.flows.map((flow, flowIndex) => (
        <div
          aria-labelledby={`${generatedId}-tab-${flowIndex}`}
          hidden={flowIndex !== activeIndex}
          id={`${generatedId}-panel-${flowIndex}`}
          key={flow.label}
          role="tabpanel"
          tabIndex={0}
        >
          <ol
            aria-label={flow.label}
            className="relative mt-8 grid gap-3 sm:grid-cols-4"
          >
            {flow.nodes.map((node, nodeIndex) => (
              <li
                className="relative border-t border-[var(--color-border-strong)] pt-4 text-sm font-semibold before:absolute before:-top-1 before:left-0 before:size-2 before:rounded-full before:bg-[var(--color-signal)]"
                key={node}
              >
                <span className="font-mono text-xs text-[var(--color-text-secondary)]">
                  0{nodeIndex + 1}
                </span>
                <span className="mt-2 block">{node}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}
