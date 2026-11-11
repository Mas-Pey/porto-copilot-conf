import { cn } from "@/utils/cn";

export interface ISectionHeadingProps {
  readonly title: string;
  readonly description?: string;
  readonly className?: string;
}

/** Heading block used at the top of a dashboard panel. */
export function SectionHeading({
  title,
  description,
  className,
}: ISectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <h2 className="font-sans text-base font-semibold text-ink-strong">
        {title}
      </h2>
      {description !== undefined ? (
        <p className="text-sm text-ink-muted">{description}</p>
      ) : null}
    </div>
  );
}

export default SectionHeading;