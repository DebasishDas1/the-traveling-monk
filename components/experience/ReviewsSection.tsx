'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

import { Heading } from '../common'
import { ReviewForm } from './ReviewForm'
import { ReviewsList } from './ReviewsList'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from '../ui/button'

interface ReviewsSectionProps {
  experienceId: number
  eyebrow: string
  title: string
  description: string
}

export function ReviewsSection({
  experienceId,
  eyebrow,
  title,
  description,
}: ReviewsSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-24"
    >
      <div className="flex flex-col gap-6 py-4 md:flex-row md:items-center md:justify-between">
        <div id="reviews-heading">
          <Heading
            eyebrow={eyebrow}
            title={title}
            description={description}
            size="h2"
          />
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button type="button" className="w-full md:w-auto">
                <Plus className="size-4" aria-hidden="true" />
                Add Review
              </Button>
            }
          />

          <DialogContent>
            <div className="p-6 sm:p-7">
              <DialogHeader className="mb-6 pr-8">
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  Add Review
                </DialogTitle>

                <DialogDescription className="mt-1">
                  Share your experience with other travelers.
                </DialogDescription>
              </DialogHeader>

              <ReviewForm
                experienceId={experienceId}
                onSuccess={() => setOpen(false)}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <ReviewsList experienceId={experienceId} />
    </section>
  )
}
