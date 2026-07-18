import { expect, test } from '@playwright/test'

test('redirects the root route to the default Hungarian locale', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveURL(/\/hu$/)
  await expect(page.locator('main')).toBeVisible()
})

for (const locale of ['hu', 'en'] as const) {
  test(`renders the ${locale.toUpperCase()} homepage`, async ({ page }) => {
    await page.goto(`/${locale}`)

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('footer')).toBeAttached()
  })
}
