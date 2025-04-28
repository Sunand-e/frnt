import { test, expect } from '@playwright/test';
import { tenantSettingResponse } from '../mockResponses/tenantSetting';

test.describe('User page tests', () => {

  test.beforeEach(async ({ page }) => {
    // Mock REST API
    await page.route('/api/v1/tenant/setting', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(tenantSettingResponse),
      });
    });
  });

  // test('should display mocked user data', async ({ page }) => {
  //   await page.goto('/admin/users');

  //   // Expect REST API mock result
  //   await expect(page.locator('text=Sign in to your account')).toBeVisible();
  //   await page.fill('input[name="email"]', 'admin@example.com');
  //   await page.fill('input[name="password"]', 'qwerty');
  //   await page.click('button:has-text("Sign in")');

  //   // await page.waitForLoadState('networkidle');

  //   await expect(page.locator('text=Welcome, Super Admin')).toBeVisible();
  // });
});



