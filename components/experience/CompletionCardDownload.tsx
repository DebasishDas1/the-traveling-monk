'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'

import type { Trek } from '@/types/experience'

import { Button } from '@/components/ui/button'

interface CompletionCardDownloadProps {
  trek: Trek
  photoUrl: string
  completionDate: string
  className?: string
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
  }).format(new Date(`${date}T00:00:00`))
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()

    image.crossOrigin = 'anonymous'

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error('Failed to load image'))

    image.src = src
  })
}

function drawTextWithEllipsis(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
) {
  if (ctx.measureText(text).width <= maxWidth) {
    return text
  }

  let result = text

  while (result.length > 0 && ctx.measureText(`${result}…`).width > maxWidth) {
    result = result.slice(0, -1)
  }

  return `${result}…`
}

export function CompletionCardDownload({
  trek,
  photoUrl,
  completionDate,
  className,
}: CompletionCardDownloadProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (isDownloading) return

    setIsDownloading(true)

    try {
      const image = await loadImage(photoUrl)

      const width = image.naturalWidth
      const height = image.naturalHeight

      if (!width || !height) {
        throw new Error('Invalid image dimensions')
      }

      const canvas = document.createElement('canvas')

      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('Canvas is not supported')
      }

      /*
       * Photo
       */
      ctx.drawImage(image, 0, 0, width, height)

      /*
       * Scale everything relative to
       * the original image width.
       */
      const scale = width / 1600

      const padding = Math.max(40, Math.round(80 * scale))

      /*
       * Bottom gradient
       */
      const gradient = ctx.createLinearGradient(0, height * 0.42, 0, height)

      gradient.addColorStop(0, 'rgba(0,0,0,0)')

      gradient.addColorStop(0.55, 'rgba(0,0,0,0.18)')

      gradient.addColorStop(1, 'rgba(0,0,0,0.7)')

      ctx.fillStyle = gradient

      ctx.fillRect(0, 0, width, height)

      /*
       * Typography sizes
       */
      const titleSize = Math.max(36, Math.round(82 * scale))

      const subtitleSize = Math.max(18, Math.round(32 * scale))

      /*
       * Trek title
       */
      ctx.font = `600 ${titleSize}px sans-serif`

      ctx.fillStyle = 'rgba(255,255,255,0.72)'

      const title = drawTextWithEllipsis(ctx, trek.title, width - padding * 2)

      ctx.fillText(title, padding, height - padding * 2.1)

      /*
       * Completion information
       */
      ctx.font = `500 ${subtitleSize}px sans-serif`

      ctx.fillStyle = 'rgba(255,255,255,0.9)'

      const subtitle = `The Traveling Monk | Completed ${formatDate(completionDate)}`

      const subtitleText = drawTextWithEllipsis(
        ctx,
        subtitle,
        width - padding * 2
      )

      ctx.fillText(subtitleText, padding, height - padding)

      /*
       * Generate PNG
       */
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png', 1)
      })

      if (!blob) {
        throw new Error('Failed to create image')
      }

      /*
       * Download
       */
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')

      link.href = url
      link.download = `${trek.slug}-completion.png`

      document.body.appendChild(link)
      link.click()
      link.remove()

      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Failed to download completion card:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      className={className ?? 'h-10 rounded-lg text-sm'}
    >
      {isDownloading ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Preparing...
        </>
      ) : (
        <>
          <Download className="mr-2 size-4" />
          Download
        </>
      )}
    </Button>
  )
}
