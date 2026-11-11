import Image from "next/image";
import type { IIconTileProps } from "@/interface/ui";

/**
 * Rounded bordered square that frames a single icon.
 * Presentational only; the icon source is supplied via props.
 *
 * Sizing is uniform (`size-full` + `object-contain`) so the SVG's intrinsic
 * aspect ratio is preserved without `next/image` dimension warnings.
 */
export function IconTile({ src, alt, size = "md" }: IIconTileProps) {
  const boxClass = size === "sm" ? "size-[32px]" : "size-[40px]";

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-[8px] border border-[rgba(255,255,255,0.05)] bg-[#262a35] p-px ${boxClass}`}
    >
      <span className="relative block size-[17px]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="17px"
          unoptimized
          className="object-contain"
        />
      </span>
    </span>
  );
}