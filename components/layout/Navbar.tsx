'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown, Menu } from 'lucide-react'

import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [expandedNav, setExpandedNav] = useState<string | null>(null)
  const isExactActive = (href: string) => pathname === href
  const isSectionActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`)

  const activeNavLink = siteConfig.navLinks.find((link) =>
    isSectionActive(link.href)
  )

  const isSubLinkActive = (href: string) => {
    if (href === '/experiences') {
      return pathname === '/experiences'
    }

    return pathname === href || pathname.startsWith(`${href}/`)
  }

  const subLinks =
    activeNavLink &&
    'subLinks' in activeNavLink &&
    Array.isArray(activeNavLink.subLinks)
      ? activeNavLink.subLinks
      : []
  const currentExpandedNav = expandedNav ?? activeNavLink?.href ?? null

  const closeSheet = () => {
    setOpen(false)
  }

  const toggleNav = (href: string) => {
    setExpandedNav((current) => (current === href ? null : href))
  }

  /*
   * Shared navigation styles.
   */
  const desktopNavLink = (active: boolean) =>
    cn(
      'relative inline-flex h-full items-center px-4',
      'text-base font-semibold tracking-[-0.015em]',
      'transition-colors duration-200',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-primary',
      'focus-visible:ring-inset',
      active ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
    )

  const mobileNavLink = (active: boolean) =>
    cn(
      'flex min-h-14 items-center justify-between rounded-xl px-4',
      'text-lg font-semibold tracking-[-0.015em]',
      'transition-colors duration-200',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-primary',
      active
        ? 'text-foreground'
        : 'text-foreground/65 hover:bg-foreground/[0.05] hover:text-foreground'
    )

  const mobileSubLink = (active: boolean) =>
    cn(
      'flex min-h-12 items-center justify-between rounded-xl px-4',
      'text-[17px] font-medium tracking-[-0.01em]',
      'transition-colors duration-200',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-primary',
      active
        ? 'text-foreground'
        : 'text-foreground/60 hover:bg-foreground/[0.05] hover:text-foreground'
    )

  return (
    <nav aria-label="Main navigation" className="w-full bg-background">
      <div className="h-18">
        <div className="mx-auto flex h-full max-w-7xl items-center px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            aria-label={`${siteConfig.name} home`}
            className={cn(
              'shrink-0 rounded-full',
              'focus-visible:outline-none',
              'focus-visible:ring-2 focus-visible:ring-primary',
              'focus-visible:ring-offset-4'
            )}
          >
            <Image
              src="/apple-touch-icon.png"
              alt={siteConfig.name}
              width={42}
              height={42}
              priority
              className="rounded-full"
            />
          </Link>

          {/* ============================================================
              DESKTOP NAVIGATION
          ============================================================= */}
          <div className="ml-10 hidden h-12 lg:block">
            <ul className="flex h-full items-center gap-2">
              {siteConfig.navLinks.map((link) => {
                const active = isSectionActive(link.href)

                return (
                  <li key={link.href} className="h-full">
                    <Link
                      href={link.href}
                      aria-current={active ? 'page' : undefined}
                      className={desktopNavLink(active)}
                    >
                      {link.label}

                      {active && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            'absolute bottom-0 left-3 right-3',
                            'h-0.75',
                            'rounded-t-full',
                            'bg-foreground'
                          )}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ============================================================
              DESKTOP CTA
          ============================================================= */}
          <div className="ml-auto hidden lg:block">
            <Button>
              <Link href={siteConfig.cta.href}>{siteConfig.cta.label}</Link>
            </Button>
          </div>

          {/* ============================================================
              MOBILE MENU
          ============================================================= */}
          <div className="ml-auto lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <button
                    type="button"
                    aria-label="Open navigation menu"
                    className={cn(
                      'inline-flex size-11 items-center justify-center',
                      'rounded-full bg-foreground/6',
                      'text-foreground',
                      'transition-colors duration-200',
                      'hover:bg-foreground/10',
                      'focus-visible:outline-none',
                      'focus-visible:ring-2',
                      'focus-visible:ring-primary',
                      'focus-visible:ring-offset-2'
                    )}
                  >
                    <Menu
                      aria-hidden="true"
                      className="size-5"
                      strokeWidth={2}
                    />
                  </button>
                }
              />

              <SheetContent
                side="right"
                className="w-full bg-background p-0 sm:max-w-md border-none"
              >
                <div className="flex h-full flex-col px-5 pb-7 pt-10 sm:px-8">
                  {/* ======================================================
                      MOBILE NAVIGATION
                  ======================================================= */}
                  <nav
                    aria-label="Mobile navigation"
                    className="flex-1 overflow-y-auto"
                  >
                    <div className="space-y-1">
                      {siteConfig.navLinks.map((link) => {
                        const active = isSectionActive(link.href)

                        const hasSubLinks =
                          'subLinks' in link &&
                          Array.isArray(link.subLinks) &&
                          link.subLinks.length > 0

                        const expanded = currentExpandedNav === link.href

                        const submenuId = `submenu-${link.href.replace(
                          /[^a-zA-Z0-9-_]/g,
                          ''
                        )}`

                        /*
                         * --------------------------------------------------
                         * Parent with children
                         * --------------------------------------------------
                         */
                        if (hasSubLinks) {
                          return (
                            <div key={link.href}>
                              <button
                                type="button"
                                aria-expanded={expanded}
                                aria-controls={submenuId}
                                onClick={() => toggleNav(link.href)}
                                className={cn(
                                  mobileNavLink(active),
                                  'w-full text-left'
                                )}
                              >
                                <span>{link.label}</span>

                                <ChevronDown
                                  aria-hidden="true"
                                  className={cn(
                                    'size-5 shrink-0',
                                    'text-foreground/40',
                                    'transition-transform duration-200',
                                    expanded && 'rotate-180'
                                  )}
                                  strokeWidth={1.8}
                                />
                              </button>

                              {/* Sub-navigation */}
                              <div
                                id={submenuId}
                                hidden={!expanded}
                                className="ml-4 mt-1 space-y-1 border-l border-foreground/10 pl-2"
                              >
                                {link.subLinks!.map((subLink) => {
                                  const activeSub = isSubLinkActive(
                                    subLink.href
                                  )

                                  return (
                                    <Link
                                      key={subLink.href}
                                      href={subLink.href}
                                      aria-current={
                                        activeSub ? 'page' : undefined
                                      }
                                      onClick={closeSheet}
                                      className={mobileSubLink(activeSub)}
                                    >
                                      <span>{subLink.label}</span>

                                      {activeSub && (
                                        <span
                                          aria-hidden="true"
                                          className="size-2 rounded-full bg-foreground"
                                        />
                                      )}
                                    </Link>
                                  )
                                })}
                              </div>
                            </div>
                          )
                        }

                        /*
                         * --------------------------------------------------
                         * Regular navigation item
                         * --------------------------------------------------
                         */
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            aria-current={
                              isExactActive(link.href) ? 'page' : undefined
                            }
                            onClick={closeSheet}
                            className={mobileNavLink(isExactActive(link.href))}
                          >
                            <span>{link.label}</span>

                            {isExactActive(link.href) && (
                              <span
                                aria-hidden="true"
                                className="size-2 rounded-full bg-foreground"
                              />
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  </nav>

                  {/* ======================================================
                      MOBILE CTA
                  ======================================================= */}
                  <div className="pt-7">
                    <Button
                      asChild
                      size="lg"
                      className={cn(
                        'h-13 w-full rounded-full',
                        'bg-foreground text-background',
                        'text-base font-semibold',
                        'shadow-sm',
                        'transition-all duration-200',
                        'hover:bg-foreground/90',
                        'active:scale-[0.99]'
                      )}
                    >
                      <Link href={siteConfig.cta.href} onClick={closeSheet}>
                        {siteConfig.cta.label}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* ================================================================
          DESKTOP SUB NAVIGATION
      ================================================================= */}
      {subLinks.length > 0 && (
        <div className="hidden bg-primary/10 md:block">
          <div className="mx-auto max-w-7xl overflow-x-auto px-5 sm:px-6 lg:px-8">
            <ul className="flex h-14 items-center gap-2">
              {subLinks.map((subLink) => {
                const active = isSubLinkActive(subLink.href)

                return (
                  <li key={subLink.href} className="h-full shrink-0">
                    <Link
                      href={subLink.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'relative inline-flex h-full items-center px-4',
                        'text-small font-semibold tracking-[-0.01em]',
                        'transition-colors duration-200',
                        'focus-visible:outline-none',
                        'focus-visible:ring-2',
                        'focus-visible:ring-primary',
                        'focus-visible:ring-inset',
                        active
                          ? 'text-foreground'
                          : 'text-foreground/60 hover:text-foreground'
                      )}
                    >
                      {subLink.label}

                      {active && (
                        <span
                          aria-hidden="true"
                          className="
              absolute
              bottom-0
              left-3
              right-3
              h-0.75
              rounded-t-full
              bg-foreground
            "
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </nav>
  )
}
