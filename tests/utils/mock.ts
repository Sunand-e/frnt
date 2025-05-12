import { Page } from "@playwright/test";
import { tenantSettingResponse } from '../mockResponses/tenantSetting';

export async function mockTenantSetting(page: Page, response = tenantSettingResponse) {
  await page.route('/api/v1/tenant/setting', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(response),
    });
  });
};
