import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const buttonVariants = cva(
  [
    'group/button inline-flex shrink-0 items-center justify-center',
    'h-11 rounded-full',
    'text-sm font-medium whitespace-nowrap',
    'transition-[background-color,color,border-color,transform,opacity,box-shadow]',
    'duration-200 ease-out',
    'outline-none select-none',
    'focus-visible:ring-4 focus-visible:ring-ring/15',
    'active:not-aria-[haspopup]:scale-[0.98]',
    'disabled:pointer-events-none disabled:opacity-45',
    'aria-invalid:ring-4 aria-invalid:ring-destructive/10',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    "[&_svg:not([class*='size-'])]:size-4",
  ].join(' '),
  {
    variants: {
      variant: {
        // Signature Monk CTA
        default:
          [
            'bg-primary text-primary-foreground',
            'hover:bg-primary-hover',
            'active:bg-primary-hover',
            'shadow-sm hover:shadow-md',
          ].join(' '),

        // Soft, premium secondary action
        secondary:
          [
            'bg-secondary text-secondary-foreground',
            'hover:bg-secondary/90',
            'active:bg-secondary/80',
          ].join(' '),

        // Premium outlined action
        outline:
          [
            'border border-border',
            'bg-transparent text-foreground',
            'hover:bg-muted hover:border-input',
            'active:bg-muted/80',
          ].join(' '),

        // Quiet action
        ghost:
          [
            'bg-transparent text-foreground',
            'hover:bg-muted',
            'active:bg-muted/80',
          ].join(' '),

        // Destructive action
        destructive:
          [
            'bg-destructive/10 text-destructive',
            'hover:bg-destructive/15',
            'active:bg-destructive/20',
          ].join(' '),

        // Text-only action
        link:
          [
            'h-auto rounded-none',
            'bg-transparent p-0',
            'text-primary',
            'underline-offset-4',
            'hover:underline',
          ].join(' '),
      },

      size: {
        default:
          [
            'gap-2 px-5',
            'has-data-[icon=inline-end]:pr-4',
            'has-data-[icon=inline-start]:pl-4',
          ].join(' '),

        xs:
          'h-8 gap-1.5 px-3 text-xs',

        sm:
          'h-9 gap-1.5 px-4 text-[0.8rem]',

        lg:
          'h-12 gap-2 px-6 text-[0.95rem]',

        icon:
          'size-11',

        'icon-xs':
          "size-8 [&_svg:not([class*='size-'])]:size-3",

        'icon-sm':
          "size-9 [&_svg:not([class*='size-'])]:size-3.5",

        'icon-lg':
          'size-12',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }