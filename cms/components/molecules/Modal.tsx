"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

import { cn } from "@/utils/cn";

export interface IModalProps {
  readonly isOpen: boolean;
  readonly title: string;
  readonly description?: string;
  readonly onClose: () => void;
  readonly children: ReactNode;
  readonly footer?: ReactNode;
  readonly size?: "md" | "lg";
}

const SIZE_CLASSES: Record<"md" | "lg", string> = {
  md: "max-w-lg",
  lg: "max-w-2xl",
};

/**
 * Accessible modal dialog.
 *
 * Handles Escape, background scroll lock, click-outside, and initial focus so
 * every editor form gets the same behaviour without repeating it.
 */
export function Modal({
  isOpen,
  title,
  description,
  onClose,
  children,
  footer,
  size = "md",
}: IModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          "relative z-10 flex max-h-[92vh] w-full flex-col overflow-hidden border border-ink-faint/30 bg-surface-raised shadow-2xl",
          "rounded-t-2xl sm:rounded-2xl",
          SIZE_CLASSES[size],
        )}
      >
        <header className="flex items-start justify-between gap-4 border-b border-ink-faint/25 px-5 py-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-sans text-base font-semibold text-ink-strong">
              {title}
            </h3>
            {description !== undefined ? (
              <p className="text-xs text-ink-muted">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-md p-1 text-ink-muted transition-colors hover:bg-surface-inset hover:text-ink-strong"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">{children}</div>

        {footer !== undefined ? (
          <footer className="flex items-center justify-end gap-2 border-t border-ink-faint/25 bg-surface/50 px-5 py-3">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}

export default Modal;