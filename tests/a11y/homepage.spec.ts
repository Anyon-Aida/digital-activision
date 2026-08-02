import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

for (const locale of ['hu', 'en'] as const) {
  test(`${locale.toUpperCase()} homepage has no serious accessibility violations`, async ({ page }) => {
    await page.goto(`/${locale}`)
    await page.evaluate(async () => {
      const revealAnimations = Array.from(
        document.querySelectorAll('.blueprint-reveal'),
      ).flatMap((element) => element.getAnimations())

      await Promise.allSettled(
        revealAnimations.map((animation) => animation.finished),
      )
    })

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    const seriousViolations = results.violations.filter(
      ({ impact }) => impact === 'serious' || impact === 'critical',
    )

    expect(seriousViolations).toEqual([])
  })
}
