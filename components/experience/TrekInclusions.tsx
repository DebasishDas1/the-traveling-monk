import { Check, X } from 'lucide-react'

interface TrekInclusionsProps {
  inclusions?: string[]
  exclusions?: string[]
}

export function TrekInclusions({
  inclusions = [],
  exclusions = [],
}: TrekInclusionsProps) {
  if (!inclusions.length && !exclusions.length) {
    return null
  }

  return (
    <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-primary">
          Good to know
        </p>

        <h2 className="mt-5 text-4xl font-semibold leading-[0.98] tracking-tighter md:text-5xl">
          Everything you need.
          <br />
          <span className="text-muted-foreground">Nothing you don&apos;t.</span>
        </h2>
      </div>

      <div className="grid gap-12 sm:grid-cols-2">
        {inclusions.length > 0 && (
          <div>
            <h3 className="text-lg font-medium">What&apos;s included</h3>

            <ul className="mt-6 space-y-4">
              {inclusions.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-muted-foreground"
                >
                  <Check className="mt-1 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {exclusions.length > 0 && (
          <div>
            <h3 className="text-lg font-medium">What&apos;s not included</h3>

            <ul className="mt-6 space-y-4">
              {exclusions.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-6 text-muted-foreground"
                >
                  <X className="mt-1 size-4 shrink-0 text-muted-foreground/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
