'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, easeOut } from 'framer-motion'
import { dict, Locale } from '@/lib/i18n'

type Project = {
  title: string
  desc: string
  tags: string[]
  image: string
  link?: string
}

// belépő animáció a kártyákhoz
const cardIn = (i: number) => ({
  initial: { opacity: 0, y: 24, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  transition: { delay: 0.06 * i, duration: 0.45, ease: easeOut },
  viewport: { once: true, margin: '-12% 0px -10% 0px' }
})

function MaybeLink({
  href,
  children,
  className,
}: {
  href?: string
  children: React.ReactNode
  className?: string
}) {
  return href ? (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Projekt megnyitása új lapon"
    >
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  )
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <motion.article {...cardIn(i)} className="group">
      {/* KÁRTYA = KÉPKERET */}
      <MaybeLink href={p.link} className="block">
        <div className="relative rounded-2xl border border-black/10 bg-white/80 backdrop-blur-sm overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:shadow-[0_18px_48px_rgba(0,0,0,0.14)]">
          {/* conic glow keret (maszkolva) – hoverre felerősödik */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                'conic-gradient(from 0deg at 50% 50%, rgba(110,70,229,0.5), rgba(70,102,229,0.5), rgba(4,228,255,0.5), rgba(110,70,229,0.5))',
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '2px',
            }}
          />

          {/* „fénycsík” sweep – hoverre átfut */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-6 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ animation: 'sweep 1.2s ease-out forwards', animationPlayState: 'paused' }}
          />
          <style jsx>{`
            .group:hover span[aria-hidden] { animation-play-state: running; }
            @keyframes sweep {
              from { transform: translateX(0) rotate(6deg); }
              to   { transform: translateX(260%) rotate(6deg); }
            }
          `}</style>

          {/* KÉP */}
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={p.image}
              alt={p.title}
              fill
              unoptimized
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority={i === 0}
            />
          </div>
        </div>
      </MaybeLink>

      {/* SZÖVEG + TAG-EK */}
      <div className="pt-4">
        <MaybeLink href={p.link} className="inline-block">
          <h3 className="text-lg md:text-xl font-extrabold text-neutral-900 hover:underline underline-offset-4 decoration-black/20">
            {p.title}
          </h3>
        </MaybeLink>

        <p className="mt-2 text-sm text-[#475569] leading-relaxed">{p.desc}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {p.tags.map((t, idx) => (
            <span
              key={`${t}-${idx}`}
              className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-neutral-700 shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Works({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const projects = t.works.projects as Project[]

  return (
    <section id="works" className="relative py-24 md:py-28 bg-[#F6F7FB]">
      {/* FENTI LINEÁRIS HÁTTÉR */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10"
        style={{ height: '420px', background: 'linear-gradient(180deg, #E8E1F8 0%, #F6F7FB 54%)' }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            {t.works.title}
          </h2>
        </div>
        <p className="mt-3 text-center text-[#475569]">
          {t.works.subtitle}
        </p>

        {/* RÁCS – KÉP-KÁRTYA FELÜL, SZÖVEG KÍVÜL */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={`${p.title}-${i}`} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
