import { test } from '../../graphqlHelper';
import { currentUserResponse } from '../../mockResponses/GetCurrentUserData';
import { ActiveUserResponseData, userResponseData, usersResponseData } from '../../mockResponses/getUsersResponse';
import { expect } from '@playwright/test';
import { loginUser } from '../../utils/auth';
import { mockTenantSetting } from '../../utils/mock';
import { rolesResponse } from '../../mockResponses/getRolesMock';

test.describe('User Edit Page', () => {

  test.beforeEach(async ({ page, interceptGQL, context }) => {
    await loginUser(context);
    await mockTenantSetting(page);

    await interceptGQL(page, [
      {
        operationName: 'GetCurrentUser',
        res: currentUserResponse
      },
      {
        operationName: 'GetRoles',
        res: rolesResponse
      }
    ]);
  });

  test('loading user details', async ({ page, interceptGQL }) => {
    await interceptGQL(page, [
      {
        operationName: 'GetUser',
        res: userResponseData,
        variables: {
          id: userResponseData.user.id,
        },
        delay: 200,
      }
    ]);

    await page.goto(`/admin/users/edit?id=${userResponseData.user.id}`);
    await expect(page.locator('text=Loading user details')).toBeVisible();

    await page.waitForTimeout(200);
    await expect(page.locator('text=Loading user details')).toHaveCount(0);
    await expect(page).toHaveTitle(`Edit User: ${userResponseData.user.fullName}`);
  });

  test('user Details', async ({ page, interceptGQL }) => {
    const user = userResponseData.user
    await interceptGQL(page, [
      {
        operationName: 'GetUsers',
        res: usersResponseData,
      },
      {
        operationName: 'GetUser',
        res: userResponseData,
        variables: {
          id: user.id,
        },
      }
    ]);

    await page.goto('/admin/users');
    await page.click(`span:has-text("${user.fullName}")`);

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`/admin/users/edit?id=${user.id}`);
    await expect(page).toHaveTitle(`Edit User: ${user.fullName}`);

    if(user.profileImageUrl) {
      await expect(page.locator('text=Profile image').locator('xpath=ancestor::div[1]').locator('img')).toHaveAttribute('src', user.profileImageUrl);
    }
  });
});
