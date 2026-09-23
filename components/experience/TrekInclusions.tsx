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
    <div className="grid gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
      {/* Intro */}
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow-accent">Good to know</p>

          <h2 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">
            What&apos;s covered.
            <span className="block text-muted-foreground">
              What isn&apos;t.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            No fine-print scavenger hunt. Here&apos;s exactly what comes with
            the trip.
          </p>
        </div>
      </div>

      {/* Lists */}
      <div className="lg:col-span-8">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-8">
          {inclusions.length > 0 && (
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex size-9 items-center justify-center
                    rounded-full
                    bg-primary
                    text-primary-foreground
                  "
                >
                  <Check
                    className="size-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    You&apos;re covered
                  </h3>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Included in your trip
                  </p>
                </div>
              </div>

              <ul className="mt-6 divide-y divide-border">
                {inclusions.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="
                      flex gap-3
                      py-4
                      text-sm leading-6
                      text-muted-foreground
                      first:pt-0
                    "
                  >
                    <span
                      className="
                        mt-2 size-1.5 shrink-0
                        rounded-full
                        bg-accent
                      "
                      aria-hidden="true"
                    />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {exclusions.length > 0 && (
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex size-9 items-center justify-center
                    rounded-full
                    border border-border
                    bg-muted
                    text-muted-foreground
                  "
                >
                  <X className="size-4" strokeWidth={2} aria-hidden="true" />
                </span>

                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    You&apos;re on your own
                  </h3>

                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Not included in your trip
                  </p>
                </div>
              </div>

              <ul className="mt-6 divide-y divide-border">
                {exclusions.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="
                      flex gap-3
                      py-4
                      text-sm leading-6
                      text-muted-foreground
                      first:pt-0
                    "
                  >
                    <span
                      className="
                        mt-2 size-1.5 shrink-0
                        rounded-full
                        bg-muted-foreground/40
                      "
                      aria-hidden="true"
                    />

                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
