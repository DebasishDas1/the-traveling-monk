'use client'

import { Calendar, CheckCircle2, Hash, Users, XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import type { BookingResponse } from '@/utils/booking'

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  response: BookingResponse | null
}

export function BookingDialog({
  open,
  onOpenChange,
  response,
}: BookingDialogProps) {
  const isSuccess = response?.success ?? false
  const data = response?.data

  const formattedDate = data?.date
    ? new Date(data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-3xl p-6 sm:p-7">
        <DialogHeader className="flex flex-col items-center text-center">
          {/* Status icon */}
          <div
            className={[
              'relative mb-5 flex size-24 items-center justify-center rounded-full',
              isSuccess
                ? 'bg-emerald-50 dark:bg-emerald-500/10'
                : 'bg-red-50 dark:bg-red-500/10',
            ].join(' ')}
          >
            <div
              className={[
                'absolute inset-2 rounded-full blur-2xl',
                isSuccess ? 'bg-emerald-400/20' : 'bg-red-400/20',
              ].join(' ')}
            />

            <div
              className="
                relative flex size-17 items-center justify-center
                rounded-full bg-background
                shadow-[0_4px_16px_rgba(0,0,0,0.08)]
                ring-1 ring-black/4
                dark:ring-white/6
              "
            >
              {isSuccess ? (
                <CheckCircle2
                  className="size-9 text-emerald-600 dark:text-emerald-400"
                  strokeWidth={2}
                />
              ) : (
                <XCircle
                  className="size-9 text-red-600 dark:text-red-400"
                  strokeWidth={2}
                />
              )}
            </div>
          </div>

          {/* Title */}
          <DialogTitle className="w-full text-center text-[24px] font-semibold leading-tight tracking-[-0.035em] sm:text-[26px]">
            {isSuccess && data && (
              <span className="mb-1 block text-[14px] font-medium tracking-normal text-muted-foreground">
                Hi, {data.name}
              </span>
            )}

            <span className="block">
              {isSuccess ? 'Enquiry Confirmed!' : 'Enquiry Unsuccessful'}
            </span>
          </DialogTitle>

          {/* Description */}
          <DialogDescription className="mx-auto mt-3 max-w-sm text-center text-[13px] leading-5 text-muted-foreground sm:text-[14px] sm:leading-6">
            {isSuccess
              ? 'Thank you for your interest! We have received your enquiry and will get back to you shortly.'
              : 'We couldn’t complete your enquiry. Please try again.'}
          </DialogDescription>
        </DialogHeader>

        {/* Details */}
        {isSuccess && data && (
          <div className="mt-7 w-full space-y-3 sm:mt-8">
            <DetailCard
              icon={<Hash className="size-4.25" />}
              label="Confirmation"
            >
              <span className="block break-all text-left">
                {response.bookingId}
              </span>
            </DetailCard>

            <DetailCard
              icon={<Calendar className="size-4.25" />}
              label="Departure"
            >
              <span className="block text-left">{formattedDate}</span>
            </DetailCard>

            <DetailCard icon={<Users className="size-4.25" />} label="Guests">
              <span className="block text-left">
                {data.guests} {data.guests === 1 ? 'guest' : 'guests'}
              </span>
            </DetailCard>
          </div>
        )}

        {/* Actions */}
        <div
          className={[
            'mt-7 w-full sm:mt-8',
            isSuccess
              ? 'flex flex-col-reverse gap-2.5 min-[400px]:flex-row'
              : '',
          ].join(' ')}
        >
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="h-11 flex-1 rounded-xl"
            variant="outline"
          >
            {isSuccess ? 'Close' : 'Try Again'}
          </Button>

          {isSuccess && (
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="h-11 flex-1 rounded-xl"
            >
              Done
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface DetailCardProps {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}

function DetailCard({ icon, label, children }: DetailCardProps) {
  return (
    <div
      className="
        flex w-full min-w-0 items-center gap-3.5
        rounded-2xl border border-black/6
        bg-black/2.5 p-3.5
        dark:border-white/8
        dark:bg-white/[0.035]
        sm:p-4
      "
    >
      {/* Icon */}
      <div
        className="
          flex size-10 shrink-0 items-center justify-center
          rounded-xl bg-background
          shadow-[0_1px_4px_rgba(0,0,0,0.06)]
          ring-1 ring-black/2.5
          dark:ring-white/4
        "
      >
        <span className="text-muted-foreground">{icon}</span>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1 text-left">
        <p
          className="
            text-[10px] font-medium uppercase
            tracking-[0.09em] text-muted-foreground
            sm:text-[11px]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1 min-w-0 text-[13px] font-medium
            leading-5 tracking-tight sm:text-[14px]
          "
        >
          {children}
        </p>
      </div>
    </div>
  )
}
