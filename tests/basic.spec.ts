import { test, expect } from '@playwright/test';

test('can view home and go to market', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page.getByText('كيف يعمل Zaan')).toBeVisible();
  await page.goto('http://localhost:3000/app/buy');
  await expect(page.getByText('شراء')).toBeVisible();
});
