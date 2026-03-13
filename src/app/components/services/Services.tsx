'use client'

import { motion } from 'framer-motion'
import { easeInOut } from 'framer-motion'
import { dict, Locale } from '@/lib/i18n'

type Service = {
  title: string
  lead: string
  points: string[]
}

// belépő animáció a listapontokhoz
const listVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: easeInOut },
  }),
}

function ServiceCard({ s, idx }: { s: Service; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px -10% 0px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 * (idx % 3) }}
      className="group relative"
    >
      {/* Futó, színes keret – csak hoverkor látszik */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[22px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, rgba(99,102,241,0.35), rgba(59,130,246,0.35), rgba(56,189,248,0.35), rgba(99,102,241,0.35))',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '2px',
        }}
      />

      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="rounded-[20px] border border-black/10 bg-white px-6 py-6 md:px-7 md:py-7 
                   shadow-[0_10px_30px_rgba(0,0,0,0.07)] 
                   group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)]
                   flex flex-col justify-between min-h-[168px] md:min-h-[230px]"
      >
        <div>
          <h3 className="text-xl md:text-[22px] font-extrabold text-neutral-900">
            {s.title}
          </h3>
          <p className="mt-3 text-[15px] leading-7 text-[#475569]">{s.lead}</p>
        </div>

        <ul className="mb-1 space-y-1.5">
          {s.points.map((p, i) => (
            <motion.li
              key={`${p}-${i}`}
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="pl-6 text-[15px] leading-7 text-[#475569] relative"
            >
              <span className="absolute left-0 top-[11px] h-2 w-2 rounded-full bg-emerald-400 group-hover:scale-110 transition-transform" />
              {p}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default function Services({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const services = t.services.items as Service[]

  return (
    <section id="services" className="relative py-24 md:py-28 bg-[#F6F7FB]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            {t.services.title}
          </h2>
          <p className="mt-3 text-[#475569]">
            {t.services.subtitle}
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={`${s.title}-${i}`} s={s} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
