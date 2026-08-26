'use client'

import * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 min-h-dvh bg-black/20 backdrop-blur-[2px] supports-backdrop-filter:backdrop-blur-sm',
        'data-open:animate-in data-open:fade-in-0',
        'data-closed:animate-out data-closed:fade-out-0',
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
}) {
  return (
    <DialogPortal>
      <DialogOverlay />

      <DialogPrimitive.Viewport
        data-slot="dialog-viewport"
        className={cn(
          'fixed inset-0 z-50',
          'flex min-h-dvh',
          'items-center justify-center',
          'overflow-y-auto',
          'p-4 sm:p-6',
          'outline-none'
        )}
      >
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className={cn(
            // ─────────────────────────────────────
            // Layout
            // ─────────────────────────────────────
            'relative flex w-full min-w-0 flex-col',

            // ─────────────────────────────────────
            // Responsive sizing
            // ─────────────────────────────────────
            'max-w-140',
            'max-h-[calc(100dvh-2rem)]',
            'sm:max-h-[calc(100dvh-3rem)]',

            // ─────────────────────────────────────
            // Surface
            // ─────────────────────────────────────
            'overflow-y-auto',
            'rounded-2xl sm:rounded-lg',
            'border border-black/8',
            'bg-white',
            'text-neutral-950',

            // ─────────────────────────────────────
            // Premium depth
            // ─────────────────────────────────────
            'shadow-[0_24px_80px_-20px_rgba(0,0,0,0.22)]',
            'ring-1 ring-black/3',

            // ─────────────────────────────────────
            // Remove primitive defaults
            // ─────────────────────────────────────
            'gap-0',
            'p-0',
            'outline-none',

            // ─────────────────────────────────────
            // Animation
            // ─────────────────────────────────────
            'origin-center',
            'duration-200',
            'data-open:animate-in',
            'data-open:fade-in-0',
            'data-open:zoom-in-[0.98]',
            'data-closed:animate-out',
            'data-closed:fade-out-0',
            'data-closed:zoom-out-[0.98]',

            className
          )}
          {...props}
        >
          {children}

          {showCloseButton && (
            <DialogPrimitive.Close
              data-slot="dialog-close"
              aria-label="Close dialog"
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'absolute right-4 top-4 z-20',
                    'size-8 rounded-full',
                    'border border-black/6',
                    'bg-white/80',
                    'text-neutral-500',
                    'shadow-sm',
                    'backdrop-blur-sm',
                    'transition-all duration-200',
                    'hover:border-black/10',
                    'hover:bg-neutral-100',
                    'hover:text-neutral-950',
                    'hover:shadow',
                    'active:scale-95',
                    'focus-visible:ring-2',
                    'focus-visible:ring-neutral-400',
                    'focus-visible:ring-offset-2'
                  )}
                />
              }
            >
              <XIcon className="size-4" strokeWidth={1.7} />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        'flex flex-col-reverse gap-2 border-t bg-neutral-50 p-4 sm:flex-row sm:justify-end',
        className
      )}
      {...props}
    >
      {children}

      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        'text-lg font-semibold leading-tight tracking-tight',
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        'text-sm leading-6 text-neutral-500',
        '*:[a]:underline *:[a]:underline-offset-3',
        '*:[a]:hover:text-neutral-900',
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
