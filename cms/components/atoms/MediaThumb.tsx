"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

import { cn } from "@/utils/cn";

export interface IMediaThumbProps {
  /** Source URL. Relative backend paths are resolved against the API origin. */
  readonly src: string;
  readonly alt: string;
  readonly className?: string;
  readonly imgClassName?: string;
  readonly rounded?: boolean;
}

/**
 * Normalizes asset paths coming from the backend.
 *
 * The seeded data stores site-relative paths (`/images/x.png`) that belong to
 * the **portfolio** app, not the CMS or the API. They are resolved against
 * `NEXT_PUBLIC_ASSET_BASE_URL` when configured, otherwise against the API
 * origin. Anything that fails to load degrades into a neutral placeholder
 * instead of a broken image icon.
 */
function resolveSrc(src: string): string {
  if (/^(https?:)?\/\//i.test(src) || src.startsWith("data:")) {
    return src;
  }

  const assetBase = process.env.NEXT_PUBLIC_ASSET_BASE_URL ?? "";
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
  const origin = (
    assetBase.length > 0 ? assetBase : apiBase.replace(/\/api\/?$/, "")
  ).replace(/\/+$/, "");

  return `${origin}${src.startsWith("/") ? src : `/${src}`}`;
}

/** Image with a graceful fallback used for project thumbnails and skill badges. */
export function MediaThumb({
  src,
  alt,
  className,
  imgClassName,
  rounded = false,
}: IMediaThumbProps) {
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-surface-inset",
        rounded && "rounded-lg",
        className,
      )}
    >
      {hasFailed ? (
        <div className="flex size-full items-center justify-center text-ink-faint">
          <ImageOff aria-hidden="true" className="size-5" />
          <span className="sr-only">{alt} could not be loaded</span>
        </div>
      ) : (
        // Remote screenshots come from arbitrary origins, so `next/image`
        // would need a per-host allowlist. The dashboard uses a plain <img>.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolveSrc(src)}
          alt={alt}
          loading="lazy"
          onError={() => {
            setHasFailed(true);
          }}
          className={cn("size-full object-cover", imgClassName)}
        />
      )}
    </div>
  );
}

export default MediaThumb;