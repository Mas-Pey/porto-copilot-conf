"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";
import { TextField } from "@/components/atoms/TextField";
import type { ICreateSkillBody } from "@/interface/api";
import { skillFormSchema, type TSkillFormValues } from "@/interface/schemas";

export interface ISkillFormModalProps {
  readonly isOpen: boolean;
  /** Pre-fills the category when opened from a category group. */
  readonly defaultCategory?: string;
  readonly isSubmitting: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (values: ICreateSkillBody) => void;
}

/** Create dialog for a skill badge. */
export function SkillFormModal({
  isOpen,
  defaultCategory = "",
  isSubmitting,
  onClose,
  onSubmit,
}: ISkillFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TSkillFormValues>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: { name: "", badgeUrl: "", category: defaultCategory },
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    reset({ name: "", badgeUrl: "", category: defaultCategory });
  }, [isOpen, defaultCategory, reset]);

  const submit = handleSubmit((values) => {
    onSubmit({
      name: values.name.trim(),
      badgeUrl: values.badgeUrl.trim(),
      category: values.category.trim(),
    });
  });

  return (
    <Modal
      isOpen={isOpen}
      title="New skill"
      description="Badges are grouped by category on the public skills grid."
      onClose={isSubmitting ? () => undefined : onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submit} isLoading={isSubmitting}>
            Add skill
          </Button>
        </>
      }
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
        className="flex flex-col gap-4"
      >
        <TextField
          label="Skill name"
          placeholder="TypeScript"
          error={errors.name?.message}
          disabled={isSubmitting}
          {...register("name")}
        />
        <TextField
          label="Badge URL"
          placeholder="/icons/skill-frontend.svg"
          hint="Absolute URL or a path served by the API."
          error={errors.badgeUrl?.message}
          disabled={isSubmitting}
          {...register("badgeUrl")}
        />
        <TextField
          label="Category"
          placeholder="Frontend"
          error={errors.category?.message}
          disabled={isSubmitting}
          {...register("category")}
        />
        <button type="submit" className="hidden" tabIndex={-1} aria-hidden="true" />
      </form>
    </Modal>
  );
}

export default SkillFormModal;