"use client";

import { Pencil, Trash2 } from "lucide-react";

import { MediaThumb } from "@/components/atoms/MediaThumb";
import { TagChip } from "@/components/atoms/TagChip";
import type { IProject } from "@/interface/api";
import { formatDate } from "@/utils/format";

export interface IProjectCardProps {
  readonly project: IProject;
  readonly isDeleting?: boolean;
  readonly onEdit: (project: IProject) => void;
  readonly onDelete: (project: IProject) => void;
}

/** Project tile with thumbnail, category, tech stack, and row actions. */
export function ProjectCard({
  project,
  isDeleting = false,
  onEdit,
  onDelete,
}: IProjectCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-faint/25 bg-surface-raised">
      <div className="relative">
        <MediaThumb
          src={project.imageUrl}
          alt={`${project.title} preview`}
          className="h-36 w-full"
        />
        <span className="absolute top-2 left-2 rounded-full border border-accent-teal/40 bg-surface/85 px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-accent-teal uppercase backdrop-blur">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-sans text-sm leading-snug font-semibold text-ink-strong">
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-[10px] text-ink-faint">
            #{project.id}
          </span>
        </div>

        <p className="line-clamp-3 text-xs leading-relaxed text-ink-muted">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.techStack.slice(0, 6).map((tech) => (
            <TagChip key={`${project.id}-${tech}`} label={tech} />
          ))}
          {project.techStack.length > 6 ? (
            <TagChip label={`+${project.techStack.length - 6}`} />
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-ink-faint/20 pt-3">
          <span className="font-mono text-[10px] text-ink-faint">
            {formatDate(project.createdAt)}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => {
                onEdit(project);
              }}
              aria-label={`Edit ${project.title}`}
              className="rounded-md border border-ink-faint/30 p-1.5 text-ink-muted transition-colors hover:bg-surface-inset hover:text-ink-strong"
            >
              <Pencil aria-hidden="true" className="size-3.5" />
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => {
                onDelete(project);
              }}
              aria-label={`Delete ${project.title}`}
              className="rounded-md border border-danger/30 p-1.5 text-danger/80 transition-colors hover:bg-danger/10 hover:text-danger disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 aria-hidden="true" className="size-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;