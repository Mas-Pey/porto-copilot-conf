"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { SurfacePanel } from "@/components/atoms/SurfacePanel";
import { TextAreaField, TextField } from "@/components/atoms/TextField";
import { PageHeader } from "@/components/molecules/PageHeader";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { useUpdateProfile } from "@/hooks/useProfile";
import type { IProfile, IUpdateProfileBody } from "@/interface/api";
import {
  profileFormSchema,
  type TProfileFormValues,
  type TStatItemValues,
} from "@/interface/schemas";
import { toast } from "@/store/useToastStore";

/** Max stat cards the backend accepts (TypeBox `maxItems: 12`). */
const MAX_STATS = 12;

/** A single editable stat row. */
const EMPTY_STAT: TStatItemValues = { value: "", label: "" };

/** Per-row validation messages for the stat editor. */
type TStatErrors = readonly (string | undefined)[];

/** Maps a persisted profile onto form values. */
function toFormValues(profile: IProfile): TProfileFormValues {
  const stats =
    profile.stats.length > 0
      ? profile.stats.map((stat) => ({ value: stat.value, label: stat.label }))
      : [EMPTY_STAT];

  return {
    headline: profile.headline,
    bio: profile.bio,
    location: profile.location,
    status: profile.status,
    education: profile.education,
    stats,
  };
}

interface IProfileFormProps {
  readonly profile: IProfile;
}

/**
 * The editable form itself.
 *
 * Stat rows are plain controlled state rather than `useFieldArray` (which seeds
 * `crypto.randomUUID()` during render and breaks Next.js prerendering) or
 * `watch` (which the React Compiler cannot memoize). The assembled payload is
 * still validated against the same Zod schema before submission, and the parent
 * remounts this component after each save to re-seed the defaults.
 */
export function ProfileForm({ profile }: IProfileFormProps) {
  const updateProfile = useUpdateProfile();

  const initial = toFormValues(profile);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<TProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: { ...initial, stats: [] },
  });

  const [statRows, setStatRows] = useState<readonly TStatItemValues[]>(
    initial.stats,
  );
  const [statErrors, setStatErrors] = useState<TStatErrors>([]);

  const isBusy = updateProfile.isPending;

  // The stats half of the dirty check; RHF only tracks the identity fields.
  const hasStatChanges =
    statRows.length !== initial.stats.length ||
    statRows.some(
      (row, index) =>
        row.value !== (initial.stats[index]?.value ?? "") ||
        row.label !== (initial.stats[index]?.label ?? ""),
    );
  const hasChanges = isDirty || hasStatChanges;

  const addStat = (): void => {
    if (statRows.length >= MAX_STATS) {
      return;
    }

    setStatRows((current) => [...current, EMPTY_STAT]);
    setStatErrors([]);
  };

  const removeStat = (index: number): void => {
    if (statRows.length === 1) {
      return;
    }

    setStatRows((current) =>
      current.filter((_, position) => position !== index),
    );
    setStatErrors([]);
  };

  const updateStat = (
    index: number,
    field: keyof TStatItemValues,
    value: string,
  ): void => {
    setStatRows((current) =>
      current.map((row, position) =>
        position === index ? { ...row, [field]: value } : row,
      ),
    );
    setStatErrors([]);
  };

  /** Validates the identity fields plus the externally managed stat rows. */
  const submit = handleSubmit((values) => {
    const parsedStats = profileFormSchema.shape.stats.safeParse(
      statRows.map((row) => ({
        value: row.value.trim(),
        label: row.label.trim(),
      })),
    );

    if (!parsedStats.success) {
      const messages = new Map<number, string>();

      for (const issue of parsedStats.error.issues) {
        const index = issue.path[0];
        if (typeof index === "number" && !messages.has(index)) {
          messages.set(index, issue.message);
        }
      }

      setStatErrors(statRows.map((_, index) => messages.get(index)));
      toast.danger("Fix the highlighted stat rows before saving.");
      return;
    }

    setStatErrors([]);

    const body: IUpdateProfileBody = {
      headline: values.headline.trim(),
      bio: values.bio.trim(),
      location: values.location.trim(),
      status: values.status.trim(),
      education: values.education.trim(),
      stats: parsedStats.data.map((stat) => ({
        value: stat.value,
        label: stat.label,
      })),
    };

    updateProfile.mutate(body, {
      onSuccess: () => {
        toast.success("Profile updated.");
      },
      onError: (error) => {
        toast.danger(error.message);
      },
    });
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Content"
        title="Profile"
        description="The hero copy and stat cards shown on the public site."
        actions={
          <Button
            variant="primary"
            onClick={() => {
              void submit();
            }}
            isLoading={isBusy}
            disabled={!hasChanges}
          >
            Save profile
          </Button>
        }
      />

      <form
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
        className="flex flex-col gap-4"
      >
        <SurfacePanel className="flex flex-col gap-4">
          <SectionHeading
            title="Identity"
            description="Headline, availability, and background."
          />

          <TextField
            label="Headline"
            placeholder="AI Native Engineer (Fullstack)"
            error={errors.headline?.message}
            disabled={isBusy}
            {...register("headline")}
          />

          <TextAreaField
            label="Bio"
            rows={6}
            placeholder="A short narrative about what you build and how."
            error={errors.bio?.message}
            disabled={isBusy}
            {...register("bio")}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              label="Location"
              placeholder="Jakarta, Indonesia"
              error={errors.location?.message}
              disabled={isBusy}
              {...register("location")}
            />
            <TextField
              label="Status"
              placeholder="Open to opportunities"
              error={errors.status?.message}
              disabled={isBusy}
              {...register("status")}
            />
          </div>

          <TextField
            label="Education"
            placeholder="B.Sc. Computer Science"
            error={errors.education?.message}
            disabled={isBusy}
            {...register("education")}
          />
        </SurfacePanel>

        <SurfacePanel className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <SectionHeading
              title="Hero stats"
              description={`Up to ${MAX_STATS} cards rendered under the hero.`}
            />
            <Button
              variant="secondary"
              size="sm"
              disabled={isBusy || statRows.length >= MAX_STATS}
              onClick={addStat}
              leadingIcon={<Plus aria-hidden="true" className="size-3.5" />}
            >
              Add stat
            </Button>
          </div>

          <ul className="flex flex-col gap-3">
            {statRows.map((stat, index) => (
              <li
                key={`stat-row-${index}`}
                className="grid gap-3 rounded-xl border border-ink-faint/25 bg-surface-inset/30 p-3 sm:grid-cols-[1fr_2fr_auto] sm:items-end"
              >
                <TextField
                  label="Value"
                  placeholder="12+"
                  value={stat.value}
                  error={statErrors[index]}
                  disabled={isBusy}
                  onChange={(event) => {
                    updateStat(index, "value", event.target.value);
                  }}
                />
                <TextField
                  label="Label"
                  placeholder="Projects shipped"
                  value={stat.label}
                  error={statErrors[index]}
                  disabled={isBusy}
                  onChange={(event) => {
                    updateStat(index, "label", event.target.value);
                  }}
                />
                <Button
                  variant="danger"
                  size="sm"
                  disabled={isBusy || statRows.length === 1}
                  onClick={() => {
                    removeStat(index);
                  }}
                  aria-label={`Remove stat ${index + 1}`}
                  leadingIcon={
                    <Trash2 aria-hidden="true" className="size-3.5" />
                  }
                >
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        </SurfacePanel>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="submit"
            variant="primary"
            isLoading={isBusy}
            disabled={!hasChanges}
          >
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileForm;