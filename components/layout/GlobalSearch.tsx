'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, MapPin, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { trekData } from '@/lib/data/trek-data'
import { getawaysData } from '@/lib/data/getaway-data'
import { internationalData } from '@/lib/data/international-data'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

type SearchExperience = {
  id: string
  title: string
  category: string
  location: string
  href: string
  keywords: string[]
}

const toKeywords = (...values: Array<string | undefined>): string[] => {
  return values.filter((value): value is string => Boolean(value?.trim()))
}

const experiences: SearchExperience[] = [
  ...trekData.map((experience) => ({
    id: `trek-${experience.slug}`,
    title: experience.title,
    category: 'Trips',
    location: experience.location,
    href: `/experiences/trek/${experience.slug}`,
    keywords: toKeywords(
      experience.title,
      experience.tagline,
      experience.location,
      experience.region,
      experience.slug,
      ...experience.highlights
    ),
  })),

  ...getawaysData.map((experience) => ({
    id: `getaway-${experience.slug}`,
    title: experience.name,
    category: 'Escapes',
    location: experience.location,
    href: `/experiences/getaway/${experience.slug}`,
    keywords: toKeywords(
      experience.name,
      experience.tagline,
      experience.location,
      experience.region,
      experience.slug,
      ...experience.highlights
    ),
  })),

  ...internationalData.map((experience) => ({
    id: `international-${experience.slug}`,
    title: experience.name,
    category: 'International trips',
    location: experience.country,
    href: `/experiences/international/${experience.slug}`,
    keywords: toKeywords(
      experience.name,
      experience.tagline,
      experience.country,
      experience.location,
      experience.slug,
      ...experience.highlights
    ),
  })),
]

const browseLinks = [
  {
    label: 'Trips',
    href: '/experiences/trek',
  },
  {
    label: 'Escapes',
    href: '/experiences/getaway',
  },
  {
    label: 'International trips',
    href: '/experiences/international',
  },
]

type GlobalSearchProps = {
  compact?: boolean
}

