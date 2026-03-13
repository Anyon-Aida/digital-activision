'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useCallback } from 'react'
import { dict, Locale } from '@/lib/i18n'

type Item = { title: string; text: string }

function FeatureCard({ item, index }: { item: Item; index: number }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useTransform(ry, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(rx, [-0.5, 0.5], [-6, 6])

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    rx.set(x); ry.set(y)
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }, [rx, ry])

  const onLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    rx.set(0); ry.set(0)
    e.currentTarget.style.setProperty('--mx', '50%')
    e.currentTarget.style.setProperty('--my', '50%')
  }, [rx, ry])

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ delay: 0.08 * index, duration: 0.45, ease: 'easeOut' }}
      className="group"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={[
          'relative will-change-transform',
          'rounded-[18px] border border-black/10 bg-white',
          'shadow-[0_10px_30px_rgba(0,0,0,0.08)]',
          'px-6 py-6 md:px-7 md:py-7',
          'min-h-[168px] md:min-h-[184px]',
          'flex flex-col justify-start',
          'transition-transform duration-200',
          'hover:shadow-[0_18px_46px_rgba(0,0,0,0.12)]'
        ].join(' ')}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[18px] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(56,189,248,0.18), transparent 45%)'
          }}
        />
        <h3 className="relative z-10 text-lg md:text-2xl font-[700] text-neutral-900">
          {item.title}
        </h3>
        <p className="relative z-10 mt-2 text-[20px] leading-6 text-[#475569]">
          {item.text}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function Features({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const items = t.features.items as Item[]

  return (
    <section id="features" className="relative py-28 md:py-40 bg-[#F6F7FB] min-h-[900px]">
      {/* Háttér gradiens */}
      <div
        aria-hidden
        className="absolute inset-x-0 -z-0"
        style={{
          top: '45%',
          bottom: 0,
          background: 'linear-gradient(180deg, #E8E1FB 0%, #F6F7FB 100%)'
        }}
      />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">
            {t.features.title}
          </h2>
          <p className="mt-3 text-[#475569] text-xl opacity-80 pt-6">
            {t.features.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <FeatureCard key={`${item.title}-${i}`} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
