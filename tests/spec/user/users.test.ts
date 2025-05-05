import { test } from '../../graphqlHelper';
import { currentUserResponse } from '../../mockResponses/GetCurrentUserData';
import { ActiveUserResponseData, usersResponseData } from '../../mockResponses/getUsersResponse';
import { expect } from '@playwright/test';
import { loginUser } from '../../utils/auth';
import { mockTenantSetting } from '../../utils/mock';
import fs from 'fs';

test.describe('GetUsers Query Only', () => {

  test.beforeEach(async ({ page, interceptGQL, context }) => {
    await loginUser(context);
    await mockTenantSetting(page);

    await interceptGQL([
      {
        operationName: 'GetCurrentUser',
        res: currentUserResponse
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

      if(user.profileImageUrl) {
        const imageLocator = userRow.locator('img');
        await expect(imageLocator).toHaveAttribute('src', user.profileImageUrl);
      }

      if (user.isActive) {
        await expect(userRow.locator('text=Active')).toBeVisible();
      } else if(user.invitationSentAt) {
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
    expect(content).toContain('Adrian Flinch,aflinch@example.com,"Test, Org-4, new group to test",Learner,active,Last signed in: 22nd April 2025 at 5:38 PM');
    expect(content).toContain('devin rey,devin@gmail.com,,Learner,invited,Invited: 24th April 2025 at 1:28 PM');
    expect(content).toContain('dev test,dev@12gmail.com,Environmental org,Learner,uninvited,Created: 18th April 2025 at 5:28 PM');
  });
});
