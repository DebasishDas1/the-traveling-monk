'use client'

import Link from 'next/link'

import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

import { Experience } from '@/types/experience'

import { Card } from '@/components/ui/card'

import { ExperienceBadge } from './ExperienceBadge'
import { ExperienceMeta } from './ExperienceMeta'
import { ExperiencePricing } from './ExperiencePrice'

import { Media } from '@/components/common'

interface ExperienceCardProps {
  experience: Experience
}

const MotionCard = motion.create(Card)

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Link
      href={`/experiences/${experience.slug}`}
      className="group block rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <MotionCard
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden rounded-3xl border bg-background"
      >
        {experience.coverImage && (
          <Media
            src={experience.coverImage.src}
            alt={experience.coverImage.alt}
            priority
            className="transition-transform duration-300 group-hover:scale-[1.04]"
          />
        )}

        <div className="space-y-6 p-6">
          {experience.category && (
            <ExperienceBadge category={experience.category} />
          )}

          <div className="space-y-3">
            <h3 className="text-2xl font-semibold tracking-tight">
              {experience.title || experience.name}
            </h3>

            <p className="line-clamp-2 text-muted-foreground">
              {experience.shortDescription}
            </p>
          </div>

          <ExperienceMeta experience={experience} />

          <div className="flex items-center justify-between">
            {experience.pricing && (
              <ExperiencePricing pricing={experience.pricing} />
            )}

            {/* <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" /> */}
          </div>
        </div>
      </MotionCard>
    </Link>
  )
}
