import { test, expect } from '@playwright/test'

test('create and edit job', async ({ page }) => {
  // just open form - placeholder for real e2e
  await page.goto('/admin/jobs/new')
  await expect(page).toHaveURL(/jobs\/new/)
})
