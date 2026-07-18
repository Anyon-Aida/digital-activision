import { expect, test } from '@playwright/test'

test('Hungarian homepage above the fold matches its visual baseline', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/hu')
  await page.evaluate(() => document.fonts.ready)

  await expect(page).toHaveScreenshot('homepage-hu-desktop.png', {
    fullPage: false,
  })
})
