// lib/i18n.ts
import hu from '@/locales/hu/common.json'
import en from '@/locales/en/common.json'
export type Locale = 'hu' | 'en'
export type Dict = typeof hu

export const dict: Record<Locale, Dict> = { hu, en }

