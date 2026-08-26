'use client'

import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star } from 'lucide-react'
import { toast } from 'sonner'

import { submitReview } from '@/lib/reviews/mutations'
import { reviewSchema, type ReviewFormData } from '@/lib/reviews/schema'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ReviewFormProps {
  experienceId: number
  onSuccess?: () => void
}

const ratingLabels: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very good',
  5: 'Excellent',
}

export function ReviewForm({ experienceId, onSuccess }: ReviewFormProps) {
  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: '',
      email: '',
      rating: 5,
      text: '',
    },
  })

  const reviewText = useWatch({
    control: form.control,
    name: 'text',
    defaultValue: '',
  })

  const isSubmitting = form.formState.isSubmitting

  const onSubmit = async (data: ReviewFormData) => {
    try {
      await submitReview({
        experienceId,
        name: data.name,
        ...(data.email ? { email: data.email } : {}),
        rating: data.rating,
        text: data.text,
      })

      form.reset()

      toast.success('Review posted')

      onSuccess?.()
    } catch (error) {
      console.error('Failed to post review:', error)

      toast.error('Couldn’t post your review. Please try again.')
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
    >
      {/* Name + Email */}
      <Field data-invalid={!!form.formState.errors.name}>
        <FieldLabel htmlFor="review-name">Name</FieldLabel>

        <Input
          id="review-name"
          {...form.register('name')}
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={!!form.formState.errors.name}
          className="h-11 rounded-lg border-border"
        />

        <FieldError>{form.formState.errors.name?.message}</FieldError>
      </Field>

      <Field data-invalid={!!form.formState.errors.email}>
        <FieldLabel htmlFor="review-email">
          Email
          <span className="ml-1 font-normal text-muted-foreground">
            Optional
          </span>
        </FieldLabel>

        <Input
          id="review-email"
          type="email"
          {...form.register('email')}
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!form.formState.errors.email}
          className="h-11 rounded-lg border-border"
        />

        <FieldError>{form.formState.errors.email?.message}</FieldError>
      </Field>

      {/* Rating */}
      <Field data-invalid={!!form.formState.errors.rating}>
        <FieldLabel>Rating</FieldLabel>

        <Controller
          name="rating"
          control={form.control}
          render={({ field }) => (
            <div
              className="flex items-center gap-1"
              role="radiogroup"
              aria-label="Rating"
            >
              {[1, 2, 3, 4, 5].map((value) => {
                const active = field.value >= value

                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-label={`${value} ${value === 1 ? 'star' : 'stars'}`}
                    aria-checked={field.value === value}
                    onClick={() => field.onChange(value)}
                    className="
                      rounded-md
                      p-1
                      outline-none
                      transition-opacity
                      hover:opacity-75
                      focus-visible:ring-1
                      focus-visible:ring-ring
                    "
                  >
                    <Star
                      size={22}
                      strokeWidth={1.6}
                      className={
                        active
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground/25'
                      }
                    />
                  </button>
                )
              })}

              <span className="ml-2 text-sm tabular-nums text-muted-foreground">
                {field.value}/5
              </span>

              <span className="text-neutral-400">
                {ratingLabels[field.value]}
              </span>
            </div>
          )}
        />

        <FieldError>{form.formState.errors.rating?.message}</FieldError>
      </Field>

      {/* Review */}
      <Field data-invalid={!!form.formState.errors.text}>
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor="review-text">Review</FieldLabel>

          <span
            className={
              reviewText.length >= 900
                ? 'text-xs tabular-nums text-orange-500'
                : 'text-xs tabular-nums text-muted-foreground'
            }
          >
            {reviewText.length}/1000
          </span>
        </div>

        <Textarea
          id="review-text"
          {...form.register('text')}
          placeholder="Tell others about your experience..."
          maxLength={1000}
          rows={5}
          className="
            min-h-32
            resize-none
            rounded-lg
            border-border
            bg-white
            shadow-none
            focus-visible:ring-1
          "
          aria-invalid={!!form.formState.errors.text}
        />

        <FieldDescription>
          {reviewText.length < 10
            ? `${10 - reviewText.length} more characters required`
            : 'Share something useful for future travelers.'}
        </FieldDescription>

        <FieldError>{form.formState.errors.text?.message}</FieldError>
      </Field>

      {/* Submit */}
      <div className="pt-1">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-lg"
        >
          {isSubmitting ? 'Posting…' : 'Post Review'}
        </Button>
      </div>
    </form>
  )
}
