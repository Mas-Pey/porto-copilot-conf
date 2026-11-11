import Image from "next/image";
import type { IBrand } from "@/interface/abroad";
import { MonoLabel } from "@/components/atoms/MonoLabel";

/** Props for the brand lockup molecule. */
export interface IBrandLockupProps {
  readonly brand: IBrand;
}

/**
 * Brand mark + wordmark + division separator, as shown in the header.
 */
export function BrandLockup({ brand }: IBrandLockupProps) {
  return (
    <div className="flex shrink-0 items-center gap-[12px]">
      <span className="flex size-[32px] shrink-0 items-center justify-center rounded-[8px] border border-[rgba(255,255,255,0.1)] bg-[#262a35] p-px">
        <span className="relative block h-[12px] w-[15px]">
          <Image
            src={brand.markSrc}
            alt={`${brand.name} logo`}
            fill
            sizes="15px"
            unoptimized
            priority
            className="object-contain"
          />
        </span>
      </span>

      <span className="font-sans text-[20px] leading-[28px] font-bold tracking-[-0.5px] whitespace-nowrap text-[#dfe2f1]">
        {brand.name}
      </span>

      <span className="font-sans text-[16px] leading-[24px] text-[#464554]">
        /
      </span>

      <MonoLabel className="tracking-[0.55px] whitespace-nowrap">
        {brand.division}
      </MonoLabel>
    </div>
  );
}