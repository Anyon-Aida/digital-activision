"use client";

import { Search } from "lucide-react";
import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@/components/ui";
import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { commandPaletteCopy } from "./copy";
import {
  buildLocaleSwitchCommand,
  filterCommandPaletteCommands,
  moveCommandIndex,
} from "./command-utils";
import type { PaletteCommand } from "./types";

type CommandPaletteProps = {
  commands: readonly PaletteCommand[];
  locale: Locale;
};

const paletteId = "global-command-palette";

export function CommandPalette({ commands: baseCommands, locale }: CommandPaletteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const generatedId = useId().replace(/:/g, "");
  const listboxId = `${generatedId}-command-listbox`;
  const resultCountId = `${generatedId}-command-count`;
  const instructionsId = `${generatedId}-command-instructions`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(pathname);
  const copy = commandPaletteCopy[locale];
  const commands = useMemo(
    () => [
      ...baseCommands,
      buildLocaleSwitchCommand(locale, currentLocation),
    ],
    [baseCommands, currentLocation, locale],
  );
  const visibleCommands = useMemo(
    () => filterCommandPaletteCommands(commands, query),
    [commands, query],
  );
  const activeCommand = visibleCommands[activeIndex];
  const activeOptionId = activeCommand
    ? `${generatedId}-command-${activeCommand.id}`
    : undefined;

  const openPalette = useCallback(() => {
    if (open) {
      inputRef.current?.focus();
      return;
    }

    setCurrentLocation(
      `${pathname}${window.location.search}${window.location.hash}`,
    );
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, [open, pathname]);

  useEffect(() => {
    setCurrentLocation(pathname);
  }, [pathname]);

  useEffect(() => {
    const handleGlobalShortcut = (event: globalThis.KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.altKey ||
        event.key.toLocaleLowerCase() !== "k" ||
        (!event.ctrlKey && !event.metaKey)
      ) {
        return;
      }

      const otherDialog = document.querySelector(
        `dialog[open]:not(#${paletteId})`,
      );
      if (otherDialog) {
        return;
      }

      event.preventDefault();
      openPalette();
    };

    window.addEventListener("keydown", handleGlobalShortcut);
    return () => window.removeEventListener("keydown", handleGlobalShortcut);
  }, [openPalette]);

  useEffect(() => {
    if (open && activeOptionId) {
      document.getElementById(activeOptionId)?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [activeOptionId, open]);

  const activateCommand = (command: PaletteCommand) => {
    if (command.disabled || !command.href) {
      return;
    }

    setOpen(false);
    router.push(command.href);
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.currentTarget.value;
    const nextCommands = filterCommandPaletteCommands(commands, nextQuery);
    setQuery(nextQuery);
    setActiveIndex(nextCommands.length > 0 ? 0 : -1);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((currentIndex) =>
        moveCommandIndex(
          currentIndex,
          event.key === "ArrowDown" ? "next" : "previous",
          visibleCommands.length,
        ),
      );
      return;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveIndex(
        moveCommandIndex(
          activeIndex,
          event.key === "Home" ? "first" : "last",
          visibleCommands.length,
        ),
      );
      return;
    }

    if (event.key === "Enter" && activeCommand) {
      event.preventDefault();
      activateCommand(activeCommand);
    }
  };

  return (
    <>
      <button
        aria-controls={paletteId}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-keyshortcuts="Control+K Meta+K"
        aria-label={copy.openLabel}
        className="inline-flex min-h-[var(--target-min)] min-w-[var(--target-min)] items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-3 text-sm font-semibold text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-subtle)]"
        onClick={openPalette}
        type="button"
      >
        <Search aria-hidden="true" size={18} strokeWidth={1.8} />
        <span className="hidden xl:inline">{copy.openText}</span>
        <kbd
          aria-hidden="true"
          className="hidden rounded border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] px-1.5 py-0.5 font-mono text-[0.6875rem] text-[var(--color-text-secondary)] sm:inline"
        >
          Ctrl/⌘ K
        </kbd>
      </button>

      <Dialog
        closeLabel={copy.closeLabel}
        description={copy.description}
        id={paletteId}
        initialFocusRef={inputRef}
        onOpenChange={setOpen}
        open={open}
        title={copy.title}
      >
        <div className="relative">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]"
            size={20}
            strokeWidth={1.8}
          />
          <label className="sr-only" htmlFor={`${generatedId}-command-input`}>
            {copy.inputLabel}
          </label>
          <input
            aria-activedescendant={activeOptionId}
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-describedby={`${resultCountId} ${instructionsId}`}
            aria-expanded={open}
            autoComplete="off"
            className="min-h-12 w-full rounded-[var(--radius-control)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] py-3 pl-12 pr-4 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)]"
            id={`${generatedId}-command-input`}
            onChange={handleQueryChange}
            onKeyDown={handleInputKeyDown}
            placeholder={copy.placeholder}
            ref={inputRef}
            role="combobox"
            spellCheck={false}
            type="search"
            value={query}
          />
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 text-xs text-[var(--color-text-secondary)]">
          <p aria-live="polite" id={resultCountId} role="status">
            {copy.resultCount(visibleCommands.length)}
          </p>
          <p aria-hidden="true" className="hidden text-right sm:block">
            ↑↓ · Enter · Esc
          </p>
        </div>

        {visibleCommands.length > 0 ? (
          <ul
            aria-label={copy.resultsLabel}
            className="mt-3 grid max-h-[min(55dvh,28rem)] gap-1 overflow-y-auto overscroll-contain pr-1"
            id={listboxId}
            role="listbox"
          >
            {visibleCommands.map((command, index) => {
              const selected = index === activeIndex;

              return (
                <li
                  aria-disabled={command.disabled || undefined}
                  aria-selected={selected}
                  className={cn(
                    "grid min-h-[var(--target-min)] cursor-pointer grid-cols-[minmax(0,1fr)_auto] gap-3 rounded-[var(--radius-control)] border border-transparent px-4 py-3",
                    selected &&
                      "border-[var(--color-accent-secondary)] bg-[var(--color-accent-soft)]",
                    command.disabled &&
                      "cursor-not-allowed opacity-60",
                  )}
                  id={`${generatedId}-command-${command.id}`}
                  key={command.id}
                  onClick={() => activateCommand(command)}
                  onMouseDown={(event) => event.preventDefault()}
                  onMouseEnter={() => setActiveIndex(index)}
                  role="option"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-[var(--color-text-primary)]">
                      {command.label}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-[var(--color-text-secondary)]">
                      {command.description}
                    </span>
                  </span>
                  <span className="self-start rounded-[var(--radius-pill)] border border-[var(--color-border-subtle)] px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-[var(--color-text-secondary)]">
                    {copy.group[command.group]}
                  </span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-8 text-center text-sm text-[var(--color-text-secondary)]">
            {copy.empty}
          </p>
        )}

        <p className="sr-only" id={instructionsId}>
          {copy.instructions}
        </p>
      </Dialog>
    </>
  );
}