export function GlobalSearch({ compact = false }: GlobalSearchProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const inputRef = useRef<HTMLInputElement>(null)

  const normalizedQuery = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!normalizedQuery) {
      return experiences.slice(0, 6)
    }

    return experiences
      .filter((experience) =>
        experience.keywords.some((keyword) =>
          keyword.toLowerCase().includes(normalizedQuery)
        )
      )
      .slice(0, 8)
  }, [normalizedQuery])

  const selectableItems = normalizedQuery
    ? results
    : [...results, ...browseLinks]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (!open) return

    const timeout = window.setTimeout(() => {
      inputRef.current?.focus()
    }, 50)

    return () => window.clearTimeout(timeout)
  }, [open])

  const closeSearch = () => {
    setOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }

  const navigateTo = (href: string) => {
    closeSearch()
    router.push(href)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!selectableItems.length) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()

      setSelectedIndex((current) =>
        Math.min(current + 1, selectableItems.length - 1)
      )

      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()

      setSelectedIndex((current) => Math.max(current - 1, 0))

      return
    }

    if (event.key === 'Enter') {
      event.preventDefault()

      const selected = selectableItems[selectedIndex]

      if (selected) {
        navigateTo(selected.href)
      }

      return
    }

    if (event.key === 'Escape') {
      event.preventDefault()
      closeSearch()
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)

        if (!value) {
          setQuery('')
          setSelectedIndex(0)
        }
      }}
    >
      <Button
        type="button"
        variant={compact ? 'ghost' : 'outline'}
        size={compact ? 'icon-sm' : 'sm'}
        aria-label="Search trips and escapes"
        onClick={() => setOpen(true)}
        className={cn('rounded-full h-11 mr-2', !compact && 'border-border')}
      >
        <Search aria-hidden="true" className="size-6" strokeWidth={1.8} />

        {!compact && <span className="font-semibold">Search</span>}
      </Button>

      <DialogContent
        showCloseButton={false}
        className="
          top-[18%]
          translate-y-0
          gap-0
          overflow-hidden
          rounded-2xl
          border-black/10
          bg-background/95
          p-0
          shadow-[0_24px_80px_rgba(0,0,0,0.18)]
          backdrop-blur-2xl
          duration-200
          sm:max-w-155
          dark:border-white/10
          dark:bg-background/90
          dark:shadow-[0_24px_80px_rgba(0,0,0,0.5)]
        "
      >
        <DialogTitle className="sr-only">Search experiences</DialogTitle>

        <DialogDescription className="sr-only">
          Search trips, escapes, and international trips.
        </DialogDescription>

        {/* Search */}
        <div
          className="
            flex
            h-17
            items-center
            gap-3
            border-b
            border-black/6
            px-5
            dark:border-white/8
          "
        >
          <Search
            aria-hidden="true"
            className="
              size-5
              shrink-0
              text-muted-foreground
            "
            strokeWidth={1.8}
          />

          <Input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search trips, places, escapes..."
            className="
              h-full
              border-0
              bg-transparent
              px-0
              text-[17px]
              shadow-none
              outline-none
              focus-visible:ring-0
              placeholder:text-muted-foreground/60
            "
            autoComplete="off"
            spellCheck={false}
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="
                shrink-0
                rounded-md
                px-1.5
                py-0.5
                text-xs
                text-muted-foreground
                transition-colors
                hover:bg-muted
                hover:text-foreground
              "
            >
              Clear
            </button>
          )}
        </div>

        {/* Results */}
        <ScrollArea className="max-h-105">
          <div className="p-2.5">
            {!normalizedQuery && (
              <div className="px-3 pb-2 pt-1">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                  Discover
                </span>
              </div>
            )}

            {normalizedQuery && results.length === 0 ? (
              <EmptyState query={query} />
            ) : (
              <div className="space-y-0.5">
                {results.map((experience, index) => (
                  <SpotlightResult
                    key={experience.id}
                    experience={experience}
                    selected={selectedIndex === index}
                    onClick={() => navigateTo(experience.href)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  />
                ))}
              </div>
            )}

            {!normalizedQuery && (
              <div className="mt-2 border-t border-black/6 pt-2 dark:border-white/8">
                <div className="px-3 pb-2 pt-1">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
                    Browse
                  </span>
                </div>

                <div className="space-y-0.5">
                  {browseLinks.map((link, index) => {
                    const itemIndex = results.length + index

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeSearch}
                        onMouseEnter={() => setSelectedIndex(itemIndex)}
                        className={cn(
                          `
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            py-2.5
                            outline-none
                            transition-colors
                          `,
                          selectedIndex === itemIndex && 'bg-muted'
                        )}
                      >
                        <span className="flex size-8 items-center justify-center rounded-lg bg-muted">
                          <Search
                            className="size-3.5 text-muted-foreground"
                            strokeWidth={1.8}
                          />
                        </span>

                        <span className="flex-1 text-sm font-medium">
                          {link.label}
                        </span>

                        <ArrowRight
                          className="size-3.5 text-muted-foreground/50"
                          strokeWidth={1.8}
                        />
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function SpotlightResult({
  experience,
  selected,
  onClick,
  onMouseEnter,
}: {
  experience: SearchExperience
  selected: boolean
  onClick: () => void
  onMouseEnter: () => void
}) {
  return (
    <Link
      href={experience.href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        `
          group
          flex
          items-center
          gap-3
          rounded-xl
          px-3
          py-2.5
          outline-none
          transition-colors
        `,
        selected && 'bg-muted'
      )}
    >
      <span
        className="
          flex
          size-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-accent/10
          text-accent
        "
      >
        <MapPin aria-hidden="true" className="size-4" strokeWidth={1.8} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">
          {experience.title}
        </span>

        <span className="mt-0.5 block truncate text-xs text-muted-foreground">
          {experience.category}
          <span className="mx-1.5 text-muted-foreground/40">·</span>
          {experience.location}
        </span>
      </span>

      <ArrowRight
        className={cn(
          `
            size-4
            shrink-0
            text-muted-foreground/40
            transition-all
          `,
          selected && 'translate-x-0.5 text-foreground'
        )}
        strokeWidth={1.8}
      />
    </Link>
  )
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-muted">
        <Search className="size-4 text-muted-foreground" strokeWidth={1.8} />
      </div>

      <p className="mt-3 text-sm font-medium">
        No results for “{query.trim()}”
      </p>

      <p className="mt-1 text-xs text-muted-foreground">
        Try searching for a place, trip, or escape.
      </p>
    </div>
  )
}
