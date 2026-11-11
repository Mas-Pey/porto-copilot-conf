"use client";

import { Button } from "@/components/atoms/Button";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { SurfacePanel } from "@/components/atoms/SurfacePanel";
import { PageHeader } from "@/components/molecules/PageHeader";
import { ProfileForm } from "@/components/organisms/ProfileForm";
import { useProfile } from "@/hooks/useProfile";

const PAGE_COPY = {
  eyebrow: "Content",
  title: "Profile",
  description: "The hero copy and stat cards shown on the public site.",
};

/** Skeleton shown while the persisted profile is fetched. */
function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader {...PAGE_COPY} />
      <SurfacePanel className="flex flex-col gap-3">
        <SkeletonBlock className="h-4 w-1/3" />
        <SkeletonBlock className="h-10 w-full" />
        <SkeletonBlock className="h-24 w-full" />
        <SkeletonBlock className="h-10 w-2/3" />
      </SurfacePanel>
    </div>
  );
}

/**
 * Organism: profile + hero stats editor.
 *
 * `ProfileForm` is keyed by the profile's `updatedAt`, so a successful save
 * (or a refetch returning new data) remounts it with fresh defaults. That
 * avoids seeding state inside an effect — which both React 19 and the
 * set-state-in-effect lint rule forbid.
 */
export function ProfileEditor() {
  const profile = useProfile();

  if (profile.isPending) {
    return <ProfileSkeleton />;
  }

  if (profile.error !== null) {
    return (
      <div className="flex flex-col gap-6">
        <PageHeader {...PAGE_COPY} />
        <SurfacePanel className="flex flex-col items-start gap-3">
          <p className="text-sm text-danger">{profile.error.message}</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              void profile.refetch();
            }}
          >
            Try again
          </Button>
        </SurfacePanel>
      </div>
    );
  }

  return (
    <ProfileForm
      key={`${profile.data.id}-${profile.data.updatedAt}`}
      profile={profile.data}
    />
  );
}

export default ProfileEditor;