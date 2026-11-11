"use client";

import { CheckCircle2, CircleAlert, X } from "lucide-react";

import { cn } from "@/utils/cn";
import { useToastStore, type IToast } from "@/store/useToastStore";

const TONE_CLASSES: Record<IToast["tone"], string> = {
  success: "border-success/40 bg-success/10 text-success",
  danger: "border-danger/40 bg-danger/10 text-danger",
  accent: "border-accent-violet/40 bg-accent-violet/10 text-accent-violet",
};

function ToastRow({ toast }: { readonly toast: IToast }) {
  const dismiss = useToastStore((state) => state.dismiss);
  const Icon = toast.tone === "success" ? CheckCircle2 : CircleAlert;

  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-2 rounded-xl border px-3 py-2 text-sm shadow-lg backdrop-blur",
        TONE_CLASSES[toast.tone],
      )}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <p className="flex-1 leading-snug">{toast.message}</p>
      <button
        type="button"
        onClick={() => {
          dismiss(toast.id);
        }}
        aria-label="Dismiss notification"
        className="rounded p-0.5 opacity-70 transition-opacity hover:opacity-100"
      >
        <X aria-hidden="true" className="size-3.5" />
      </button>
    </div>
  );
}

/** Fixed-position toast stack. Mounted once in the app shell. */
export function ToastViewport() {
  const toasts = useToastStore((state) => state.toasts);

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-60 flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
          <ToastRow toast={toast} />
        </div>
      ))}
    </div>
  );
}

export default ToastViewport;