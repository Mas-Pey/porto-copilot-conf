"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/atoms/Button";
import { Modal } from "@/components/molecules/Modal";
import { TagInput } from "@/components/molecules/TagInput";
import { TextAreaField, TextField } from "@/components/atoms/TextField";
import type { ICreateProjectBody, IProject } from "@/interface/api";
import {
  projectFormSchema,
  type TProjectFormValues,
} from "@/interface/schemas";

export interface IProjectFormModalProps {
  readonly isOpen: boolean;
  /** `null` creates; a project edits it. */
  readonly project: IProject | null;
  readonly isSubmitting: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (values: ICreateProjectBody) => void;
}

const EMPTY_VALUES: TProjectFormValues = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  techStack: [],
};

/** Create/edit dialog for a project, validated with Zod. */
export function ProjectFormModal({
  isOpen,
  project,
  isSubmitting,
  onClose,
  onSubmit,
}: IProjectFormModalProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: EMPTY_VALUES,
  });

  // Re-seed the form whenever the dialog opens for a different record.
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    reset(
      project === null
        ? EMPTY_VALUES
        : {
            title: project.title,
            description: project.description,
            category: project.category,
            imageUrl: project.imageUrl,
            techStack: [...project.techStack],
          },
    );
  }, [isOpen, project, reset]);

  const submit = handleSubmit((values) => {
    onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category.trim(),
      imageUrl: values.imageUrl.trim(),
      techStack: values.techStack.map((tech) => tech.trim()),
    });
  });

  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      title={project === null ? "New project" : `Edit project #${project.id}`}
      description="Fields are validated against the API contract before submission."
      onClose={isSubmitting ? () => undefined : onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submit} isLoading={isSubmitting}>
            {project === null ? "Create project" : "Save changes"}
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
          label="Title"
          placeholder="Bioskop Web Platform"
          error={errors.title?.message}
          disabled={isSubmitting}
          {...register("title")}
        />

        <TextAreaField
          label="Description"
          placeholder="What the project does and why it matters."
          rows={4}
          error={errors.description?.message}
          disabled={isSubmitting}
          {...register("description")}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Category"
            placeholder="Web App"
            error={errors.category?.message}
            disabled={isSubmitting}
            {...register("category")}
          />
          <TextField
            label="Image URL"
            placeholder="/images/project-bioskopweb.png"
            hint="Absolute URL or a path served by the API."
            error={errors.imageUrl?.message}
            disabled={isSubmitting}
            {...register("imageUrl")}
          />
        </div>

        <Controller
          name="techStack"
          control={control}
          render={({ field }) => (
            <TagInput
              label="Tech stack"
              values={field.value}
              error={errors.techStack?.message}
              disabled={isSubmitting}
              onChange={field.onChange}
            />
          )}
        />

        {/* Enables Enter-to-submit inside the inputs. */}
        <button type="submit" className="hidden" tabIndex={-1} aria-hidden="true" />
      </form>
    </Modal>
  );
}

export default ProjectFormModal;