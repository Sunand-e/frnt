import { test } from '../../graphqlHelper';
import { currentUserResponse } from '../../mockResponses/GetCurrentUserData';
import { userResponseData, usersResponseData } from '../../mockResponses/getUsersResponse';
import { expect } from '@playwright/test';
import { loginUser } from '../../utils/auth';
import { mockTenantSetting } from '../../utils/mock';
import { rolesResponse } from '../../mockResponses/getRolesMock';
import { groupsResponse } from '../../mockResponses/GetGroupsData';

test.describe('User New Page', () => {

  test.beforeEach(async ({ page, interceptGQL, context }) => {
    await loginUser(context);
    await mockTenantSetting(page);

    await interceptGQL([
      {
        operationName: 'GetCurrentUser',
        res: currentUserResponse
      },
      {
        operationName: 'GetRoles',
        res: rolesResponse
      },
      {
        operationName: 'GetUsers',
        res: usersResponseData,
      },
      {
        operationName: 'GetGroups',
        res: groupsResponse
      }
    ]);
  });

  test('create new user successfully', async ({ page, interceptGQL, expectGQLMutation }) => {
    await page.goto('/admin/users');
    await page.click(`button:has-text("Create new user")`);

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/admin/users/create');
    await expect(page).toHaveTitle('Add new user');

    const EMAIL = 'JOHN.DOE@example.com';
    const FIRST_NAME = 'JOHN';
    const LAST_NAME = 'DOE';
    const GROUP = 'iDM';
    const Role = 'Learner';
    const ID = '2f0d474c-b141-41f2-b0a7-f888ca899eba';
    const USER_RESPONSE = {
      id: ID,
      first_name: FIRST_NAME,
      last_name: LAST_NAME,
      email: EMAIL,
      created_at: "2025-05-06T07:44:13.233Z",
      updated_at: "2025-05-06T07:44:13.294Z",
      status: "active"
    };

    // Edit Basic Details
    await page.fill('input[name="email"]', EMAIL);
    await page.fill('input[name="firstName"]', FIRST_NAME);
    await page.fill('input[name="lastName"]', LAST_NAME);

    // Upload Profile Image
    await page.setInputFiles('input[type="file"]', 'public/images/image-block-placeholder.jpg');

    // add user to group
    await page.locator('div#react-select-3-placeholder').click();
    await page.locator('div#react-select-3-listbox').locator(`text=${GROUP}`).click();

    // Send email invitation
    await page.check('label:has-text("Send user an invitation upon creation") >> input[type="checkbox"]');

    // expect invitation email to be sent
    let createUser = false;
    await page.route('/api/v1/users/', async route => {
      const request = route.request();
      const postData = await request.postDataJSON();
 
      expect(postData).toEqual({
        group_id: groupsResponse.groups.edges.find(group => group.node.name === GROUP).node.id,
        user: {
          email: EMAIL,
          first_name: FIRST_NAME,
          invite: true,
          last_name: LAST_NAME,
          role_ids: [rolesResponse.roles.find(role => role.name === Role)?.id]
        }
      });

      createUser = true;

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: USER_RESPONSE
        })
      });
    });

    // expect profile image to be updated
    let profileImageUpdated = false;
    await page.route(`/api/v1/users/${ID}/update_profile_image`, async route => {
      const request = route.request();

      const buffer = request.postDataBuffer();
      const bodyString = buffer.toString();

      expect(bodyString).toContain('filename="image-block-placeholder.jpg"');
      expect(bodyString).toContain('Content-Type: image/');
      profileImageUpdated = true;

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            ...USER_RESPONSE,
            profileImageUrl: '/images/image-block-placeholder.jpg',
            updatedAt: new Date().toISOString()
          }
        })
      });
    });

    await page.click('button:has-text("Submit")');
    expect(createUser).toBe(true);
    expect(profileImageUpdated).toBe(true);
    await expect(page.getByText('Uploaded: image-block-placeholder.jpg.')).toBeVisible();
  });
});
