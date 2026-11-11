import Image from "next/image";
import type { IIconGlyphProps } from "@/interface/ui";
import { getIconGeometry } from "@/services/iconRegistry";

/**
 * Computes an integer box that fits inside `width` x `height` while preserving
 * the icon's intrinsic aspect ratio.
 *
 * Figma exports icons at fractional sizes (e.g. 14.6667 x 18.3333) while the
 * slot is a rounded box (e.g. 16 x 18). The result is rounded to whole pixels
 * because the browser reports rendered geometry as integers, and Next.js
 * compares that integer against the `width`/`height` attributes — a fractional
 * attribute would always look "modified" and trigger an aspect-ratio warning.
 */
function resolveBox(src: string, width: number, height: number) {
  const geometry = getIconGeometry(src);

  if (!geometry || geometry.width === 0 || geometry.height === 0) {
    return { width: Math.round(width), height: Math.round(height) };
  }

  const scale = Math.min(width / geometry.width, height / geometry.height);

  return {
    width: Math.round(geometry.width * scale),
    height: Math.round(geometry.height * scale),
  };
}

/**
 * Fixed-size icon/SVG renderer.
 *
 * The image box keeps the source asset's own aspect ratio and is pinned with an
 * explicit inline size, so Figma SVGs are never stretched with `fill` and the
 * rendered geometry always matches the intrinsic `width`/`height` attributes.
 */
export function IconGlyph({
  src,
  alt,
  width,
  height,
  className = "",
}: IIconGlyphProps) {
  const box = resolveBox(src, width, height);

  return (
    <span
      aria-hidden={alt === ""}
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <Image
        src={src}
        alt={alt}
        width={box.width}
        height={box.height}
        unoptimized
        className="block max-w-none"
        style={{ width: `${box.width}px`, height: `${box.height}px` }}
      />
    </span>
  );
}