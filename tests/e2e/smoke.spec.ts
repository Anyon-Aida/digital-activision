import { expect, test } from '@playwright/test'

test('redirects the root route to the default Hungarian locale', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveURL(/\/hu$/)
  await expect(page.locator('main')).toBeVisible()
})

for (const locale of ['hu', 'en'] as const) {
  test(`canonicalizes the trailing slash for ${locale.toUpperCase()}`, async ({
    request,
  }) => {
    const response = await request.get(`/${locale}/`, { maxRedirects: 0 })

    expect(response.status()).toBe(308)
    expect(
      new URL(response.headers().location!, response.url()).pathname,
    ).toBe(`/${locale}`)
  })
}

for (const locale of ['hu', 'en'] as const) {
  test(`renders the ${locale.toUpperCase()} homepage`, async ({ page }) => {
    await page.goto(`/${locale}`)

    await expect(page.locator('html')).toHaveAttribute('lang', locale)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
    await expect(page.locator('footer')).toBeAttached()
  })
}

test('fails closed for a locale-shaped unsupported route', async ({ page }) => {
  const response = await page.goto('/de')

  expect(response?.status()).toBe(404)
  await expect(page).toHaveURL(/\/de$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'hu')
  await expect(page.getByRole('heading', { name: 'Ez az oldal nem található' })).toBeVisible()
})

test('keeps the current route when switching locale', async ({ page }) => {
  await page.goto('/hu/missing-route')

  await page.getByRole('link', { name: 'EN', exact: true }).click()

  await expect(page).toHaveURL(/\/en\/missing-route$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('heading', { name: 'This page could not be found' })).toBeVisible()
})
