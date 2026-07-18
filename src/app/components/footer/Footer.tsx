'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Instagram, Linkedin, Mail, Phone } from 'lucide-react'

type Locale = 'hu' | 'en'

const NAV = [
  { href: '#services', label: { hu: 'Szolgáltatások', en: 'Services' } },
  { href: '#works',    label: { hu: 'Munkák',         en: 'Work' } },
  { href: '#process',  label: { hu: 'Folyamat',       en: 'Process' } },
  { href: '#pricing',  label: { hu: 'Árak',           en: 'Pricing' } },
  { href: '#contact',  label: { hu: 'Kapcsolat',      en: 'Contact' } },
] as const

const DICT = {
  aria: {
    footerNav: { hu: 'Lábléc navigáció', en: 'Footer navigation' },
    newsletter: { hu: 'Hírlevél feliratkozás', en: 'Newsletter subscription' },
    linkedin: { hu: 'LinkedIn', en: 'LinkedIn' },
    instagram: { hu: 'Instagram', en: 'Instagram' },
    map: { hu: 'Iroda térkép', en: 'Office map' },
  },
  org: {
    name: { hu: 'Digital Activision', en: 'Digital Activision' },
    tagline: { hu: 'Full-stack webfejlesztés • Budapest', en: 'Full-stack web development • Budapest' },
    ceo: { hu: 'CEO: Kovács Zalán Dominik', en: 'CEO: Zalán Dominik Kovács' },
  },
  newsletter: {
    placeholder: { hu: 'E-mail címed', en: 'Your email' },
    submit: { hu: 'Feliratkozom', en: 'Subscribe' },
    sending: { hu: 'Küldés…', en: 'Sending…' },
    ok: { hu: 'Sikeres feliratkozás! 🎉', en: 'Subscribed successfully! 🎉' },
    err: { hu: 'Érvénytelen e-mail cím.', en: 'Please enter a valid email.' },
  },
  contact: {
    office: { hu: 'Iroda:', en: 'Office:' },
    wip: { hu: '(fejlesztés alatt)', en: '(under development)' },
    hours: { hu: 'Nyitvatartás:', en: 'Hours:' },
    hoursText: { hu: 'H–P 9:00–18:00', en: 'Mon–Fri 9:00–18:00' },
  },
  legal: {
    rights: { hu: 'Minden jog fenntartva.', en: 'All rights reserved.' },
    privacy: { hu: 'Adatkezelés', en: 'Privacy' },
  }
} as const

