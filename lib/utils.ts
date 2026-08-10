import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

const FALLBACK_IMAGE = '/dark-logo.png'

export const getImageSrc = (
  url?: string | null,
  width: number = 1200
): string => {
  if (!url) return FALLBACK_IMAGE

  const cleanUrl = url.trim()
  if (!cleanUrl) return FALLBACK_IMAGE

  try {
    // --- Google Drive ---
    const driveMatch =
      cleanUrl.match(/\/d\/(.*?)\//) || cleanUrl.match(/id=(.*?)(?:&|$)/)

    if (driveMatch) {
      const id = driveMatch[1]
      // LH3 supports dynamic resizing via =wXXX suffix
      return `https://lh3.googleusercontent.com/d/${id}=w${width}`
    }

    // --- Validate URL ---
    const parsed = new URL(cleanUrl)

    // --- Unsplash optimization ---
    if (parsed.hostname.includes('unsplash.com')) {
      parsed.searchParams.set('auto', 'format')
      parsed.searchParams.set('fit', 'crop')
      parsed.searchParams.set('q', '80')
      parsed.searchParams.set('w', width.toString())
      return parsed.toString()
    }

    // --- Basic image extension check ---
    if (!/\.(jpg|jpeg|png|webp|avif)$/i.test(parsed.pathname)) {
      return FALLBACK_IMAGE
    }

    return parsed.toString()
  } catch {
    return FALLBACK_IMAGE
  }
}

export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
