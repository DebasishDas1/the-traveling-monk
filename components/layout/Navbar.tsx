'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return

      ticking = true

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20)
        ticking = false
      })
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'fixed inset-x-0 top-0 z-50 px-4 sm:px-6',
        'transition-[background-color,padding,box-shadow,backdrop-filter] duration-300',
        scrolled
          ? 'bg-background/75 py-2.5 shadow-sm backdrop-blur-xl'
          : 'bg-transparent py-4'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="The Traveling Monk home"
          className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Image
            src="/dark-logo.png"
            alt="The Traveling Monk"
            width={80}
            height={80}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {siteConfig.navLinks.map((link) => {
              const isActive =
                pathname === link.href || pathname.startsWith(`${link.href}/`)

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex py-2 font-medium',
                      'text-foreground/65 transition-colors hover:text-foreground',
                      'focus-visible:outline-none focus-visible:ring-2',
                      'focus-visible:ring-primary focus-visible:ring-offset-2',
                      isActive &&
                        'text-foreground after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-5 after:-translate-x-1/2 after:bg-foreground after:content-[""]'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button asChild size="lg" className="h-11 rounded-full px-6">
            <Link href="/experiences">Begin Your Reset</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                  className="size-10 rounded-full"
                />
              }
            >
              <Menu aria-hidden="true" className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full border-none bg-background/40 p-6 backdrop-blur-xl sm:max-w-md"
            >
              <div className="flex h-full flex-col justify-between pb-8 pt-20">
                {/* Mobile Links */}
                <div className="flex flex-col gap-2">
                  {siteConfig.navLinks.map((link) => {
                    const isActive =
                      pathname === link.href ||
                      pathname.startsWith(`${link.href}/`)

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'rounded-xl px-4 py-3 text-2xl font-medium',
                          'transition-colors hover:bg-muted',
                          'focus-visible:outline-none focus-visible:ring-2',
                          'focus-visible:ring-primary',
                          isActive && 'bg-muted text-foreground'
                        )}
                      >
                        {link.label}
                      </Link>
                    )
                  })}
                </div>

                {/* Mobile CTA */}
                <Button asChild size="lg" className="h-12 rounded-full">
                  <Link
                    href="/experiences"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Begin Your Reset
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
