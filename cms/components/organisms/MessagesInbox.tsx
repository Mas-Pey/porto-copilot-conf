"use client";

import { useState } from "react";
import { ChevronDown, Mail, RefreshCw } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { EmptyState } from "@/components/atoms/EmptyState";
import { SkeletonList } from "@/components/atoms/Skeleton";
import { StatusPill } from "@/components/atoms/StatusPill";
import { SurfacePanel } from "@/components/atoms/SurfacePanel";
import { PageHeader } from "@/components/molecules/PageHeader";
import { useMessages } from "@/hooks/useMessages";
import type { IMessage } from "@/interface/api";
import { cn } from "@/utils/cn";
import { formatDateTime, getInitials, truncate } from "@/utils/format";

const PREVIEW_LENGTH = 120;

interface IMessageRowProps {
  readonly message: IMessage;
  readonly isExpanded: boolean;
  readonly onToggle: () => void;
}

/** Collapsible message row: sender, date, and the full body on demand. */
function MessageRow({ message, isExpanded, onToggle }: IMessageRowProps) {
  const isLong = message.message.length > PREVIEW_LENGTH;

  return (
    <article className="flex flex-col gap-2 rounded-2xl border border-ink-faint/25 bg-surface-raised p-4 transition-colors hover:border-ink-faint/40">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent-violet/30 bg-accent-violet/10 font-mono text-[11px] font-semibold text-accent-violet"
        >
          {getInitials(message.name)}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h3 className="text-sm font-semibold text-ink-strong">
              {message.name}
            </h3>
            <a
              href={`mailto:${message.email}`}
              className="truncate font-mono text-[11px] text-ink-muted underline-offset-2 transition-colors hover:text-accent-violet hover:underline"
            >
              {message.email}
            </a>
          </div>
          <p className="font-mono text-[10px] text-ink-faint">
            {formatDateTime(message.createdAt)}
          </p>
        </div>

        <StatusPill tone="accent" className="shrink-0">
          #{message.id}
        </StatusPill>
      </div>

      <p
        className={cn(
          "text-sm leading-relaxed whitespace-pre-line text-ink-body",
          !isExpanded && isLong && "line-clamp-2",
        )}
      >
        {isExpanded || !isLong
          ? message.message
          : truncate(message.message, PREVIEW_LENGTH)}
      </p>

      {isLong ? (
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          className="inline-flex w-fit items-center gap-1 text-xs font-medium text-accent-violet transition-opacity hover:opacity-80"
        >
          {isExpanded ? "Show less" : "Read full message"}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "size-3.5 transition-transform",
              isExpanded && "rotate-180",
            )}
          />
        </button>
      ) : null}
    </article>
  );
}

/** Organism: inbound contact-form inbox. */
export function MessagesInbox() {
  const messages = useMessages();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const items = messages.data?.data ?? [];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Inbox"
        title="Messages"
        description="Every submission from the public contact form, newest first."
        actions={
          <Button
            variant="ghost"
            onClick={() => {
              void messages.refetch();
            }}
            isLoading={messages.isFetching && !messages.isPending}
            leadingIcon={<RefreshCw aria-hidden="true" className="size-4" />}
          >
            Refresh
          </Button>
        }
      />

      {messages.isPending ? <SkeletonList count={4} /> : null}

      {messages.error !== null ? (
        <SurfacePanel className="flex flex-col items-start gap-3">
          <p className="text-sm text-danger">{messages.error.message}</p>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              void messages.refetch();
            }}
          >
            Try again
          </Button>
        </SurfacePanel>
      ) : null}

      {messages.data !== undefined && items.length === 0 ? (
        <EmptyState
          icon={<Mail aria-hidden="true" className="size-5" />}
          title="Inbox is empty"
          description="When a visitor submits the contact form, the message lands here."
        />
      ) : null}

      {items.length > 0 ? (
        <>
          <p className="font-mono text-[11px] text-ink-faint">
            {items.length} {items.length === 1 ? "message" : "messages"}
          </p>
          <div className="flex flex-col gap-3">
            {items.map((message) => (
              <MessageRow
                key={message.id}
                message={message}
                isExpanded={expandedId === message.id}
                onToggle={() => {
                  setExpandedId((current) =>
                    current === message.id ? null : message.id,
                  );
                }}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default MessagesInbox;