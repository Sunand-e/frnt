
import { test } from '../../graphqlHelper';
import { currentUserResponse } from '../../mockResponses/GetCurrentUserData';
import { userResponseData } from '../../mockResponses/getUsersResponse';
import { expect } from '@playwright/test';
import { tenantSettingResponse } from '../../mockResponses/tenantSetting';

test.describe('GetUsers Query Only', () => {

  test.beforeEach(async ({ page, interceptGQL, browser,context  }) => {
    await context.addCookies([
      {
        name: 'jwt_header_payload',
        value: 'randomHeaderPayloadValue',
        domain: '127.0.0.1', 
        path: '/',
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
      },
      {
        name: 'jwt_signature',
        value: 'randomSignatureValue',
        domain: '127.0.0.1',
        path: '/',
        httpOnly: false,
        secure: false,
        sameSite: 'Lax',
      }
    ]);
    
     await interceptGQL(page, [
      {
        operationName: 'GetUsers',
        res: userResponseData,
      },
      {
        operationName: 'GetCurrentUser',
        res: currentUserResponse
      }
    ]);

   

    await page.route('/api/v1/tenant/setting', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(tenantSettingResponse),
      });
    });
  });

  test('displays users from GetUsers mock', async ({ page }) => {

    
    await page.goto('/admin/users');
    

    for (const edge of userResponseData.users.edges || []) {
      const user = edge.node;
      if (!user) continue;

      const emailLocator = page.locator(`text=${user.email}`);
      await expect(emailLocator).toBeVisible();
      const userRow = emailLocator.locator('xpath=ancestor::tr')

      
     

      const displayName = user.fullName || '';
      if (displayName) {
        await expect(userRow.locator(`text=${displayName}`)).toBeVisible();
      }

      for (const groupEdge of user.groups?.edges || []) {
        const groupName = groupEdge.node?.name;
        if (groupName) {
          await expect(userRow.locator(`text=${groupName}`).first()).toBeVisible();
        }
      }

      for (const role of user.roles || []) {
        await expect(userRow.locator(`text=${role.name}`).first()).toBeVisible();
      }

      
    }
  });
});

