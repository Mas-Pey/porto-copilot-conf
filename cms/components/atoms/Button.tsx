import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

import type { TTone } from "@/interface/ui";
import { cn } from "@/utils/cn";

/** Visual emphasis of a button. */
export type TButtonVariant = "primary" | "secondary" | "ghost" | "danger";

/** Rendered size of a button. */
export type TButtonSize = "sm" | "md";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: TButtonVariant;
  readonly size?: TButtonSize;
  readonly isLoading?: boolean;
  readonly leadingIcon?: ReactNode;
}

const VARIANT_CLASSES: Record<TButtonVariant, string> = {
  primary:
    "border-accent-violet/60 bg-accent-violet/15 text-accent-violet hover:bg-accent-violet/25",
  secondary:
    "border-ink-faint/40 bg-surface-inset/60 text-ink-body hover:bg-surface-inset hover:text-ink-strong",
  ghost:
    "border-transparent bg-transparent text-ink-muted hover:bg-surface-inset/60 hover:text-ink-strong",
  danger:
    "border-danger/50 bg-danger/10 text-danger hover:bg-danger/20",
};

const SIZE_CLASSES: Record<TButtonSize, string> = {
  sm: "h-8 gap-1.5 px-2.5 text-xs",
  md: "h-10 gap-2 px-4 text-sm",
};

const TONE_BY_VARIANT: Record<TButtonVariant, TTone> = {
  primary: "accent",
  secondary: "neutral",
  ghost: "neutral",
  danger: "danger",
};

/** Exposed so callers can tint sibling UI consistently. */
export function toneOfVariant(variant: TButtonVariant): TTone {
  return TONE_BY_VARIANT[variant];
}

/**
 * The single button primitive.
 *
 * Disabled while `isLoading` so a mutation in flight cannot be fired twice.
 */
export function Button({
  variant = "secondary",
  size = "md",
  isLoading = false,
  leadingIcon,
  className,
  children,
  disabled,
  type = "button",
  ...rest
}: IButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled === true || isLoading}
      aria-busy={isLoading}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border font-medium transition-colors",
        "disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
    >
      {isLoading ? (
        <Loader2 aria-hidden="true" className="size-4 animate-spin" />
      ) : (
        leadingIcon
      )}
      {children}
    </button>
  );
}

export default Button;