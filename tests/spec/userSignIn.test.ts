import { expect } from '@playwright/test';
import { test } from '../graphqlHelper';
import { currentUserResponse } from '../mockResponses/GetCurrentUserData';
import { coursesResponse } from '../mockResponses/GetCoursesData';
import { mockTenantSetting } from '../utils/mock';

test.describe('User page tests', () => {

  test.beforeEach(async ({ page, interceptGQL }) => {
    await mockTenantSetting(page);

    await interceptGQL(page, [
      {
        operationName: 'GetCurrentUser',
        res: currentUserResponse
      },
      {
        operationName: 'GetCourses',
        res: coursesResponse,
      }
    ]);
  });

  test('user signIn Success', async ({ page }) => {
    await page.route('/api/v1/user/sign_in', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          { "mfa_enabled": false, "status": true }
        ),
      });
    });

    await page.goto('/admin/users');

    await expect(page.locator('text=Sign in to your account')).toBeVisible();

    await page.fill('input[name="email"]', 'sunandkumar@digiryte.com');
    await page.fill('input[name="password"]', 'qwerty');
    await page.click('button:has-text("Sign in")');
    await expect(page.locator('text=Super Admin')).toBeVisible();
  });

  test('user signIn Failed', async ({ page }) => {
    await page.route('/api/v1/user/sign_in', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(
          { "status": false, "error": "Incorrect email or password" }
        ),
      });
    });

    await page.goto('/admin/users');

    await expect(page.locator('text=Sign in to your account')).toBeVisible();

    await page.fill('input[name="email"]', 'sunandkumar@digiryte.com');
    await page.fill('input[name="password"]', 'qwerty');
    await page.click('button:has-text("Sign in")');

    await expect(page.locator('text=Sign in to your account')).toBeVisible();
    await expect(page.locator('text=Username or password is incorrect')).toBeVisible();
  });
});
