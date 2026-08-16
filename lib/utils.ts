import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { MediaUrl } from '@/types/experience'

/* ─────────────────────────────────────────────
   CLASSNAMES
───────────────────────────────────────────── */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* ─────────────────────────────────────────────
   FORMATTING
───────────────────────────────────────────── */

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

/* ─────────────────────────────────────────────
   MEDIA
───────────────────────────────────────────── */

export const FALLBACK_IMAGE = '/dark-logo.png'

export type ImageInput =
  | string
  | MediaUrl
  | { src: string; alt?: string }
  | null
  | undefined

export interface ResolvedImage {
  src: string
  alt: string
}

export function getImageSrc(
  url?: string | null,
  width = 1200,
): string {
  if (!url) {
    return FALLBACK_IMAGE
  }

  const cleanUrl = url.trim()

  if (!cleanUrl) {
    return FALLBACK_IMAGE
  }

  try {
    /* ───────── Google Drive ───────── */

    const driveMatch =
      cleanUrl.match(/\/d\/([^/]+)/) ??
      cleanUrl.match(/[?&]id=([^&]+)/)

    if (driveMatch) {
      const id = driveMatch[1]

      return `https://lh3.googleusercontent.com/d/${id}=w${width}`
    }

    /* ───────── URL validation ───────── */

    const parsed = new URL(cleanUrl)

    /* ───────── Unsplash ───────── */

    if (parsed.hostname.includes('unsplash.com')) {
      parsed.searchParams.set('auto', 'format')
      parsed.searchParams.set('fit', 'crop')
      parsed.searchParams.set('q', '80')
      parsed.searchParams.set('w', width.toString())

      return parsed.toString()
    }

    /* ───────── Image extension ───────── */

    const pathname = parsed.pathname.toLowerCase()

    if (
      !/\.(jpg|jpeg|png|webp|avif)$/i.test(pathname)
    ) {
      return FALLBACK_IMAGE
    }

    return parsed.toString()
  } catch {
    return FALLBACK_IMAGE
  }
}

/**
 * Normalizes an image into a consistent shape
 * for UI components.
 */
export function getImage(
  image: ImageInput,
  fallbackAlt: string,
  width = 1200,
): ResolvedImage | null {
  if (!image) {
    return null
  }

  if (typeof image === 'string') {
    return {
      src: getImageSrc(image, width),
      alt: fallbackAlt,
    }
  }

  // Handle MediaUrl (url) or object with src
  if ('url' in image && image.url) {
    return {
      src: getImageSrc(image.url, width),
      alt: image.alt?.trim() || fallbackAlt,
    }
  }

  if ('src' in image && image.src) {
    return {
      src: getImageSrc(image.src, width),
      alt: image.alt?.trim() || fallbackAlt,
    }
  }

  return null
}

/**
 * Resolves multiple images while removing
 * invalid / missing entries.
 */
export function getImages(
  images: ImageInput[],
  fallbackAlt: string,
  width = 1200,
): ResolvedImage[] {
  return images
    .map((image) =>
      getImage(image, fallbackAlt, width),
    )
    .filter(
      (image): image is ResolvedImage =>
        image !== null,
    )
}

/* ─────────────────────────────────────────────
   VALIDATION
───────────────────────────────────────────── */

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email.trim(),
  )