"use client";

import { useMemo, useState } from "react";
import { Plus, RefreshCw, Sparkles, Trash2 } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { EmptyState } from "@/components/atoms/EmptyState";
import { MediaThumb } from "@/components/atoms/MediaThumb";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { SurfacePanel } from "@/components/atoms/SurfacePanel";
import { ConfirmDialog } from "@/components/molecules/ConfirmDialog";
import { PageHeader } from "@/components/molecules/PageHeader";
import { SkillFormModal } from "@/components/organisms/SkillFormModal";
import { useCreateSkill, useDeleteSkill, useSkills } from "@/hooks/useSkills";
import type { ICreateSkillBody, ISkill } from "@/interface/api";
import { toast } from "@/store/useToastStore";

/** A category bucket with its skills, ordered for stable rendering. */
interface ISkillGroup {
  readonly category: string;
  readonly skills: readonly ISkill[];
}

/** Groups skills by category, alphabetically, preserving insertion order. */
function groupSkills(skills: readonly ISkill[]): readonly ISkillGroup[] {
  const buckets = new Map<string, ISkill[]>();

  for (const skill of skills) {
    const bucket = buckets.get(skill.category);
    if (bucket === undefined) {
      buckets.set(skill.category, [skill]);
    } else {
      bucket.push(skill);
    }
  }

  return [...buckets.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, items]) => ({ category, skills: items }));
}

/** Organism: categorized skill badge management. */
export function SkillsManager() {
  const skills = useSkills();
  const createSkill = useCreateSkill();
  const deleteSkill = useDeleteSkill();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [presetCategory, setPresetCategory] = useState("");
  const [pendingDelete, setPendingDelete] = useState<ISkill | null>(null);

  const groups = useMemo(
    () => groupSkills(skills.data?.data ?? []),
    [skills.data],
  );

  const openCreate = (category: string): void => {
    setPresetCategory(category);
    setIsFormOpen(true);
  };

  const submitForm = (values: ICreateSkillBody): void => {
    createSkill.mutate(values, {
      onSuccess: (created) => {
        toast.success(`Skill "${created.name}" added.`);
        setIsFormOpen(false);
      },
      onError: (error) => {
        toast.danger(error.message);
      },
    });
  };

  const confirmDelete = (): void => {
    if (pendingDelete === null) {
      return;
    }

    const target = pendingDelete;

    deleteSkill.mutate(target.id, {
      onSuccess: () => {
        toast.success(`Skill "${target.name}" deleted.`);
        setPendingDelete(null);
      },
      onError: (error) => {
        toast.danger(error.message);
        setPendingDelete(null);
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Content"
        title="Skills"
        description="Badge library shown on the public skills grid, grouped by category."
        actions={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                void skills.refetch();
              }}
              isLoading={skills.isFetching && !skills.isPending}
              leadingIcon={<RefreshCw aria-hidden="true" className="size-4" />}
            >
              Refresh
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                openCreate("");
              }}
              leadingIcon={<Plus aria-hidden="true" className="size-4" />}
            >
              New skill
            </Button>
          </>
        }
      />

      {skills.isPending ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }, (_, index) => (
            <SkeletonBlock
              key={`skill-skeleton-${index}`}
              className="h-40 w-full"
            />
          ))}
        </div>
      ) : null}

      {skills.error !== null ? (
        <SurfacePanel className="flex flex-col items-start gap-3">
          <p className="text-sm text-danger">{skills.error.message}</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              void skills.refetch();
            }}
          >
            Try again
          </Button>
        </SurfacePanel>
      ) : null}

      {skills.data !== undefined && groups.length === 0 ? (
        <EmptyState
          icon={<Sparkles aria-hidden="true" className="size-5" />}
          title="No skills yet"
          description="Add badges to build the category grid visitors browse."
          action={
            <Button
              variant="primary"
              onClick={() => {
                openCreate("");
              }}
              leadingIcon={<Plus aria-hidden="true" className="size-4" />}
            >
              Add skill
            </Button>
          }
        />
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        {groups.map((group) => (
          <SurfacePanel key={group.category} className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <h3 className="font-sans text-sm font-semibold text-ink-strong">
                  {group.category}
                </h3>
                <span className="font-mono text-[10px] text-ink-faint">
                  {group.skills.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  openCreate(group.category);
                }}
                aria-label={`Add skill to ${group.category}`}
                className="rounded-md border border-ink-faint/30 p-1.5 text-ink-muted transition-colors hover:bg-surface-inset hover:text-ink-strong"
              >
                <Plus aria-hidden="true" className="size-3.5" />
              </button>
            </div>

            <ul className="flex flex-col gap-1">
              {group.skills.map((skill) => (
                <li
                  key={skill.id}
                  className="group flex items-center gap-2.5 rounded-lg px-1.5 py-1.5 transition-colors hover:bg-surface-inset/60"
                >
                  <MediaThumb
                    src={skill.badgeUrl}
                    alt={`${skill.name} badge`}
                    rounded
                    className="size-7 shrink-0"
                    imgClassName="object-contain p-0.5"
                  />
                  <span className="min-w-0 flex-1 truncate text-sm text-ink-body">
                    {skill.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPendingDelete(skill);
                    }}
                    aria-label={`Delete ${skill.name}`}
                    className="rounded p-1 text-ink-faint opacity-0 transition-all group-hover:opacity-100 hover:bg-danger/10 hover:text-danger focus-visible:opacity-100"
                  >
                    <Trash2 aria-hidden="true" className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </SurfacePanel>
        ))}
      </div>

      <SkillFormModal
        isOpen={isFormOpen}
        defaultCategory={presetCategory}
        isSubmitting={createSkill.isPending}
        onClose={() => {
          setIsFormOpen(false);
        }}
        onSubmit={submitForm}
      />

      <ConfirmDialog
        isOpen={pendingDelete !== null}
        title="Delete skill"
        message={`"${
          pendingDelete?.name ?? ""
        }" will be removed from the badge library. This cannot be undone.`}
        isPending={deleteSkill.isPending}
        onConfirm={confirmDelete}
        onCancel={() => {
          setPendingDelete(null);
        }}
      />
    </div>
  );
}

export default SkillsManager;