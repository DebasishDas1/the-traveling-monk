"use client";

import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * `ResponsiveImage` is a thin wrapper around Next.js `Image` that supplies a
 * sensible default `sizes` attribute for images that use `fill`.
 *
 * It mirrors the defaults used in the `Media` component, but can be used when
 * you need direct access to the `Image` API (e.g., you want to control the
 * layout container yourself).
 */
export function ResponsiveImage({
  sizes = "(max-width: 640px) 100vw, 640px",
  alt = "",
  className,
  ...props
}: ImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}
