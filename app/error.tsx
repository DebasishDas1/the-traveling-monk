'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCcw, Compass } from 'lucide-react'

import { Container } from '@/components/common/Container'
import { Section } from '@/components/common/Section'

interface ErrorPageProps {
  error: Error & {
    digest?: string
  }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main>
      <Section className="min-h-[75vh] flex items-center">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted">
              <Compass className="size-6 text-muted-foreground" />
            </div>

            <p className="mt-8 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Something went wrong
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tighter md:text-6xl">
              The journey hit a bump.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-muted-foreground">
              Something unexpected happened while loading this page. Let&apos;s
              try that again.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <RefreshCcw className="size-4" />
                Try again
              </button>

              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-full border px-7 text-sm font-medium transition-colors hover:bg-muted"
              >
                Back home
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
