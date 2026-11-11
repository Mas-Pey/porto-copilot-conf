"use client";

import { useCallback, useState } from "react";
import { sendMessage } from "@/services/portfolioService";

/** Submission state machine for the contact form. */
export type TContactStatus = "idle" | "submitting" | "success" | "error";

/** Values collected by the contact form, keyed by field id. */
export interface IContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly message: string;
}

/** Shape returned by `useContactForm`. */
export interface IUseContactFormResult {
  readonly status: TContactStatus;
  /** Human-readable feedback shown under the submit button. */
  readonly feedback: string | null;
  /** `true` while a submit is in flight (used to disable the button). */
  readonly isSubmitting: boolean;
  /** Submits the form; resolves `true` on success. */
  readonly submit: (values: IContactFormValues) => Promise<boolean>;
}

/**
 * Encapsulates contact-form submission so the presentation layer only deals
 * with a status string and a submit callback.
 *
 * @param successMessage Copy shown after a successful submit (from CMS/mock).
 */
export function useContactForm(successMessage: string): IUseContactFormResult {
  const [status, setStatus] = useState<TContactStatus>("idle");
  const [feedback, setFeedback] = useState<string | null>(null);

  const submit = useCallback(
    async (values: IContactFormValues): Promise<boolean> => {
      setStatus("submitting");
      setFeedback(null);

      try {
        await sendMessage({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
        });

        setStatus("success");
        setFeedback(successMessage);

        return true;
      } catch (error) {
        setStatus("error");
        setFeedback(
          error instanceof Error && error.message.length > 0
            ? `Could not send your message: ${error.message}`
            : "Could not send your message. Please try again.",
        );

        return false;
      }
    },
    [successMessage],
  );

  return {
    status,
    feedback,
    isSubmitting: status === "submitting",
    submit,
  };
}