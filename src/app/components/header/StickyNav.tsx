'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { Menu, X } from 'lucide-react'
import logo from '../../../../public/logo.svg'
import { usePortfolioMessages } from '@/i18n/messages'
import { Link, usePathname } from '@/i18n/navigation'
import { isLocale, routing } from '@/i18n/routing'

const NAV = [
  { href: '#services', label: { hu: 'Szolgáltatások', en: 'Services' } },
  { href: '#works',    label: { hu: 'Munkáink',       en: 'Work' } },
  { href: '#pricing',  label: { hu: 'Árak',           en: 'Pricing' } },
  { href: '#process',  label: { hu: 'Folyamat',       en: 'Process' } },
]

const DICT = {
  contact: { hu: 'Kapcsolat', en: 'Contact' },
  ariaNav: { hu: 'Fő navigáció', en: 'Primary navigation' },
}

const grad = 'bg-[linear-gradient(90deg,_#6E46E5_0%,_#4666E5_50%,_#04E4FF_100%)]'

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const requestedLocale = useLocale()
  const locale = isLocale(requestedLocale) ? requestedLocale : routing.defaultLocale
  const nextLocale = locale === 'hu' ? 'en' : 'hu'
  const messages = usePortfolioMessages()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleJump = () => setOpen(false)

  const maxHClosed = 96
  const maxHOpen = 330

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-shadow',
        'supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:backdrop-blur-md',
        scrolled ? 'shadow-md' : ''
      ].join(' ')}
      role="navigation"
      aria-label={DICT.ariaNav[locale]}
      style={{ maxHeight: open ? `${maxHOpen}px` : `${maxHClosed}px`, transition: 'max-height 220ms ease' }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <a href="#hero" onClick={handleJump} className="flex items-center gap-3 font-semibold">
            <Image src={logo} alt="Digital Activision" className="h-10 w-auto md:h-12" priority />
            <span className="hidden sm:inline">Digital Activision</span>
          </a>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map(item => (
              <a key={item.href} href={item.href} onClick={handleJump} className="text-sm hover:opacity-80">
                {item.label[locale]}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleJump}
              className={['ml-2 inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90', grad].join(' ')}
            >
              {messages.nav.contact}
            </a>
            <div className="ml-4 h-5 w-px bg-neutral-300" />
              <Link href={pathname} locale={nextLocale} className="text-sm font-medium" prefetch={false}>
                {nextLocale.toUpperCase()}
              </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/5"
            aria-label="Menü"
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile nav */}
        <nav className={['md:hidden overflow-hidden', open ? 'mt-1 pb-4' : 'h-0'].join(' ')} aria-hidden={!open}>
          <ul className="flex flex-col gap-1">
            {NAV.map(item => (
              <li key={item.href}>
                <a href={item.href} onClick={handleJump} className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5">
                  {item.label[locale]}
                </a>
              </li>
            ))}
            <li className="pt-1">
              <a
                href="#contact"
                onClick={handleJump}
                className={['block text-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90', grad].join(' ')}
              >
                {messages.nav.contact}
              </a>
            </li>
            <li>
              <div className="my-1 h-px bg-neutral-200" />
              {/* <Link
                href={switchHref}
                onClick={handleJump}
                className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-black/5"
                prefetch={false}
                scroll={false}
              >
                {nextLocale.toUpperCase()}
              </Link> */}
              <Link href={pathname} locale={nextLocale} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-black/5" prefetch={false} onClick={handleJump}>
                {nextLocale.toUpperCase()}
              </Link>

            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
