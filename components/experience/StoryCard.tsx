import { Story } from "@/lib/data/stories-page"
import Link from "next/link"
import { Media } from "../common"
import { ArrowRight } from "lucide-react"

interface StoryCardProps {
  story: Story
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      <article>
        <div className="overflow-hidden rounded-[1.5rem]">
          <Media
            src={story.image}
            alt={story.imageAlt}
            ratio="4/5"
            className="
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.03]
            "
          />
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <span>{story.category}</span>

            <span aria-hidden="true">·</span>

            <span>{story.location}</span>
          </div>

          <div className="mt-3 flex items-start justify-between gap-4">
            <h3 className="text-2xl font-medium leading-tight tracking-[-0.04em] text-balance">
              {story.title}
            </h3>

            <ArrowRight
              className="
                mt-1
                size-4
                shrink-0
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
            {story.excerpt}
          </p>

          <p className="mt-4 text-xs text-muted-foreground">{story.readTime}</p>
        </div>
      </article>
    </Link>
  )
}