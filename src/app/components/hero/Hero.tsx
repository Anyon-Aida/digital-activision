'use client'
import Link from 'next/link'
import { usePortfolioMessages } from '@/i18n/messages'


export default function Hero() {
  const t = usePortfolioMessages()

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-46 md:pt-72 pb-24 md:pb-28"
      aria-labelledby="hero-title"
    >
      {/* Háttér */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,_#B0B6EE_0%,_#59EEFF_35%,_#FFFFFF_100%)]" />
        <div
          className="absolute rounded-full bg-[#A146F2] opacity-80 blur-[10vw]"
          style={{ width: '22vw', height: '22vw', right: '14vw', top: '8vw' }}
        />
        <div
          className="absolute rounded-full bg-[#04FFFF] opacity-80 blur-[9vw]"
          style={{ width: '18vw', height: '18vw', left: '55vw', top: '48vw' }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-12">
          {/* BAL: 7 oszlop */}
          <div className="md:col-span-7">
            <h1
              id="hero-title"
              className="font-extrabold tracking-tight leading-[1.4]
                         text-[34px] sm:text-[40px] md:text-[56px] lg:text-[50px] text-[#15213d]"
            >
              {t.hero.title}
            </h1>

            <p className="mt-4 max-w-[44ch] text-neutral-700 text-base md:text-lg">
              {t.hero.subtitle}
            </p>

            {/* CTA-k */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="#contact"
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:opacity-90
                           bg-[linear-gradient(90deg,_#6E46E5_0%,_#4666E5_50%,_#04E4FF_100%)]"
              >
                {t.hero.ctaPrimary}
              </Link>
              <a
                href="#works"
                className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-6 py-3 text-sm font-semibold text-neutral-900 backdrop-blur-sm transition hover:bg-white shadow-[0_1px_0_rgba(0,0,0,0.02)]"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-2 text-sm text-neutral-600">
              <li>{t.hero.points[0]}</li>
              <li className="relative before:absolute before:-left-5 before:top-1/2 before:h-[3px] before:w-4 before:-translate-y-1/2">
                {t.hero.points[1]}
              </li>
              <li className="relative before:absolute before:-left-5 before:top-1/2 before:h-[3px] before:w-4 before:-translate-y-1/2">
                {t.hero.points[2]}
              </li>
            </ul>
          </div>

          {/* JOBB: 5 oszlop – KÓDKÁRTYA */}
          <div className="md:col-span-5 md:justify-self-end md:pt-40">
            <div
              className={[
                'relative isolate overflow-hidden rounded-2xl',
                'bg-white/45 backdrop-blur-[6px]',
                'shadow-[0_15px_45px_rgba(0,0,0,0.18)]',
                'px-6 py-5 md:px-7 md:py-6',
                'md:translate-x-4 md:translate-y-2'
              ].join(' ')}
              style={{ width: 'min(520px, 100%)' }}
            >
              <span className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-black/10" />
              <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_40px_rgba(0,0,0,0.06)]" />
              <span className="pointer-events-none absolute inset-x-0 top-0 h-10 rounded-t-[inherit] bg-gradient-to-b from-white/60 to-transparent" />
              <pre className="relative whitespace-pre-wrap md:text-sm text-[10px] leading-relaxed text-[#8E98A6]">
                {t.hero.code}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
