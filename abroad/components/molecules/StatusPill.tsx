import type { IStatusIndicator } from "@/interface/abroad";
import { MonoLabel } from "@/components/atoms/MonoLabel";
import { Pill } from "@/components/atoms/Pill";
import { StatusDot } from "@/components/atoms/StatusDot";

/** Props for the status pill molecule. */
export interface IStatusPillProps {
  readonly status: IStatusIndicator;
}

/**
 * "STREAM READY" style live indicator: pill, dot, and mono label.
 * Composed from the `Pill`, `StatusDot`, and `MonoLabel` atoms.
 */
export function StatusPill({ status }: IStatusPillProps) {
  return (
    <Pill
      tone="teal"
      className="shrink-0 bg-[rgba(23,27,38,0.8)] backdrop-blur-[12px]"
    >
      <StatusDot tone="teal" size="md" withGlow={status.isLive} />
      <MonoLabel tone="neutral" className="whitespace-nowrap">
        {status.label}
      </MonoLabel>
    </Pill>
  );
}