"use client";

import { useState } from "react";
import { CircleAlert, FolderKanban, Plus, RefreshCw } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { EmptyState } from "@/components/atoms/EmptyState";
import { SkeletonGrid } from "@/components/atoms/Skeleton";
import { SurfacePanel } from "@/components/atoms/SurfacePanel";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { PageHeader } from "@/components/molecules/PageHeader";
import { ProjectCard } from "@/components/organisms/ProjectCard";
import { ProjectFormModal } from "@/components/organisms/ProjectFormModal";
import {
  useCreateProject,
  useDeleteProject,
  useProjects,
  useUpdateProject,
} from "@/hooks/useProjects";
import type { ICreateProjectBody, IProject } from "@/interface/api";
import { toast } from "@/store/useToastStore";

/** Organism: full project CRUD surface. */
export function ProjectsManager() {
  const projects = useProjects();
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editing, setEditing] = useState<IProject | null>(null);
  const [pendingDelete, setPendingDelete] = useState<IProject | null>(null);

  const openCreate = (): void => {
    setEditing(null);
    setIsFormOpen(true);
  };

  const openEdit = (project: IProject): void => {
    setEditing(project);
    setIsFormOpen(true);
  };

  const closeForm = (): void => {
    setIsFormOpen(false);
    setEditing(null);
  };

  const submitForm = (values: ICreateProjectBody): void => {
    if (editing === null) {
      createProject.mutate(values, {
        onSuccess: (created) => {
          toast.success(`Project "${created.title}" created.`);
          closeForm();
        },
        onError: (error) => {
          toast.danger(error.message);
        },
      });

      return;
    }

    updateProject.mutate(
      { id: editing.id, body: values },
      {
        onSuccess: (updated) => {
          toast.success(`Project "${updated.title}" updated.`);
          closeForm();
        },
        onError: (error) => {
          toast.danger(error.message);
        },
      },
    );
  };

  const confirmDelete = (): void => {
    if (pendingDelete === null) {
      return;
    }

    const target = pendingDelete;

    deleteProject.mutate(target.id, {
      onSuccess: () => {
        toast.success(`Project "${target.title}" deleted.`);
        setPendingDelete(null);
      },
      onError: (error) => {
        toast.danger(error.message);
        setPendingDelete(null);
      },
    });
  };

  const items = projects.data?.data ?? [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Content"
        title="Projects"
        description="Portfolio case studies rendered on the public site."
        actions={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                void projects.refetch();
              }}
              isLoading={projects.isFetching && !projects.isPending}
              leadingIcon={<RefreshCw aria-hidden="true" className="size-4" />}
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              onClick={openCreate}
              leadingIcon={<Plus aria-hidden="true" className="size-4" />}
            >
              New project
            </Button>
          </>
        }
      />

      {projects.isPending ? <SkeletonGrid count={6} /> : null}

      {projects.error !== null ? (
        <SurfacePanel className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-2 text-sm text-danger">
            <CircleAlert aria-hidden="true" className="size-4" />
            {projects.error.message}
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              void projects.refetch();
            }}
          >
            Try again
          </Button>
        </SurfacePanel>
      ) : null}

      {projects.data !== undefined && items.length === 0 ? (
        <EmptyState
          icon={<FolderKanban aria-hidden="true" className="size-5" />}
          title="No projects yet"
          description="Add the first case study so it can be featured on the portfolio."
          action={
            <Button
              variant="primary"
              onClick={openCreate}
              leadingIcon={<Plus aria-hidden="true" className="size-4" />}
            >
              Create project
            </Button>
          }
        />
      ) : null}

      {items.length > 0 ? (
        <>
          <p className="font-mono text-[11px] text-ink-faint">
            {items.length} {items.length === 1 ? "project" : "projects"}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isDeleting={
                  deleteProject.isPending && pendingDelete?.id === project.id
                }
                onEdit={openEdit}
                onDelete={setPendingDelete}
              />
            ))}
          </div>
        </>
      ) : null}

      <ProjectFormModal
        isOpen={isFormOpen}
        project={editing}
        isSubmitting={createProject.isPending || updateProject.isPending}
        onClose={closeForm}
        onSubmit={submitForm}
      />

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title="Delete project"
        message={`"${
          pendingDelete?.title ?? ""
        }" will be removed permanently. This cannot be undone.`}
        isPending={deleteProject.isPending}
        onConfirm={confirmDelete}
        onCancel={() => {
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

export default ProjectsManager;