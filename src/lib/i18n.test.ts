import { describe, expect, it } from 'vitest'
import { dict } from './i18n'

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
    expect(shapeOf(dict.en)).toEqual(shapeOf(dict.hu))
  })

  it.each(['hu', 'en'] as const)('contains non-empty navigation and hero copy for %s', (locale) => {
    expect(dict[locale].nav.contact.trim()).not.toBe('')
    expect(dict[locale].hero.title.trim()).not.toBe('')
    expect(dict[locale].hero.ctaPrimary.trim()).not.toBe('')
  })
})
