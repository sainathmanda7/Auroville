'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { nav, whatsappUrl } from '@/lib/site-data'

const EASE = [0.22, 1, 0.36, 1] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('home')
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const handleNavVisibility = (e: Event) => {
      const customEvent = e as CustomEvent<{ hidden: boolean }>
      setHidden(Boolean(customEvent.detail?.hidden))
    }
    window.addEventListener('set-navbar-hidden', handleNavVisibility)
    return () => window.removeEventListener('set-navbar-hidden', handleNavVisibility)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0.2,
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  const isLinkActive = (item: (typeof nav)[number]) => {
    const section = activeSection.toLowerCase()
    const href = item.href.toLowerCase()
    const hrefId = href.replace(/^[/#]+/, '')
    const label = item.label.toLowerCase()

    if (hrefId === section || label === section || href === `#${section}` || href === `/${section}`) {
      return true
    }

    if (
      (section === 'home' || section === 'hero' || section === '') &&
      (href === '/' || href === '#' || hrefId === 'home' || hrefId === 'hero' || label === 'home')
    ) {
      return true
    }

    if (
      (section === 'stay' || section === 'rooms') &&
      (hrefId === 'stay' || hrefId === 'rooms' || label === 'stay' || label === 'rooms')
    ) {
      return true
    }

    if (
      (section === 'contact' || section === 'location' || section === 'cta' || section === 'booking') &&
      (hrefId === 'contact' || hrefId === 'location' || label === 'contact')
    ) {
      return true
    }

    return false
  }

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#') || href.startsWith('/#')) {
      const targetId = href.replace(/^[/#]+/, '')
      const targetEl = document.getElementById(targetId)
      if (targetEl) {
        e.preventDefault()
        setOpen(false)
        targetEl.scrollIntoView({ behavior: 'smooth' })
        window.history.pushState(null, '', `#${targetId}`)
      }
    }
  }

  const solid = scrolled || open
  const textTone = solid ? 'text-charcoal' : 'text-soft'

  return (
    <>
      <header
        id="site-header"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${
          hidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        } ${
          solid ? 'border-b border-charcoal/10 bg-ivory/90 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-12">
          <Link
            href="/#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className={`font-display text-xl tracking-wide transition-all duration-500 sm:text-2xl ${textTone}`}
            aria-label="Auroville Farmstay — home"
          >
            Auroville Farmstay
          </Link>

          <ul className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active = isLinkActive(item)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative text-[0.8125rem] font-medium uppercase tracking-[0.16em] transition-all duration-500 ${textTone} ${
                      active ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span
                        className={`absolute -bottom-1.5 left-0 h-px w-full ${solid ? 'bg-charcoal' : 'bg-soft'}`}
                      />
                    ) : null}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 border px-5 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-all duration-500 lg:inline-flex ${
                solid
                  ? 'border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-soft'
                  : 'border-soft/40 text-soft hover:bg-soft hover:text-charcoal'
              }`}
            >
              Book your stay <span aria-hidden="true">↗</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden ${textTone}`}
            >
              <span
                className={`h-px w-6 bg-current transition-transform duration-300 ${open ? 'translate-y-[6px] rotate-45' : ''}`}
              />
              <span className={`h-px w-6 bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
              <span
                className={`h-px w-6 bg-current transition-transform duration-300 ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-ivory px-6 pb-10 pt-24 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <ul className="flex flex-col">
              {nav.map((item, i) => {
                const active = isLinkActive(item)
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.08 + i * 0.06 }}
                    className="border-b border-charcoal/10"
                  >
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`block py-5 font-display text-4xl text-charcoal transition-opacity duration-300 ${
                        active ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                )
              })}
            </ul>
            <motion.a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
              className="mt-auto inline-flex items-center justify-center gap-2 bg-charcoal px-7 py-4 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-soft"
            >
              Book your stay <span aria-hidden="true">↗</span>
            </motion.a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
