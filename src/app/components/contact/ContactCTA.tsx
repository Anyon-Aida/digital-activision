'use client'

import { useState } from 'react'
import { motion, AnimatePresence, type HTMLMotionProps } from 'framer-motion'
import { dict, Locale } from '@/lib/i18n'

const GRADIENT_HEIGHT = 1200 
const TITLE_LIFT = 28        

export default function ContactCTA({ locale }: { locale: Locale }) {
  const t = dict[locale].contact
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [agree, setAgree] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agree) return;

    setLoading(true);
    setDone(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    // spam ellen "honeypot" mező (rejtett input) - ha van és töltve van, dobjuk
    if (data.get('company')?.toString().trim()) {
      setLoading(false);
      return;
    }

    try {
      const r = await fetch('https://formspree.io/f/mnnbkkqg', { // <-- IDE a SAJÁT endpointod
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: data,
      });

      if (r.ok) {
        form.reset();
        setAgree(false);
        setDone(true);
        setTimeout(() => setDone(false), 3500);
      } else {
        console.error('Formspree error', await r.text());
        alert('Hoppá, valami hiba történt. Próbáld újra később!');
      }
    } catch (err) {
      console.error(err);
      alert('Hálózati hiba. Próbáld újra később!');
    } finally {
      setLoading(false);
    }
  }



  return (
    <section id="contact" className="relative overflow-hidden py-16 md:py-24">
      {/* Háttér: lágy top gradient + két „fényfolt” parallax-szerű mozgással */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10"
        style={{
          height: GRADIENT_HEIGHT,
          background:
            '#F6F7FB 100%',
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0/2 -translate-x-1/2 rounded-full bg-[#9A7BFF] 
        md:-top-10 md:blur-[200px] md:h-64 md:w-256 md:opacity-30
        -top-10 blur-[70px] h-50 w-50 opacity-30
        "
        animate={{ y: [-6, 6, -6] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[0%] rounded-full bg-[#60E1FF] 
        md:-top-10 md:h-78 md:w-78 md:blur-[200px] md:opacity-40
        -top-10 h-50 w-20 blur-[50px] opacity-30
        "
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      <div className="mx-auto max-w-5xl px-6">
        {/* Felső mini-CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
          style={{ transform: `translateY(-${TITLE_LIFT}px)` }} // <-- címsor kicsit feljebb
        >
          <h2 className="text-[28px] md:text-[34px] font-extrabold text-neutral-900">
            {t.topTitle}
          </h2>
          <p className="mt-2 text-[#475569]">
            {t.topSubtitle}
          </p>

          <a
            href="#contact"
            className="group relative mx-auto mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white
                       shadow-md transition hover:shadow-[0_14px_30px_rgba(70,102,229,0.35)]
                       bg-[linear-gradient(90deg,_#6E46E5_0%,_#4666E5_50%,_#04E4FF_100%)]"
          >
            {/* Futó fénycsík */}
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/25 blur-[6px] transition-transform duration-700 group-hover:translate-x-[260%]" />
            </span>
            {t.topButton}
          </a>
        </motion.div>

        {/* Fő cím + alcím */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl md:text-[34px] font-extrabold text-neutral-900">
            {t.title}
          </h3>
          <p
            className="mt-2 text-[#475569]"
            dangerouslySetInnerHTML={{ __html: t.subtitle }}
          />
        </motion.div>

        {/* FORM KÁRTYA */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative mt-8 rounded-[18px] overflow-hidden
                     border border-black/10 bg-white 
                     p-5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
        >
          {/* Halvány „neon” csík a kártya oldalán */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-[3px] rounded-l-[18px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(110,70,229,0.6) 0%, rgba(70,102,229,0.65) 55%, rgba(4,228,255,0.6) 100%)',
            }}
          />

          {/* Rejtett mező a spam ellen (honeypot) */}
          <input
            type="text"
            name="company"  // vagy bármi más
            autoComplete="off"
            tabIndex={-1}
            className="hidden"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t.fields.name}>
              <Input name="name" placeholder={t.fields.namePh} required />
            </Field>

            <Field label={t.fields.email}>
              <Input name="email" type="email" placeholder={t.fields.emailPh} required/>
            </Field>
          </div>

          <Field className="mt-4" label={t.fields.message}>
            <Textarea
              name="message"
              rows={5}
              placeholder={t.fields.messagePh}
              required
            />
          </Field>

          <div className="mt-4 flex items-center justify-between gap-4">
            <label className="inline-flex select-none items-center gap-2 text-[14px] text-[#475569]">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="h-4 w-4 cursor-pointer rounded border border-black/20 accent-[#4666E5]"
              />
              {t.fields.consent}
            </label>

            <motion.button
              type="submit"
              disabled={loading || !agree}
              whileTap={{ scale: agree ? 0.98 : 1 }}
              className="group relative inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold
                         text-white transition disabled:cursor-not-allowed disabled:opacity-60
                         bg-[linear-gradient(90deg,_#6E46E5_0%,_#4666E5_50%,_#04E4FF_100%)]"
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/25 blur-[6px] transition-transform duration-700 group-hover:translate-x-[260%]" />
              </span>
              {loading ? t.sending : t.send}
            </motion.button>
          </div>

          {/* siker jelzés */}
          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="fixed top-1/3 left-1/2 -translate-x-1/2
                          rounded-full bg-emerald-500 px-5 py-2.5 text-base font-semibold text-white shadow-lg z-[9999]"
              >
                {t.success}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  )
}

/* ====== kisegítő komponensek ====== */

function Field({
  label,
  className = '',
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
      </label>
      {children}
    </div>
  )
}

function Input(props: Omit<HTMLMotionProps<'input'>, 'ref'>) {
  const { className = '', ...rest } = props
  return (
    <motion.input
      {...rest}
      whileFocus={{ boxShadow: '0 0 0 4px rgba(70,102,229,0.12)' }}
      className={[
        'w-full rounded-[12px] border border-black/15 bg-white px-3.5 py-3 text-[15px] text-neutral-900',
        'outline-none transition placeholder:text-[#94A3B8]',
        'focus:ring-2 focus:ring-[#4666E5]/30',
        className,
      ].join(' ')}
    />
  )
}

function Textarea(props: Omit<HTMLMotionProps<'textarea'>, 'ref'>) {
  const { className = '', ...rest } = props
  return (
    <motion.textarea
      {...rest}
      whileFocus={{ boxShadow: '0 0 0 4px rgba(70,102,229,0.12)' }}
      className={[
        'w-full rounded-[12px] border border-black/15 bg-white px-3.5 py-3 text-[15px] text-neutral-900',
        'outline-none transition placeholder:text-[#94A3B8]',
        'focus:ring-2 focus:ring-[#4666E5]/30',
        className,
      ].join(' ')}
    />
  )
}
