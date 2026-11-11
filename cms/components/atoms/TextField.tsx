import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useId } from "react";

import { cn } from "@/utils/cn";

/** Shared visual treatment for form controls. */
const CONTROL_CLASSES =
  "w-full rounded-lg border bg-surface-inset/50 px-3 py-2 text-sm text-ink-strong placeholder:text-ink-faint transition-colors disabled:cursor-not-allowed disabled:opacity-60";

/** Border colour depends on validity; an invalid field is announced too. */
function borderClass(hasError: boolean): string {
  return hasError
    ? "border-danger/60 focus:border-danger"
    : "border-ink-faint/40 focus:border-accent-violet/60";
}

export interface ITextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label: string;
  readonly error?: string;
  readonly hint?: string;
}

/** Labelled single-line text input with an accessible error message. */
export function TextField({
  label,
  error,
  hint,
  id,
  className,
  ...rest
}: ITextFieldProps) {
  // `useId` keeps ids unique even when the same label repeats in a list (e.g.
  // the repeated "Value"/"Label" rows of the stats editor).
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;
  const hintId = `${fieldId}-hint`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="font-mono text-[11px] tracking-wide text-ink-muted uppercase"
      >
        {label}
      </label>
      <input
        {...rest}
        id={fieldId}
        aria-invalid={error !== undefined}
        aria-describedby={
          error !== undefined ? errorId : hint !== undefined ? hintId : undefined
        }
        className={cn(CONTROL_CLASSES, borderClass(error !== undefined), className)}
      />
      {hint !== undefined && error === undefined ? (
        <p id={hintId} className="text-xs text-ink-faint">
          {hint}
        </p>
      ) : null}
      {error !== undefined ? (
        <p id={errorId} role="alert" className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export interface ITextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly label: string;
  readonly error?: string;
  readonly hint?: string;
}

/** Labelled multiline input. */
export function TextAreaField({
  label,
  error,
  hint,
  id,
  className,
  rows = 4,
  ...rest
}: ITextAreaFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={fieldId}
        className="font-mono text-[11px] tracking-wide text-ink-muted uppercase"
      >
        {label}
      </label>
      <textarea
        {...rest}
        id={fieldId}
        rows={rows}
        aria-invalid={error !== undefined}
        aria-describedby={error !== undefined ? errorId : undefined}
        className={cn(
          CONTROL_CLASSES,
          "resize-y leading-relaxed",
          borderClass(error !== undefined),
          className,
        )}
      />
      {hint !== undefined && error === undefined ? (
        <p className="text-xs text-ink-faint">{hint}</p>
      ) : null}
      {error !== undefined ? (
        <p id={errorId} role="alert" className="text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default TextField;