export default function Footer() {
  const pathname = usePathname() || '/'
  const locale: Locale = pathname.startsWith('/en') ? 'en' : 'hu'

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<null | 'ok' | 'err'>(null)

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setOk(null)
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setOk('err')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    setLoading(false)
    setOk('ok')
    setEmail('')
  }

  // Nyelvfüggő privacy útvonal (állítsd be a routed szerint)
  const privacyHref = useMemo(() => {
    return locale === 'hu' ? '/adatkezeles' : '/en/privacy'
  }, [locale])

  return (
    <footer
      id="site-footer"
      className="
        relative border-t-[2px] border-[#747474]/40
        bg-[linear-gradient(180deg,_#F7F5FC_0%,_#FFFFFF_80%)]
      "
      aria-labelledby="footer-title"
    >
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="
          grid gap-8 items-start
          md:grid-cols-[minmax(100px,0.6fr)_minmax(180px,0.7fr)_minmax(100px,1.0fr)]
        ">
          {/* Bal – logo, leírás, social */}
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl shadow-sm"
              />
              <div>
                <p className="font-semibold">{DICT.org.name[locale]}</p>
                <p className="text-sm text-neutral-600">{DICT.org.tagline[locale]}</p>
                <p className="text-sm text-neutral-600">{DICT.org.ceo[locale]}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <Link
                href="https://www.linkedin.com/company/digital-activision"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex h-9 w-9 items-center justify-center rounded-lg
                  border border-black/10 bg-white/70 shadow-sm backdrop-blur
                  transition hover:scale-[1.03] hover:bg-white
                "
                aria-label={DICT.aria.linkedin[locale]}
              >
                <Linkedin className="h-[18px] w-[18px]" />
              </Link>
              <Link
                href="https://www.instagram.com/digital_activision"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex h-9 w-9 items-center justify-center rounded-lg
                  border border-black/10 bg-white/70 shadow-sm backdrop-blur
                  transition hover:scale-[1.03] hover:bg-white
                "
                aria-label={DICT.aria.instagram[locale]}
              >
                <Instagram className="h-[18px] w-[18px]" />
              </Link>
            </div>
          </div>

          {/* Közép – gyors nav + hírlevél */}
          <div className="min-w-0 md:pl-0">
            <nav aria-label={DICT.aria.footerNav[locale]} className="text-sm">
              <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-[#475569]">
                {NAV.slice(0, 4).map(item => (
                  <li key={item.href}>
                    <a href={item.href} className="hover:opacity-80">{item.label[locale]}</a>
                  </li>
                ))}
                <li className="col-span-2">
                  <a href="#contact" className="hover:opacity-80">
                    {NAV.find(n => n.href === '#contact')!.label[locale]}
                  </a>
                </li>
              </ul>
            </nav>

            {/* Hírlevél */}
            <form
              onSubmit={onSubmit}
              className="mt-5 flex items-center gap-3"
              aria-label={DICT.aria.newsletter[locale]}
            >
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={DICT.newsletter.placeholder[locale]}
                className="
                  w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px]
                  rounded-xl border border-black/10 bg-white
                  px-4 py-2 text-sm outline-none shadow-sm
                  placeholder:text-neutral-400 focus:border-black/20
                  focus:ring-0
                "
                aria-label={DICT.newsletter.placeholder[locale]}
              />

              <button
                type="submit"
                className="
                  rounded-full border border-black/15 bg-white
                  px-5 py-2 text-sm font-medium text-neutral-800
                  shadow-sm transition hover:bg-neutral-50 active:scale-[0.99]
                "
                disabled={loading}
              >
                {loading ? DICT.newsletter.sending[locale] : DICT.newsletter.submit[locale]}
              </button>
            </form>

            <p
              className="mt-2 text-sm"
              aria-live="polite"
              role="status"
            >
              {ok === 'ok' && DICT.newsletter.ok[locale]}
              {ok === 'err' && <span className="text-red-600">{DICT.newsletter.err[locale]}</span>}
            </p>
          </div>

          {/* Jobb – térkép + elérhetőségek */}
          <div className="min-w-0">
            <div
              className="
                overflow-hidden rounded-xl border border-black/10 bg-white/70
                shadow-sm backdrop-blur
              "
            >
              <iframe
                title={DICT.aria.map[locale]}
                className="h-44 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=19.020%2C47.46%2C19.12%2C47.56&layer=mapnik&marker=47.4979%2C19.0402"
              />
            </div>

            <div className="mt-3 text-sm text-neutral-700">
              <p>
                <span className="font-medium">{DICT.contact.office[locale]}</span>{' '}
                <span className="opacity-70">{DICT.contact.wip[locale]}</span>
              </p>
              <p className="mt-1">
                <span className="font-medium">{DICT.contact.hours[locale]}</span>{' '}
                {DICT.contact.hoursText[locale]}
              </p>
              <p className="mt-1 flex items-center gap-2">
                <Phone className="h-4 w-4 opacity-70" />
                <a href="tel:+36300920547" className="hover:opacity-80">
                  +36 30 092 0547
                </a>
              </p>
              <p className="mt-1 flex items-center gap-2">
                <Mail className="h-4 w-4 opacity-70" />
                <a
                  href="mailto:digitalactivision@gmail.com"
                  className="break-all hover:opacity-80"
                >
                  digitalactivision@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* alsó sáv */}
        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-black/10 pt-4 text-xs text-neutral-600 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {DICT.org.name[locale]}. {DICT.legal.rights[locale]}
          </p>
          <Link href={privacyHref} className="hover:opacity-80">
            {DICT.legal.privacy[locale]}
          </Link>
        </div>
      </div>
    </footer>
  )
}
