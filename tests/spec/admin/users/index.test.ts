import { test } from '../../../graphqlHelper';
import { currentUserResponse } from '../../../mockResponses/GetCurrentUserData';
import { ActiveUserResponseData, InvitedUserResponseData, UninvitedUserResponseData, usersResponseData } from '../../../mockResponses/getUsersResponse';
import { expect } from '@playwright/test';
import { loginUser } from '../../../utils/auth';
import { mockTenantSetting } from '../../../utils/mock';
import fs from 'fs';
import { coursesResponse } from '../../../mockResponses/GetCoursesData';
import dayjs from 'dayjs';
var advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

test.describe('GetUsers Query Only', () => {

  test.beforeEach(async ({ page, interceptGQL, context }) => {
    await loginUser(context);
    await mockTenantSetting(page);

    await interceptGQL([
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

  test('displays users from GetUsers mock', async ({ page, interceptGQL }) => {
    await interceptGQL([
      {
        operationName: 'GetUsers',
        res: usersResponseData,
      }
    ]);

    await page.goto('/admin/users');

    await expect(page).toHaveTitle('Users');

    for (const edge of usersResponseData.users.edges || []) {
      const user = edge.node;
      if (!user) continue;

      const emailLocator = page.locator(`text=${user.email}`);
      await expect(emailLocator).toBeVisible();
      const userRow = emailLocator.locator('xpath=ancestor::tr');

      const displayName = user.fullName || '';
      if (displayName) {
        await expect(userRow.locator(`text=${displayName}`)).toBeVisible();
      }

      const groupNames = user.groups?.edges?.map(groupEdge => groupEdge.node?.name).join(', ') || '';
      await expect(userRow.locator(`text=${groupNames}`).first()).toBeVisible();

      const roles = user.roles?.map(role => role.name).join(', ') || '';
      await expect(userRow.locator(`text=${roles}`).first()).toBeVisible();

      if (user.profileImageUrl) {
        const imageLocator = userRow.locator('img');
        await expect(imageLocator).toHaveAttribute('src', user.profileImageUrl);
      }

      if (user.isActive) {
        await expect(userRow.locator('text=Active')).toBeVisible();
      } else if (user.invitationSentAt) {
        await expect(userRow.locator('text=Invited')).toBeVisible();
      } else {
        await expect(userRow.locator('text=Not yet invited')).toBeVisible();
      }
    }

    await expect(page.locator(`text=Showing ${usersResponseData.users.edges.length} users`)).toBeVisible();
  });

  test('search users', async ({ page, interceptGQL }) => {
    await interceptGQL([
      {
        operationName: 'GetUsers',
        res: {
          users: {
            edges: [],
            totalCount: 0,
            pageInfo: {
              __typename: "PageInfo",
              endCursor: null,
              hasNextPage: false,
            },
          }
        },
        variables: {
          where: { globalFilter: 'evin' }
        }
      },
      {
        operationName: 'GetUsers',
        res: {
          users: {
            edges: [{ ...ActiveUserResponseData }],
            totalCount: 0,
            pageInfo: {
              __typename: "PageInfo",
              endCursor: null,
              hasNextPage: false,
            },
          }
        },
        variables: {
          where: { globalFilter: 'aflinch' }
        }
      },
      {
        operationName: 'GetUsers',
        res: usersResponseData,
      }
    ]);

    await page.goto('/admin/users');
    await page.getByPlaceholder('Search...').fill('evin');
    await page.getByPlaceholder('Search...').blur();
    await expect(page.locator('text=Showing 0 users')).toBeVisible();

    await page.click('span:has-text("clear filters")');
    await expect(page.locator(`text=Showing ${usersResponseData.users.edges.length} users`)).toBeVisible();

    await page.getByPlaceholder('Search...').fill('aflinch');
    await page.getByPlaceholder('Search...').blur();
    await expect(page.locator('text=Showing 1 users')).toBeVisible();
    await expect(page.locator(`text=${ActiveUserResponseData.node.email}`)).toBeVisible();
  });

  test('loading users', async ({ page, interceptGQL }) => {
    await interceptGQL([
      {
        operationName: 'GetUsers',
        res: usersResponseData,
        delay: 200,
      }
    ]);

    await page.goto('/admin/users');
    await expect(page.locator('text=Loading users')).toBeVisible();

    await page.waitForTimeout(200);
    await expect(page.locator('text=Loading users')).toHaveCount(0);
  });

  test('should export users CSV with correct data', async ({ page, interceptGQL }) => {
    await interceptGQL([
      {
        operationName: 'GetUsers',
        res: usersResponseData,
      }
    ]);

    const downloadPromise = page.waitForEvent('download');

    await page.goto('/admin/users');
    await page.click('button:has-text("Export to CSV")');

    const download = await downloadPromise;
    const filePath = await download.path();

    expect(download.suggestedFilename()).toBe('user_list.csv');
    const content = fs.readFileSync(filePath!, 'utf-8');
    expect(content).toContain('User,Email,Groups,Global Roles,Status,TimeStamp');
    expect(content).toContain(`Adrian Flinch,aflinch@example.com,"Test, Org-4, new group to test",Learner,active,Last signed in: ${dayjs(ActiveUserResponseData.node.currentSignInAt).format('Do MMMM YYYY [at] h:mm A')}`);
    expect(content).toContain(`devin rey,devin@gmail.com,,Learner,invited,Invited: ${dayjs(InvitedUserResponseData.node.invitationSentAt).format('Do MMMM YYYY [at] h:mm A')}`);
    expect(content).toContain(`dev test,dev@12gmail.com,Environmental org,Learner,uninvited,Created: ${dayjs(UninvitedUserResponseData.node.createdAt).format('Do MMMM YYYY [at] h:mm A')}`);
  });

  test('send invitation and Act as user from actions', async ({ page, interceptGQL, context }) => {
    await interceptGQL([
      {
        operationName: 'GetUsers',
        res: usersResponseData,
      }
    ]);

    await page.goto('/admin/users');
    const user = ActiveUserResponseData.node;

    await page.getByText(user.email)
      .locator('xpath=ancestor::tr')
      .getByRole('button', { name: 'Actions' })
      .click();

    let invitationSent = false;
    await page.route(`/api/v1/users/send_invitation`, async route => {
      const request = route.request();
      const postData = await request.postDataJSON();

      expect(postData).toEqual({ user_ids: [user.id] });
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

    await page.click('a:has-text("Send invitation")');
    expect(invitationSent).toBe(true);
    await expect(page.getByText('Invitation Sent')).toBeVisible();

    // close the toast notification
    await page.locator('button.Toastify__close-button.Toastify__close-button--light').click();

    await page.route(`/api/v1/user/act_as/${user.id}`, async route => {
      invitationSent = true;
      await context.addCookies([{
        name: 'actAsUser',
        value: user.id.toString(),
        path: '/',
        domain: 'localhost',
        httpOnly: false,
        secure: true,
        sameSite: 'Strict'
      }]);

      return route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token: "ActAsUserToken" })
      });
    });

    await page.getByText(user.email)
      .locator('xpath=ancestor::tr')
      .getByRole('button', { name: 'Actions' })
      .click();

    await page.click('a:has-text("Act as user")');

    const cookies = await context.cookies();
    const targetCookie = cookies.find(c => c.name === 'actAsUser');
    expect(targetCookie).toBeDefined();

    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/');
    await page.click('button:has-text("Return to my account")');

    await expect(page.locator('button:has-text("Return to my account")')).toHaveCount(0);
  });

  test('delete user from actions', async ({ page, interceptGQL, expectGQLMutation }) => {
    await interceptGQL([
      {
        operationName: 'GetUsers',
        res: usersResponseData,
      }
    ]);

    await page.goto('/admin/users');
    const user = ActiveUserResponseData.node;

    await page.getByText(user.email)
      .locator('xpath=ancestor::tr')
      .getByRole('button', { name: 'Actions' })
      .click();

    expectGQLMutation([
      {
        operationName: 'DeleteUser',
        variables: {
          id: user.id
        },
        res: {
          deleteUser: {
            user: {
              id: user.id,
              __typename: "User"
            },
            __typename: "DeleteUserPayload"
          }
        }
      }
    ]);

    await page.click('a:has-text("Delete user")');
    await expect(page.getByText(`Are you sure you want to delete the user: ${user.firstName}`)).toBeVisible();

    await page.click('button:has-text("Delete user")');

    await expect(page.getByText(user.email)).toHaveCount(0);
    await expect(page.getByText('Showing 2 users')).toBeVisible();
  });
});
