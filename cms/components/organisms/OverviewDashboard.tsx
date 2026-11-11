"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  FolderKanban,
  Inbox,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { EmptyState } from "@/components/atoms/EmptyState";
import { SkeletonBlock } from "@/components/atoms/Skeleton";
import { StatCard } from "@/components/atoms/StatCard";
import { StatusPill } from "@/components/atoms/StatusPill";
import { SurfacePanel } from "@/components/atoms/SurfacePanel";
import { PageHeader } from "@/components/molecules/PageHeader";
import { SectionHeading } from "@/components/molecules/SectionHeading";
import { useDashboardCounts } from "@/hooks/useDashboardCounts";
import { useMessages } from "@/hooks/useMessages";
import { useProfile } from "@/hooks/useProfile";
import { formatDate, truncate } from "@/utils/format";

/** Quantities used by the quick-action shortcuts. */
const RECENT_LIMIT = 4;

/** Organism: dashboard landing page with counters, shortcuts, and activity. */
export function OverviewDashboard() {
  const counts = useDashboardCounts();
  const profile = useProfile();
  const messages = useMessages();

  const recentMessages = (messages.data?.data ?? []).slice(0, RECENT_LIMIT);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Dashboard"
        title="Overview"
        description="A single glance at the content behind the public site."
        actions={
          <>
            <Link href="/projects">
              <Button
                variant="primary"
                leadingIcon={<FolderKanban aria-hidden="true" className="size-4" />}
              >
                New project
              </Button>
            </Link>
            <Link href="/messages">
              <Button
                variant="secondary"
                leadingIcon={<Inbox aria-hidden="true" className="size-4" />}
              >
                View inquiries
              </Button>
            </Link>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Projects"
          value={counts.projects}
          isLoading={counts.isLoading}
          hint="Published case studies"
          tone="accent"
          icon={<FolderKanban aria-hidden="true" className="size-5" />}
        />
        <StatCard
          label="Skills"
          value={counts.skills}
          isLoading={counts.isLoading}
          hint="Badges across all categories"
          tone="success"
          icon={<Sparkles aria-hidden="true" className="size-5" />}
        />
        <StatCard
          label="Messages"
          value={counts.messages}
          isLoading={counts.isLoading}
          hint="Inbound contact submissions"
          tone="danger"
          icon={<Inbox aria-hidden="true" className="size-5" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SurfacePanel className="flex flex-col gap-4">
          <SectionHeading
            title="Profile snapshot"
            description="What visitors read first"
          />

          {profile.isPending ? (
            <div className="flex flex-col gap-2">
              <SkeletonBlock className="h-4 w-3/4" />
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-2/3" />
            </div>
          ) : null}

          {profile.error !== null ? (
            <StatusPill tone="danger">{profile.error.message}</StatusPill>
          ) : null}

          {profile.data !== undefined ? (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <StatusPill tone="accent">{profile.data.status}</StatusPill>
                <span className="text-xs text-ink-muted">
                  {profile.data.location}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-ink-body">
                {truncate(profile.data.headline, 160)}
              </p>
              <dl className="grid grid-cols-2 gap-3 border-t border-ink-faint/25 pt-3">
                {profile.data.stats.slice(0, 4).map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-0.5">
                    <dt className="font-mono text-[10px] tracking-wide text-ink-faint uppercase">
                      {stat.label}
                    </dt>
                    <dd className="font-sans text-lg font-semibold text-ink-strong">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/profile"
                className="inline-flex items-center gap-1 text-xs font-medium text-accent-violet transition-opacity hover:opacity-80"
              >
                <UserRound aria-hidden="true" className="size-3.5" />
                Edit profile
              </Link>
            </div>
          ) : null}
        </SurfacePanel>

        <SurfacePanel className="flex flex-col gap-4">
          <SectionHeading
            title="Latest inquiries"
            description="Newest contact-form messages"
            className="flex-row items-start justify-between"
          />

          {messages.isPending ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 3 }, (_, index) => (
                <SkeletonBlock
                  key={`recent-skeleton-${index}`}
                  className="h-14 w-full"
                />
              ))}
            </div>
          ) : null}

          {messages.error !== null ? (
            <StatusPill tone="danger">{messages.error.message}</StatusPill>
          ) : null}

          {messages.data !== undefined && recentMessages.length === 0 ? (
            <EmptyState
              icon={<Inbox aria-hidden="true" className="size-5" />}
              title="No messages yet"
              description="Inquiries from the public contact form will appear here."
            />
          ) : null}

          {recentMessages.length > 0 ? (
            <ul className="flex flex-col divide-y divide-ink-faint/20">
              {recentMessages.map((message) => (
                <li key={message.id} className="flex flex-col gap-1 py-2.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate text-sm font-medium text-ink-strong">
                      {message.name}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-ink-faint">
                      {formatDate(message.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs text-ink-muted">
                    {truncate(message.message, 90)}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}

          <Link
            href="/messages"
            className="inline-flex items-center gap-1 text-xs font-medium text-accent-violet transition-opacity hover:opacity-80"
          >
            Open inbox
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Link>
        </SurfacePanel>
      </div>
    </div>
  );
}

export default OverviewDashboard;