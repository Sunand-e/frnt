import { test } from '../../graphqlHelper';
import { currentUserResponse } from '../../mockResponses/GetCurrentUserData';
import { userResponseData, usersResponseData } from '../../mockResponses/getUsersResponse';
import { expect } from '@playwright/test';
import { loginUser } from '../../utils/auth';
import { mockTenantSetting } from '../../utils/mock';
import { rolesResponse } from '../../mockResponses/getRolesMock';

test.describe('User Edit Page', () => {

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
      }
    ]);
  });

  test('loading user details', async ({ page, interceptGQL }) => {
    await interceptGQL([
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

  test('update basic Details', async ({ page, interceptGQL, expectGQLMutation }) => {
    const user = userResponseData.user
    await interceptGQL([
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

    await expect(page.locator('input[name="firstName"]')).toHaveValue(user.firstName);
    await expect(page.locator('input[name="lastName"]')).toHaveValue(user.lastName);
    await expect(page.locator('input[name="email"]')).toHaveValue(user.email);

    if (user.profileImageUrl) {
      await expect(page.locator('text=Profile image').locator('xpath=ancestor::div[1]').locator('img')).toHaveAttribute('src', user.profileImageUrl);
    }

    const EMAIL = 'JOHN.DOE@example.com';
    const FIRST_NAME = 'JOHN';
    const LAST_NAME = 'DOE';

    // Edit Basic Details
    await page.fill('input[name="email"]', EMAIL);
    await page.fill('input[name="firstName"]', FIRST_NAME);
    await page.fill('input[name="lastName"]', LAST_NAME);

    // Upload Profile Image
    await page.setInputFiles('input[type="file"]', 'public/images/image-block-placeholder.jpg');

    // Send email invitation
    await page.check('label:has-text("Send the user an invitation email") >> input[type="checkbox"]');

    // expect the GraphQL mutation to be called with the correct variables
    expectGQLMutation([
      {
        operationName: 'UpdateUser',
        variables: {
          id: user.id,
          email: EMAIL,
          firstName: FIRST_NAME,
          lastName: LAST_NAME
        },
        res: {
          updateUser: {
            user: {
              ...user,
              email: EMAIL,
              firstName: FIRST_NAME,
              lastName: LAST_NAME,
              fullName: `${FIRST_NAME} ${LAST_NAME}`,
              updatedAt: new Date().toISOString()
            },
            "__typename": "UpdateUserPayload"
          }
        }
      }
    ]);

    // expect invitation email to be sent
    let invitationSent = false;
    await page.route('/api/v1/users/send_invitation', async route => {

      const request = route.request();
      const postData = await request.postDataJSON();

      expect(postData).toEqual({ emails: [EMAIL] });
      invitationSent = true;

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: "Invitations Sent",
          user_ids: [user.id]
        })
      });
    });

    // expect profile image to be updated
    let profileImageUpdated = false;
    await page.route(`/api/v1/users/${user.id}/update_profile_image`, async route => {
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
            ...user,
            profileImageUrl: '/images/image-block-placeholder.jpg',
            updatedAt: new Date().toISOString()
          }
        })
      });
    });

    page.click('button:has-text("Submit")')
    await expect(page).toHaveURL('/admin/users');
    expect(invitationSent).toBe(true);
    expect(profileImageUpdated).toBe(true);

    const emailLocator = page.locator(`text=${EMAIL}`);
    await expect(emailLocator).toBeVisible();
    const userRow = emailLocator.locator('xpath=ancestor::tr');

    await expect(userRow.locator(`text=${FIRST_NAME} ${LAST_NAME}`)).toBeVisible();
  });

  test('update Role', async ({ page, interceptGQL, expectGQLMutation }) => {
    const user = userResponseData.user
    await interceptGQL([
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
    await expect(page.locator('input[name="email"]')).toHaveValue(user.email);

    // Edit User Role
    await page.click('div[aria-label="Remove Learner"]');

    await page.locator('div#react-select-2-placeholder').click();
    await page.locator('div.css-1n6sfyn-MenuList').locator('text=Supervisor').click();

    expectGQLMutation([
      {
        operationName: 'UpdateUser',
        variables: {
          id: user.id
        },
        res: {
          updateUser: {
            user: {
              ...user
            },
            "__typename": "UpdateUserPayload"
          }
        }
      },
      {
        operationName: 'UpdateUserTenantRoles',
        variables: {
          userId: user.id,
          roleIds: [rolesResponse.roles.find(role => role.name === 'Supervisor')?.id]
        },
        res: {
          updateUserTenantRoles: {
            user: {
              ...user,
              updatedAt: new Date().toISOString(),
              roles: [
                rolesResponse.roles.find(role => role.name === 'Supervisor')
              ]
            },
            __typename: 'UpdateUserTenantRolesPayload',
          }
        }
      }
    ]);

    await page.click('button:has-text("Submit")');
    await expect(page).toHaveURL('/admin/users');

    const emailLocator = page.locator(`text=${user.email}`);
    await expect(emailLocator).toBeVisible();

    await expect(emailLocator.locator('xpath=ancestor::tr').locator(`text=Supervisor`)).toBeVisible();
  });
});
