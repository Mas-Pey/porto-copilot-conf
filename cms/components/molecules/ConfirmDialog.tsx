"use client";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";

export interface IConfirmDialogProps {
  readonly isOpen: boolean;
  readonly title: string;
  readonly message: string;
  readonly confirmLabel?: string;
  readonly isPending?: boolean;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}

/** Destructive-action guard used before every delete call. */
export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Delete",
  isPending = false,
  onConfirm,
  onCancel,
}: IConfirmDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      title={title}
      onClose={isPending ? () => undefined : onCancel}
      footer={
        <>
          <Button variant="ghost" onClick={onCancel} disabled={isPending}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            isLoading={isPending}
            leadingIcon={<AlertTriangle aria-hidden="true" className="size-4" />}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-ink-body">{message}</p>
    </Modal>
  );
}

export default ConfirmDialog;