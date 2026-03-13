'use client'

import { motion } from 'framer-motion'
import { easeInOut } from 'framer-motion'
import { dict, Locale } from '@/lib/i18n'

type Plan = {
  name: string
  price: string
  note?: string
  features: string[]
  cta: { label: string; href: string; variant: 'primary' | 'ghost' }
  accent?: boolean
}

export default function Pricing({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const plans = t.pricing.plans as Plan[]

  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-24 md:py-28 h-[1600px] md:h-[1200px]"
      aria-labelledby="pricing-title"
      style={{ background: 'linear-gradient(180deg,#E8E1F8 0%, #F6F7FB 54%)' }}
    >
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10" />

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h2 id="pricing-title" className="text-3xl md:text-4xl font-extrabold text-neutral-900">
            {t.pricing.title}
          </h2>
          <p className="mt-3 text-[#475569]">
            {t.pricing.subtitle}
          </p>
        </motion.div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {plans.map((plan, idx) => (
            <PricingCard key={`${plan.name}-${idx}`} plan={plan} index={idx} ariaLabelSuffix={t.pricing.title} />
          ))}
        </div>

        <p className="mt-10 text-center text-[15px] leading-7 text-[#475569]">
          {t.pricing.disclaimer}
        </p>
      </div>
    </section>
  )
}

/** Lista pontok belépő animációja */
const listVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.4, ease: easeInOut },
  }),
}

function PricingCard({
  plan,
  index,
  ariaLabelSuffix,
}: {
  plan: Plan
  index: number
  ariaLabelSuffix: string
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.06 * index }}
      whileHover={{ y: -6, rotateX: 0.3, rotateY: -0.3 }}
      className={[
        'relative h-full rounded-[20px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.07)]',
        'border border-black/10',
        'overflow-hidden',
        'transition-transform will-change-transform',
      ].join(' ')}
      aria-label={`${plan.name} – ${ariaLabelSuffix}`}
    >
      {/* Halvány pöttyözött háttérminta */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]"
        style={{
          background: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1.2px, transparent 1.7px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* Neon keret az accent kártyán */}
      {plan.accent && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[22px] p-[2px]"
          style={{
            background: 'linear-gradient(120deg,#6E46E5, #4666E5 45%, #04E4FF 100%)',
            WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor' as any,
            maskComposite: 'exclude',
          }}
          initial={{ opacity: 0.8, filter: 'blur(0px)' }}
          animate={{ opacity: [0.75, 1, 0.75], filter: ['blur(0px)', 'blur(1.5px)', 'blur(0px)'] }}
          transition={{ duration: 3.2, repeat: Infinity }}
        />
      )}

      {/* Tartalom */}
      <div className="flex h-full flex-col p-6 md:p-7">
        <div>
          <h3 className="text-xl md:text-[22px] font-extrabold text-neutral-900">{plan.name}</h3>

          <p className="mt-3 text-2xl md:text-[26px] font-extrabold tracking-tight">
            {plan.price}
          </p>

          {plan.note && <p className="mt-2 text-sm text-[#64748B]">{plan.note}</p>}

          <ul className="mt-5 space-y-2">
            {plan.features.map((f, i) => (
              <motion.li
                key={`${f}-${i}`}
                custom={i}
                variants={listVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="pl-6 text-[15px] leading-7 text-[#475569] relative"
              >
                <span className="absolute left-0 top-[12px] h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d39980]" />
                {f}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-6">
          {plan.cta.variant === 'primary' ? (
            <a
              href={plan.cta.href}
              className="group relative block rounded-full px-5 py-3 text-center text-sm font-semibold text-white shadow-md
                         bg-[linear-gradient(90deg,#6E46E5_0%,#4666E5_50%,#04E4FF_100%)]
                         hover:shadow-[0_12px_28px_rgba(70,102,229,0.35)]
                         transition"
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute -left-1/3 top-0 h-full w-1/3 translate-x-0 rotate-12 bg-white/25 blur-[6px] transition-transform duration-700 group-hover:translate-x-[260%]" />
              </span>
              {plan.cta.label}
            </a>
          ) : (
            <a
              href={plan.cta.href}
              className="block rounded-full border border-black/10 bg-white px-5 py-3 text-center text-sm font-semibold text-neutral-900 hover:bg-black/5 transition"
            >
              {plan.cta.label}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}
