'use client'

import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Star } from 'lucide-react'
import { toast } from 'sonner'

import { submitReview } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const reviewSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),

  email: z
    .string()
    .trim()
    .email('Enter a valid email address')
    .optional()
    .or(z.literal('')),

  rating: z.number().int().min(1, 'Please select a rating').max(5),

  text: z
    .string()
    .trim()
    .min(10, 'Review must be at least 10 characters')
    .max(1000, 'Review must be 1000 characters or less'),
})

type ReviewFormData = z.infer<typeof reviewSchema>

interface ReviewFormProps {
  trekId: number
  onSuccess: () => void
}

export function ReviewForm({ trekId, onSuccess }: ReviewFormProps) {
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

  const onSubmit = async (data: ReviewFormData) => {
    try {
      await submitReview({
        trekId,
        name: data.name,
        email: data.email || undefined,
        rating: data.rating as 1 | 2 | 3 | 4 | 5,
        text: data.text,
      })

      toast.success('Review posted')
      form.reset()
      onSuccess()
    } catch (error) {
      console.error('Failed to post review:', error)
      toast.error('Couldn’t post your review. Please try again.')
    }
  }

  const isSubmitting = form.formState.isSubmitting

  return (
    <Card className="mt-4 bg-white shadow-sm">
      <CardHeader className="px-5 pb-3 pt-5 sm:px-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          Share your experience
        </CardTitle>

        <CardDescription className="text-sm">
          Tell other trekkers what your journey was like.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5 pb-5 sm:px-6 sm:pb-6">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* Name + Email */}
          <div className="grid gap-5 sm:grid-cols-2">
            <Field data-invalid={!!form.formState.errors.name}>
              <FieldLabel htmlFor="review-name">Name</FieldLabel>

              <Input
                id="review-name"
                {...form.register('name')}
                autoComplete="name"
                placeholder="Your name"
                aria-invalid={!!form.formState.errors.name}
                className="h-12 rounded-sm"
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
                className="h-12 rounded-sm"
              />

              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
          </div>

          {/* Rating */}
          <Field data-invalid={!!form.formState.errors.rating}>
            <FieldLabel>Rating</FieldLabel>

            <Controller
              name="rating"
              control={form.control}
              render={({ field }) => (
                <div
                  className="flex items-center gap-0.5"
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
                        aria-label={`${value} ${
                          value === 1 ? 'star' : 'stars'
                        }`}
                        aria-checked={field.value === value}
                        onClick={() => field.onChange(value)}
                        className="rounded-full p-1 outline-none transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
                      >
                        <Star
                          size={23}
                          strokeWidth={1.8}
                          className={
                            active
                              ? 'fill-primary text-primary'
                              : 'text-primary/15'
                          }
                        />
                      </button>
                    )
                  })}

                  <span className="ml-2 text-xs font-medium tabular-nums text-muted-foreground">
                    {field.value}/5
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
              rows={4}
              className="h-40 rounded-sm resize-none"
              aria-invalid={!!form.formState.errors.text}
            />

            <FieldDescription>
              {reviewText.length < 10
                ? `${10 - reviewText.length} more characters required`
                : 'Share something useful for future trekkers.'}
            </FieldDescription>

            <FieldError>{form.formState.errors.text?.message}</FieldError>
          </Field>

          {/* Submit */}
          <div className="space-y-2 pt-1">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full rounded-xl"
            >
              {isSubmitting ? 'Posting…' : 'Post Review'}
            </Button>

            <p className="text-center text-[11px] leading-4 text-muted-foreground">
              Your review will be visible to other trekkers.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
