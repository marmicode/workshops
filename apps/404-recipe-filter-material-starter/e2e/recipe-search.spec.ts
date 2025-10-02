import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('keywords').click();
  await page.getByLabel('keywords').fill('Bur');

  await expect(page.getByRole('heading', { level: 2 })).toHaveText(['Burger']);
  await expect(page.getByRole('button', { name: 'ADD' })).toBeVisible();

  await expect(page.getByTestId('catalog')).toHaveScreenshot({
    mask: [page.getByRole('img')],
  });
});
