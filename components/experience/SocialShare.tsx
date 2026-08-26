'use client'

import { memo, useCallback, useMemo } from 'react'
import { Download, X } from 'lucide-react'
import Link from 'next/link'

import type { Trek } from '@/types/experience'

import {
  facebookLink,
  linkedinLink,
  whatsappLink,
  xLink,
} from '@/lib/social-links'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Media } from '../common'

interface SocialShareProps {
  open: boolean
  trek: Trek
  photoUrl: string
  badgeUrl: string
  completionDate: string
  quote: string
  onClose: () => void
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
  }).format(new Date(`${date}T00:00:00`))
}

const SocialShareContent = memo(function SocialShareContent({
  trek,
  photoUrl,
  badgeUrl,
  completionDate,
  quote,
  onClose,
}: Omit<SocialShareProps, 'open'>) {
  const shareText = useMemo(() => {
    return [
      `I just completed the ${trek.title} trek with @TheTravelingMonk!`,
      quote ? `"${quote}"` : '',
      '🏔️',
    ]
      .filter(Boolean)
      .join(' ')
  }, [trek.title, quote])

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    return window.location.href
  }, [])

  const socialPlatforms = useMemo(() => {
    const encodedText = encodeURIComponent(shareText)
    const encodedUrl = encodeURIComponent(shareUrl)

    return [
      {
        name: 'X',
        href: `${xLink}?text=${encodedText}`,
        label: 'Share on X',
      },
      {
        name: 'Facebook',
        href: `${facebookLink}?u=${encodedUrl}`,
        label: 'Share on Facebook',
      },
      {
        name: 'LinkedIn',
        href: `${linkedinLink}?url=${encodedUrl}&summary=${encodedText}`,
        label: 'Share on LinkedIn',
      },
      {
        name: 'WhatsApp',
        href: `${whatsappLink}?text=${encodedText}`,
        label: 'Share on WhatsApp',
      },
      {
        name: 'Telegram',
        href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
        label: 'Share on Telegram',
      },
    ]
  }, [shareText, shareUrl])

  const downloadBadgeImage = useCallback(() => {
    const link = document.createElement('a')

    link.href = badgeUrl
    link.download = `${trek.slug}-completion-badge.png`
    link.target = '_blank'
    link.rel = 'noopener noreferrer'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [badgeUrl, trek.slug])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <DialogContent
      showCloseButton={false}
      className="
        w-[calc(100%-2rem)]
        gap-0
        overflow-hidden
        rounded-2xl
        border-border
        bg-background
        p-0
        shadow-xl
      "
    >
      {/* Header */}
      <DialogHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4 sm:px-6">
        <div>
          <DialogTitle className="text-base font-semibold">
            Trek conquered
          </DialogTitle>

          <p className="mt-0.5 text-xs text-muted-foreground">
            Your journey is complete.
          </p>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="size-8 rounded-full text-muted-foreground hover:text-foreground"
          aria-label="Close"
        >
          <X className="size-4" />
        </Button>
      </DialogHeader>

      <div className="space-y-6 p-5 sm:p-6">
        {/* Photo */}
        <Media
          src={photoUrl}
          alt={`Photo from ${trek.title}`}
          priority
          sizes="(max-width: 640px) calc(100vw - 40px), 432px"
        />

        {/* Trek info */}
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight">{trek.title}</h2>

          <p className="text-xs text-muted-foreground">
            Completed {formatDate(completionDate)}
          </p>

          {quote && (
            <p className="pt-3 text-sm leading-relaxed text-muted-foreground">
              “{quote}”
            </p>
          )}
        </div>

        {/* Share */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {socialPlatforms.map((platform) => (
            <Button key={platform.name} asChild variant="outline">
              <Link
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={platform.label}
              >
                {platform.name}
              </Link>
            </Button>
          ))}
          <Button
            onClick={downloadBadgeImage}
            className="h-10 w-full rounded-lg text-sm"
          >
            <Download className="mr-2 size-4" />
            Download
          </Button>
        </div>
      </div>
    </DialogContent>
  )
})

export function SocialShare({ open, onClose, ...props }: SocialShareProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose()
      }}
    >
      {open && <SocialShareContent {...props} onClose={onClose} />}
    </Dialog>
  )
}
