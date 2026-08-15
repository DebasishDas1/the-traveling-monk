'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { siteConfig } from '@/config/site'
import Image from 'next/image'

export function Navbar() {
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const links = siteConfig.navLinks

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    onScroll()

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      suppressHydrationWarning={true}
      className={cn(
        'fixed top-0 inset-x-0 z-50 px-6 transition-all duration-700 ease-out',
        scrolled
          ? [
              'py-3',
              'bg-white/60',
              'backdrop-blur-xl',
              'supports-backdrop-filter:bg-white/60',
            ]
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo */}

        <Link href="/" className="text-2xl font-semibold tracking-tight">
          <Image src="/dark-logo.png" alt="Logo" width={80} height={80} />
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-12">
            {links.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`)

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'relative text-small font-medium text-foreground/65 transition-colors hover:text-foreground',

                      active &&
                        'text-foreground after:absolute after:-bottom-2 after:left-1/2 after:h-px after:w-6 after:-translate-x-1/2 after:bg-foreground after:content-[""]'
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA */}

        <div className="hidden justify-end lg:flex">
          <Button size="lg" className="h-12 rounded-full px-7">
            Begin Your Reset
          </Button>
        </div>

        {/* Mobile */}

        <div className="flex justify-end lg:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-full" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full border-none bg-white/60 backdrop-blur-lg p-6"
            >
              <div className="mt-20 flex h-full w-full flex-col justify-center gap-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-2xl font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
