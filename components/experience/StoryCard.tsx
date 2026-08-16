import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { Media } from '@/components/common'
import type { Story } from '@/lib/data/stories-page'

interface StoryCardProps {
  story: Story
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <article className="group">
      <Link
        href={`/stories/${story.slug}`}
        aria-label={`Read: ${story.title}`}
        className="
          block
          rounded-2xl
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
          focus-visible:ring-offset-4
        "
      >
        {/* Image */}
        <div className="overflow-hidden rounded-2xl bg-muted">
          <Media
            src={story.image}
            alt={story.imageAlt || story.title}
            ratio="4/5"
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              33vw
            "
            className="
              transition-transform
              duration-500
              ease-out
              group-hover:scale-[1.025]
            "
          />
        </div>

        {/* Content */}
        <div className="pt-4 sm:pt-5">
          {/* Meta */}
          <div className="flex min-w-0 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
            <span className="truncate">{story.category}</span>

            <span aria-hidden="true" className="shrink-0">
              ·
            </span>

            <span className="truncate">{story.location}</span>
          </div>

          {/* Title */}
          <div className="mt-2.5 flex items-start gap-3">
            <h3
              className="
                min-w-0
                flex-1
                text-xl
                font-semibold
                leading-[1.1]
                tracking-[-0.035em]
                text-balance
                text-foreground
                sm:text-2xl
              "
            >
              {story.title}
            </h3>

            <span
              aria-hidden="true"
              className="
                mt-0.5
                flex
                size-8
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-border
                text-foreground
                transition-all
                duration-300
                group-hover:border-primary
                group-hover:bg-primary
                group-hover:text-primary-foreground
              "
            >
              <ArrowUpRight className="size-3.5" />
            </span>
          </div>

          {/* Excerpt */}
          {story.excerpt && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {story.excerpt}
            </p>
          )}

          {/* Read time */}
          {story.readTime && (
            <p className="mt-3 text-xs text-muted-foreground">
              {story.readTime}
            </p>
          )}
        </div>
      </Link>
    </article>
  )
}
