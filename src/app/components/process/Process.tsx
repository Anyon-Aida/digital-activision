'use client'

import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { dict, Locale } from '@/lib/i18n'
import './process-exact.css'

type Step = {
  title: string
  img: string
  body: string[]
  bullets: string[]
}

const useContainer = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [w, setW] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return { ref, w }
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))

export default function ProcessExact({ locale }: { locale: Locale }) {
  const t = dict[locale]
  const STEPS = t.process.steps as Step[]

  const [idx, setIdx] = useState(0)
  const [pa, setPa] = useState(0)

  const idxRef = useRef(0)
  useEffect(() => { idxRef.current = idx }, [idx])

  const draggingRef = useRef(false)
  const lastXRef = useRef(0)
  const lastYRef = useRef(0)
  const accXRef = useRef(0)
  const stepRef = useRef(0)

  const { ref: wrapRef, w } = useContainer()
  const IS_MOBILE = w < 768
  const VISIBLE = IS_MOBILE ? 1 : 2

  // Layout
  const GAP = 96
  const PEEK = 72
  const COL_W = VISIBLE === 2 ? (w ? (w - GAP - PEEK) / 2 : 520) : w ? w - PEEK : 360
  const STEP_X = COL_W + GAP

  // Dots + line geometry
  const ANCHOR_X = 10
  const DOT0_X = ANCHOR_X
  const DOT_X = (i: number) => DOT0_X + i * STEP_X
  const lineLeft = DOT0_X
  const lineWidth = (STEPS.length - 1) * STEP_X

  // pa animation
  useEffect(() => {
    if (IS_MOBILE) { setPa(idx); return }
    let raf: number | null = null
    const tick = () => {
      setPa(prev => {
        const next = prev + (idx - prev) * 0.14
        if (Math.abs(next - idx) < 0.001) return idx
        raf = requestAnimationFrame(tick)
        return next
      })
    }
    raf = requestAnimationFrame(tick)
    return () => { if (raf) cancelAnimationFrame(raf) }
  }, [idx, IS_MOBILE])

  // Keep current step in view
  const [win, setWin] = useState(0)
  useEffect(() => {
    setWin(prev => {
      let w0 = prev
      const maxStart = STEPS.length - VISIBLE
      if (idx < w0) w0 = idx
      else if (idx > w0 + VISIBLE - 1) w0 = idx - (VISIBLE - 1)
      return Math.max(0, Math.min(maxStart, w0))
    })
  }, [idx, VISIBLE, STEPS.length])

  const trackX = useMemo(() => -(win * STEP_X), [win, STEP_X])

  // Progress fill
  const activeDot = Math.round(pa)
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    if (IS_MOBILE) { setPulse(0); return }
    setPulse(0.016); const tmo = setTimeout(() => setPulse(0), 200)
    return () => clearTimeout(tmo)
  }, [idx, IS_MOBILE])

  const fillWidth = Math.max(0, Math.min(lineWidth, pa * STEP_X + pulse * lineWidth))

  // Inputs
  const next = useCallback(() => { if (!IS_MOBILE) setIdx(v => clamp(v + 1, 0, STEPS.length - 1)) }, [IS_MOBILE, STEPS.length])
  const prev = useCallback(() => { if (!IS_MOBILE) setIdx(v => clamp(v - 1, 0, STEPS.length - 1)) }, [IS_MOBILE, STEPS.length])

  const onPanelClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (IS_MOBILE) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - r.left
    if (x > r.width * 0.66) next()
    else if (x < r.width * 0.34) prev()
  }

  // Mobile touch drag
  useEffect(() => {
    if (!IS_MOBILE) return
    const el = wrapRef.current; if (!el) return

    const THRESH = STEP_X * 0.33

    const onStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return
      const t0 = e.touches[0]
      lastXRef.current = t0.clientX
      lastYRef.current = t0.clientY
      accXRef.current = 0
      stepRef.current = idxRef.current
      draggingRef.current = true
    }

    const onMove = (e: TouchEvent) => {
      if (!draggingRef.current) return
      const t0 = e.touches[0]
      const dx = t0.clientX - lastXRef.current
      const dy = t0.clientY - lastYRef.current
      lastXRef.current = t0.clientX
      lastYRef.current = t0.clientY

      if (Math.abs(dx) <= Math.abs(dy) * 1.2) return

      e.preventDefault()
      accXRef.current += dx

      if (accXRef.current >= THRESH && stepRef.current > 0) {
        stepRef.current -= 1
        accXRef.current = 0
        setIdx(stepRef.current)
        return
      }
      if (accXRef.current <= -THRESH && stepRef.current < STEPS.length - 1) {
        stepRef.current += 1
        accXRef.current = 0
        setIdx(stepRef.current)
        return
      }
    }

    const onEnd = () => {
      if (!draggingRef.current) return
      draggingRef.current = false
      accXRef.current = 0
      setIdx(stepRef.current)
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd)
    el.addEventListener('touchcancel', onEnd)

    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
    }
  }, [IS_MOBILE, STEP_X, wrapRef, STEPS.length])

  return (
    <section id="process" className="w-full bg-[#F6F7FB] h-[1100px]">
      <div className="max-w-[1160px] mx-auto px-5 pt-8 md:pt-10 md:pb-6">
        <h2 className="text-center text-[36px] md:text-[42px] font-extrabold text-[#0b1430]">
          {t.process.title}
        </h2>
      </div>

      {/* FULL-BLEED GRADIENT */}
      <div className="full-bleed" style={{ background: 'linear-gradient(180deg,#E8E1F8 0%,#F6F7FB 54%)' }}>
        <div className="max-w-[1160px] mx-auto px-5 py-6 md:py-8">
          <p className="text-center mx-auto text-[#475569] md:text-[20px] max-w-[800px] ">
            {t.process.subtitle}
          </p>

          {/* INTERAKTÍV BLOKK */}
          <div ref={wrapRef} onClick={onPanelClick} className="relative mt-6 md:mt-8 overflow-hidden select-none touch-pan-y">
            {/* képek */}
            <div
              className="flex will-change-transform transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)]"
              style={{ transform: `translate3d(${trackX}px,0,0)`, gap: `${GAP}px`, paddingRight: `${PEEK}px` }}
            >
              {STEPS.map((s, i) => (
                <div key={`img-${i}`} className="shrink-0" style={{ width: `${COL_W}px` }}>
                  <div className="h-[172px] md:h-[182px] flex items-center justify-start">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={600}
                      height={300}
                      sizes="(max-width: 767px) 100vw, 520px"
                      className="max-h-[150px] md:max-h-[200px] object-contain mr-auto"
                      draggable={false}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* timeline */}
            <div className="relative h-8 mt-5 md:mt-6 overflow-visible">
              <div
                className="relative will-change-transform transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)]"
                style={{ transform: `translate3d(${trackX}px,0,0)` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-slate-300/70 rounded-full" style={{ left: `${lineLeft}px`, width: `${lineWidth}px` }} />
                <div className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-[#27E2FF] neon-line rounded-full transition-[width] duration-300 ease-[cubic-bezier(.22,.61,.36,1)]" style={{ left: `${lineLeft}px`, width: `${fillWidth}px` }} />
                {STEPS.map((_, i) => {
                  const left = DOT_X(i)
                  const lit = i <= activeDot
                  return (
                    <button
                      key={`dot-${i}`}
                      aria-label={`${i + 1}. ${t.process.steps[i].title}`}
                      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[15px] h-[15px] rounded-full transition-colors ${lit ? 'bg-[#27E2FF] neon-dot' : 'bg-slate-400/70'}`}
                      style={{ left: `${left}px` }}
                      disabled
                    />
                  )
                })}
              </div>
            </div>

            {/* tartalom */}
            <div
              className="flex will-change-transform transition-transform duration-300 ease-[cubic-bezier(.22,.61,.36,1)] mt-6 md:mt-8"
              style={{ transform: `translate3d(${trackX}px,0,0)`, gap: `${GAP}px`, paddingRight: `${PEEK}px` }}
            >
              {STEPS.map((s, i) => (
                <article key={`step-${i}`} className="shrink-0" style={{ width: `${COL_W}px` }}>
                  <h3 className="text-[32px] md:text-[32px] font-extrabold text-[#6A31FF] mb-3">{s.title}</h3>
                  <div className="space-y-2 text-[18px] text-[#475569]">
                    {s.body.map((tline, ix) => <p key={`b-${i}-${ix}`}>{tline}</p>)}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {s.bullets.map((b, ix) => (
                      <li key={`bl-${i}-${ix}`} className="flex items-start gap-2 text-[#475569]">
                        <Image
                          src="/process/Vector.svg"
                          alt=""
                          aria-hidden="true"
                          width={20}
                          height={20}
                          className="mt-[3px] h-5 w-5"
                        />
                        <span className="text-[18px]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
