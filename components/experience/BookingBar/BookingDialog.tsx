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
  const isOpen = Boolean(open)
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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader className="items-center text-center">
          {/* Status icon */}
          <div
            className={[
              'relative mb-5 flex h-24 w-24 items-center justify-center rounded-full',
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
                  relative
                  flex
                  h-17
                  w-17
                  items-center
                  justify-center
                  rounded-full
                  bg-background
                  shadow-[0_4px_16px_rgba(0,0,0,0.08)]
                  ring-1
                  ring-black/4
                  dark:ring-white/6
                "
            >
              {isSuccess ? (
                <CheckCircle2
                  className="h-9 w-9 text-emerald-600 dark:text-emerald-400"
                  strokeWidth={2}
                />
              ) : (
                <XCircle
                  className="h-9 w-9 text-red-600 dark:text-red-400"
                  strokeWidth={2}
                />
              )}
            </div>
          </div>

          <DialogTitle
            className="
                text-[24px]
                font-semibold
                leading-tight
                tracking-[-0.035em]
                sm:text-[26px]
              "
          >
            {isSuccess && data && <div>Hi {response.data?.name}</div>}
            {isSuccess ? 'Enquiry Confirmed!' : 'Enquiry Unsuccessful'}
          </DialogTitle>

          <DialogDescription
            className="
                mt-2
                max-w-82.5
                text-[13px]
                leading-5
                text-muted-foreground
                sm:text-[14px]
                sm:leading-6
              "
          >
            {isSuccess
              ? 'Thank you for your interest! We have received your enquiry and will get back to you shortly.'
              : 'We couldn’t complete your enquiry. Please try again.'}
          </DialogDescription>
        </DialogHeader>

        {/* Booking details */}
        {isSuccess && data && (
          <div className="mt-7 space-y-3 sm:mt-8">
            {/* Confirmation */}
            <DetailCard
              icon={<Hash className="h-4.25 w-4.25" />}
              label="Confirmation"
            >
              <span className="break-all">{response?.bookingId}</span>
            </DetailCard>

            <DetailCard
              icon={<Calendar className="h-4.25 w-4.25" />}
              label="Departure"
            >
              <span className="truncate">{formattedDate}</span>
            </DetailCard>

            <DetailCard
              icon={<Users className="h-4.25 w-4.25" />}
              label="Guests"
            >
              {data.guests} {data.guests === 1 ? 'guest' : 'guests'}
            </DetailCard>
          </div>
        )}

        {/* Actions */}
        <div
          className={[
            'mt-7 flex gap-2.5 sm:mt-8',
            isSuccess ? 'flex-col-reverse min-[400px]:flex-row' : '',
          ].join(' ')}
        >
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="flex-1"
            variant="outline"
          >
            {isSuccess ? 'Close' : 'Try Again'}
          </Button>

          {isSuccess && (
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex-1"
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
        flex
        min-w-0
        items-center
        gap-3
        rounded-2xl
        border
        border-black/6
        bg-black/2.5
        p-3.5
        dark:border-white/8
        dark:bg-white/[0.035]
        sm:p-4
      "
    >
      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-background
          shadow-[0_1px_4px_rgba(0,0,0,0.06)]
          ring-1
          ring-black/2.5
          dark:ring-white/4
        "
      >
        <span className="text-muted-foreground">{icon}</span>
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-[0.09em]
            text-muted-foreground
            sm:text-[11px]
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            min-w-0
            text-[13px]
            font-medium
            tracking-tight
            sm:text-[14px]
          "
        >
          {children}
        </p>
      </div>
    </div>
  )
}
