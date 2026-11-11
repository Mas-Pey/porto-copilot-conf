"use client";

import { useState, type KeyboardEvent } from "react";
import { Plus, X } from "lucide-react";

import { cn } from "@/utils/cn";

export interface ITagInputProps {
  readonly label: string;
  readonly values: readonly string[];
  readonly placeholder?: string;
  readonly error?: string;
  readonly disabled?: boolean;
  readonly onChange: (values: readonly string[]) => void;
}

/**
 * Controlled tag editor for `string[]` fields (project tech stacks).
 *
 * Enter or comma commits the draft; Backspace on an empty draft removes the
 * last chip; duplicates are ignored so the array stays clean.
 */
export function TagInput({
  label,
  values,
  placeholder = "Type and press Enter",
  error,
  disabled = false,
  onChange,
}: ITagInputProps) {
  const [draft, setDraft] = useState("");

  const commit = (): void => {
    const candidate = draft.trim();

    if (candidate.length === 0) {
      return;
    }

    const exists = values.some(
      (value) => value.toLowerCase() === candidate.toLowerCase(),
    );

    if (!exists) {
      onChange([...values, candidate]);
    }

    setDraft("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commit();
      return;
    }

    if (event.key === "Backspace" && draft.length === 0) {
      onChange(values.slice(0, -1));
    }
  };

  const removeAt = (index: number): void => {
    onChange(values.filter((_, position) => position !== index));
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-[11px] tracking-wide text-ink-muted uppercase">
        {label}
      </span>

      <div
        className={cn(
          "flex flex-wrap items-center gap-1.5 rounded-lg border bg-surface-inset/50 p-2",
          error !== undefined ? "border-danger/60" : "border-ink-faint/40",
        )}
      >
        {values.map((value, index) => (
          <span
            key={`${value}-${index}`}
            className="inline-flex items-center gap-1 rounded-md border border-accent-violet/30 bg-accent-violet/10 py-0.5 pr-1 pl-2 font-mono text-[11px] text-accent-violet"
          >
            {value}
            <button
              type="button"
              disabled={disabled}
              onClick={() => {
                removeAt(index);
              }}
              aria-label={`Remove ${value}`}
              className="rounded p-0.5 transition-colors hover:bg-accent-violet/20 disabled:opacity-50"
            >
              <X aria-hidden="true" className="size-3" />
            </button>
          </span>
        ))}

        <div className="flex min-w-32 flex-1 items-center gap-1">
          <input
            value={draft}
            disabled={disabled}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            onChange={(event) => {
              setDraft(event.target.value);
            }}
            onBlur={commit}
            aria-label={label}
            className="min-w-0 flex-1 bg-transparent px-1 py-1 text-sm text-ink-strong placeholder:text-ink-faint focus:outline-none"
          />
          <button
            type="button"
            disabled={disabled || draft.trim().length === 0}
            onClick={commit}
            aria-label="Add tag"
            className="rounded p-1 text-ink-muted transition-colors hover:bg-surface-inset hover:text-ink-strong disabled:opacity-40"
          >
            <Plus aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>

      {error !== undefined ? (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default TagInput;