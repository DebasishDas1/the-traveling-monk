'use client'

import { X } from 'lucide-react'
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
import { CompletionCardDownload } from './CompletionCardDownload'

interface SocialShareProps {
  open: boolean
  trek: Trek
  photoUrl: string
  badgeUrl?: string
  completionDate: string
  quote: string
  onClose: () => void
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'long',
  }).format(new Date(`${date}T00:00:00`))
}

function buildShareLinks(text: string, url: string) {
  const encodedText = encodeURIComponent(text)
  const encodedUrl = encodeURIComponent(url)

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
}

function SocialShareContent({
  trek,
  photoUrl,
  completionDate,
  quote,
  onClose,
}: Omit<SocialShareProps, 'open'>) {
  const shareText = [
    `I just completed the ${trek.title} trek with @TheTravelingMonk!`,
    quote ? `"${quote}"` : null,
    '🏔️',
  ]
    .filter(Boolean)
    .join(' ')

  const shareUrl = `${window.location.origin}/experiences/${trek.slug}`

  const socialPlatforms = buildShareLinks(shareText, shareUrl)

  return (
    <DialogContent
      showCloseButton={false}
      className="
        gap-0
        overflow-hidden
        rounded-2xl
        border-border
        bg-background
        p-0
        shadow-xl
      "
    >
      <DialogHeader className="flex flex-row items-center justify-between px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <DialogTitle className="text-2xl font-semibold">
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
          onClick={onClose}
          className="
            size-8
            shrink-0
            rounded-full
            text-muted-foreground
            hover:bg-muted
            hover:text-foreground
          "
          aria-label="Close dialog"
        >
          <X className="size-4" />
        </Button>
      </DialogHeader>

      <div className="space-y-5 px-3 pb-5 sm:px-4 sm:pb-6">
        {/* Completion preview */}
        <div className="relative overflow-hidden rounded-xl">
          <div className="aspect-video">
            <Media
              src={photoUrl}
              alt={`Photo from ${trek.title}`}
              priority
              sizes="
                (max-width: 640px)
                calc(100vw - 40px),
                480px
              "
              className="h-full w-full object-cover"
            />
          </div>

          {/* Bottom fade */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-x-0 bottom-0
              h-56
              bg-linear-to-t
              from-black/45
              via-black/15
              via-45%
              to-transparent
            "
          />

          {/* Local readability glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-16
              -left-16
              size-80
              rounded-full
              bg-black/20
              blur-3xl
            "
          />

          {/* Text */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-5 sm:px-5 sm:pb-6">
            <div className="max-w-[92%]">
              <h2
                className="
                  text-4xl
                  font-semibold
                  leading-[0.95]
                  tracking-[-0.035em]
                  text-white/60
                  drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]
                "
              >
                {trek.title}
              </h2>

              <p
                className="
                  mt-2
                  text-sm
                  font-medium
                  tracking-wide
                  text-white/85
                  drop-shadow-[0_1px_6px_rgba(0,0,0,0.35)]
                  sm:text-base
                "
              >
                The Traveling Monk | Completed {formatDate(completionDate)}
              </p>
            </div>
          </div>
        </div>

        {/* Share actions */}
        <div
          aria-label="Share your trek"
          className="
            grid
            grid-cols-2
            gap-2
            sm:grid-cols-3
          "
        >
          {socialPlatforms.map(({ name, href, label }) => (
            <Button
              key={name}
              variant="outline"
              className="h-10 rounded-lg text-sm"
            >
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                {name}
              </Link>
            </Button>
          ))}

          <CompletionCardDownload
            trek={trek}
            photoUrl={photoUrl}
            completionDate={completionDate}
            className="h-10 rounded-lg text-sm"
          />
        </div>
      </div>
    </DialogContent>
  )
}

export function SocialShare({ open, onClose, ...props }: SocialShareProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose()
        }
      }}
    >
      {open && <SocialShareContent {...props} onClose={onClose} />}
    </Dialog>
  )
}
