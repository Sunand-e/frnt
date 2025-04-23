import { test, expect } from '@playwright/test';

test.describe('User page tests', () => {

  test.beforeEach(async ({ page }) => {
    // Mock REST API
    await page.route('/api/v1/tenant/setting', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          "tags": {
            "categories": {
              "enabled": true
            },
            "collections": {
              "enabled": true
            }
          },
          "users": {
            "limit": false,
            "limit_count": "20"
          },
          "groups": {
            "enabled": false
          },
          "styles": {
            "body": {},
            "headings": {}
          },
          "courses": {
            "builder": {
              "enabled": true
            },
            "enabled": true,
            "reports": {
              "enabled": true
            },
            "showSendCourseFeedbackButton": true,
            "showSendFeedbackButtonCourseSetting": true
          },
          "reports": {
            "enabled": true
          },
          "pathways": {
            "enabled": true,
            "reports": {
              "enabled": false
            }
          },
          "resources": {
            "enabled": true,
            "reports": {
              "enabled": false
            }
          },
          "certificates": {
            "awardingBodyText": ""
          },
          "mediaLibrary": {
            "enabled": true
          },
          "organisations": {
            "enabled": false,
            "allowUserLeaderInMultipleOrganizations": true
          },
          "public_settings": {},
          "primaryBrandColor": "#01A2FA",
          "secondaryBrandColor": "#002856",
          "canShareSharedContent": true,
          "canUpdateSharedContentEnrolmentLimits": true,
          "custom_fonts": [],
          "name": "eLearning Plus",
          "logo": "https://elearningplus.zanda360.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt6TXpSbE1qZzJNeTAwT0RrM0xUUXhOV0V0T1dVd01pMWlNREEzTWpreU16VXlZMlVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--e51cb0794e5f57da68b8ed247808b8401098e84b/eLP%20logo%20Colour.svg",
          "logo_white": "https://elearningplus.zanda360.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxqWm1WbU1tSmxaUzFqTXpReUxUUXhOell0T1RNMk15MDJaamd5WlRSaVl6QXhabVVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--0dbf346407b4b37d6b2eb4680be020ac86582070/elp-logo-white.svg",
          "logo_square": "https://elearningplus.zanda360.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWsxTXpkbE16QTBaUzA1TW1WbUxUUmpaRGt0T0RZek55MDNaV0kyWVdObE56QmtNRGtHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--a272eda90e96dc0a6a1d547431fabd67232224ce/eLP-logo-square.svg",
          "logo_square_white": "https://elearningplus.zanda360.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWszWm1Zd01qVTVOaTAzWW1SbUxUUTJPVGt0WWpnNFlpMWpPREpoTXpOaVptWmxaVE1HT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--afe2bf4c86dd00cea4f61a721dd84d2d6a0755ad/elp-logo-white-square.png",
          "logo_for_emails": "https://elearningplus.zanda360.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxsTkdJNU9XSTJOUzAwWXpFeExUUmtNelF0T1RVM1pTMWlNRGt4WlRjNE9XUTVOVFlHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--036f703405a8578f98774bb46f90cd686fa38e6a/elp-logo-white.png",
          "logo_for_certs": "https://elearningplus.zanda360.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWxsWWpVeVltTTJZUzFsTjJKakxUUmxPV0l0T1dFNFl5MHhPRGxtT0dGaE9EUmhNekVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--c97054337f1e4d5f79a54255e9a78d8591d0a177/elp-logo-Colour.png",
          "logo_awarding_body": null
        }),
      });
    });
  });

  test('should display mocked user data', async ({ page }) => {
    await page.goto('/admin/users');

    // Expect REST API mock result
    await expect(page.locator('text=Sign in to your account')).toBeVisible();
    await page.fill('input[name="email"]', 'sunandkumar@digiryte.com');
    await page.fill('input[name="password"]', 'qwerty');
    await page.click('button:has-text("Sign in")');

    // await page.waitForLoadState('networkidle');

    await expect(page.locator('text=Welcome, Super Admin')).toBeVisible();
  });

  // test('should retain user data in Apollo cache', async ({ page }) => {
  //   await page.goto('/user');

  //   // Load user
  //   await page.click('button:has-text("Load User")');
  //   await expect(page.locator('text=John Doe')).toBeVisible();

  //   // Navigate away
  //   await page.goto('/about');
  //   await page.goBack();

  //   // Confirm cached data still present without new request
  //   await expect(page.locator('text=John Doe')).toBeVisible();
  // });
});



