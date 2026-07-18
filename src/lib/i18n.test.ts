import { describe, expect, it } from 'vitest'
import en from '@/locales/en/common.json'
import hu from '@/locales/hu/common.json'

const messages = { hu, en }

function shapeOf(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(shapeOf)
  }

  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, shapeOf(nestedValue)]),
    )
  }

  return typeof value
}

describe('translation dictionaries', () => {
  it('keeps the Hungarian and English dictionaries structurally aligned', () => {
    expect(shapeOf(messages.en)).toEqual(shapeOf(messages.hu))
  })

  it.each(['hu', 'en'] as const)('contains non-empty navigation and hero copy for %s', (locale) => {
    expect(messages[locale].nav.contact.trim()).not.toBe('')
    expect(messages[locale].hero.title.trim()).not.toBe('')
    expect(messages[locale].hero.ctaPrimary.trim()).not.toBe('')
  })
})
