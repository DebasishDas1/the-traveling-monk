// components/experience/BookingBar/BookingDetailsDialog.tsx
'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

interface BookingDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  name: string
  phone: string
  errors?: { name?: string; phone?: string }
  onNameChange: (name: string) => void
  onPhoneChange: (phone: string) => void
  onSubmit: () => void
  isLoading?: boolean
}

export function BookingDetailsDialog({
  open,
  onOpenChange,
  name,
  phone,
  errors,
  onNameChange,
  onPhoneChange,
  onSubmit,
  isLoading = false,
}: BookingDetailsDialogProps) {
  const isValid = name.trim().length > 0 && phone.trim().length > 0 && !errors?.name && !errors?.phone

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl p-6 sm:p-8" showCloseButton={false}>
        <DialogHeader className="space-y-2 pr-8">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            Your details
          </DialogTitle>

          <DialogDescription className="text-sm leading-6">
            Please provide your contact information for booking confirmation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-3">
          {/* Name */}
          <div className="space-y-2">
            <Label
              htmlFor="dialog-name"
              className="text-sm font-medium text-foreground"
            >
              Full name
            </Label>

            <Input
              id="dialog-name"
              type="text"
              placeholder="Debasish Das"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              disabled={isLoading}
              autoFocus
              autoComplete="name"
              className={`h-12 rounded-xl bg-background px-4 text-base ${
                errors?.name ? 'border-destructive/50 ring-destructive/20 focus-visible:ring-destructive' : ''
              }`}
            />
            {errors?.name && (
              <p className="text-sm font-medium text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label
              htmlFor="dialog-phone"
              className="text-sm font-medium text-foreground"
            >
              Phone number
            </Label>

            <Input
              id="dialog-phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(event) => onPhoneChange(event.target.value)}
              disabled={isLoading}
              autoComplete="tel"
              className={`h-12 rounded-xl bg-background px-4 text-base ${
                errors?.phone ? 'border-destructive/50 ring-destructive/20 focus-visible:ring-destructive' : ''
              }`}
            />
            {errors?.phone && (
              <p className="text-sm font-medium text-destructive">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="h-12 flex-1 rounded-xl"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onSubmit}
            disabled={!isValid || isLoading}
            className="h-12 flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Confirming...
              </>
            ) : (
              'Confirm booking'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
