import { test } from '../../../graphqlHelper';
import { currentUserResponse } from '../../../mockResponses/GetCurrentUserData';
import { expect } from '@playwright/test';
import { loginUser } from '../../../utils/auth';
import { mockTenantSetting } from '../../../utils/mock';
import { coursesResponse, course1, courseEmptyResponse, course3, course2 } from '../../../mockResponses/GetCoursesData';
import { tag1, tag3, tagsResponse } from '../../../mockResponses/GetTagsData';

test.describe('GetCourses Query Only', () => {
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

  test('displays courses from GetCourses mock', async ({ page, interceptGQL }) => {
    await interceptGQL([
      {
        operationName: 'GetCourses',
        res: coursesResponse,
      }
    ]);

    await page.goto('/admin/courses');

    await expect(page).toHaveTitle('Courses');

    for (const edge of coursesResponse.courses.edges || []) {
      const course = edge.node;
      if (!course) continue;

      const courseLocator = page.locator(`text=${course.title}`);
      await expect(courseLocator).toBeVisible();
      const courseRow = courseLocator.locator('xpath=ancestor::tr');

      if (course.tags?.edges?.length > 0 && course.tags.edges[0].node.label) {
        await expect(courseRow.locator(`span.line-clamp-1.text-gray-500:has-text("${course.tags.edges[0].node.label}")`)).toBeVisible();
        await expect(courseRow.locator(`span.line-clamp-2:has-text("${course.tags.edges[0].node.label}")`)).toBeVisible();
      }

      if (course.image) {
        const imageLocator = courseRow.locator('img');
        await expect(imageLocator).toHaveAttribute('src', `/uploaded_images/${course.image.id}?w=50`);
      } else {
        await expect(courseRow.locator('svg.StyledIconBase-sc-ea9ulj-0.p-1')).toBeVisible();
      }

      await expect(courseRow.locator(`span:has-text("${course.users.totalCount} user")`)).toBeVisible();
      await expect(courseRow.locator(`td:has-text("${course.creditsUsed}")`)).toBeVisible();
    }

    await expect(page.locator(`text=Showing ${coursesResponse.courses.edges.length} courses`)).toBeVisible();
  });

  test('search courses', async ({ page, interceptGQL }) => {
    await interceptGQL([
      {
        operationName: 'GetCourses',
        res: courseEmptyResponse,
        variables: {
          where: { title: 'Emergency' }
        }
      },
      {
        operationName: 'GetCourses',
        res: {
          courses: {
            edges: [{ ...course1 }],
            totalCount: 1,
            notStartedCount: 1,
            inProgressCount: 0,
            completedCount: 0,
            pageInfo: {
              __typename: "PageInfo",
              endCursor: null,
              hasNextPage: false,
            },
          }
        },
        variables: {
          where: { title: 'Introduction to Equality' }
        }
      },
      {
        operationName: 'GetCourses',
        res: coursesResponse,
      }
    ]);

    await page.goto('/admin/courses');
    await page.getByPlaceholder('Search...').fill('Emergency');
    await page.getByPlaceholder('Search...').blur();
    await expect(page.locator('text=Showing 0 courses')).toBeVisible();

    await page.click('span:has-text("clear filters")');
    await expect(page.locator(`text=Showing ${coursesResponse.courses.edges.length} courses`)).toBeVisible();

    await page.getByPlaceholder('Search...').fill('Introduction to Equality');
    await page.getByPlaceholder('Search...').blur();
    await expect(page.locator('text=Showing 1 course')).toBeVisible();
    await expect(page.locator(`text=${course1.node.title}`)).toBeVisible();
  });

  test('filter courses by category', async ({ page, interceptGQL }) => {
    await interceptGQL([
      {
        operationName: 'GetCourses',
        res: {
          courses: {
            edges: [{ ...course1 }, { ...course3 }],
            totalCount: 2,
            notStartedCount: 2,
            inProgressCount: 0,
            completedCount: 0,
            pageInfo: {
              __typename: "PageInfo",
              endCursor: null,
              hasNextPage: false,
            },
          }
        },
        variables: {
          where: { tagId: tag1.id }
        }
      },
      {
        operationName: 'GetCourses',
        res: courseEmptyResponse,
        variables: {
          where: { tagId: tag3.id }
        }
      },
      {
        operationName: 'GetCourses',
        res: coursesResponse,
      },
      {
        operationName: 'GetTags',
        res: tagsResponse,
      }
    ]);

    await page.goto('/admin/courses');
    await page.locator('div#react-select-2-placeholder').click();
    await page.locator('div#react-select-2-listbox').locator(`text=${tag3.label}`).click();
    await expect(page.locator('text=Showing 0 courses')).toBeVisible();

    await page.click('span:has-text("clear filters")');

    await expect(page.locator(`text=Showing ${coursesResponse.courses.edges.length} courses`)).toBeVisible();

    await page.locator('div#react-select-2-placeholder').click();
    await page.locator('div#react-select-2-listbox').locator(`text=${tag1.label}`).click();
    await expect(page.locator('text=Showing 2 courses')).toBeVisible();
    await expect(page.locator(`text=${course1.node.title}`)).toBeVisible();
    await expect(page.locator(`text=${course3.node.title}`)).toBeVisible();
    await expect(page.locator(`text=${course2.node.title}`)).toHaveCount(0);
  });

  test('loading courses', async ({ page, interceptGQL }) => {
    await interceptGQL([
      {
        operationName: 'GetCourses',
        res: coursesResponse,
        delay: 200,
      }
    ]);

    await page.goto('/admin/courses');
    await expect(page.locator('text=Loading courses')).toBeVisible();

    await page.waitForTimeout(200);
    await expect(page.locator('text=Loading courses')).toHaveCount(0);
  });

  test('delete course from actions', async ({ page, interceptGQL, expectGQLMutation }) => {
    await interceptGQL([
      {
        operationName: 'GetCourses',
        res: coursesResponse,
      }
    ]);

    await page.goto('/admin/courses');
    const course = course1.node;

    await page.getByText(course.title)
      .locator('xpath=ancestor::tr')
      .getByRole('button', { name: 'Actions' })
      .click();

    expectGQLMutation([
      {
        operationName: 'DeleteCourse',
        variables: {
          id: course.id
        },
        res: {
          deleteCourse: {
            contentItem: {
              id: course.id,
              _deleted: true,
              __typename: "ContentItem"
            },
            message: '',
            __typename: "DeleteContentItemPayload"
          }
        }
      }
    ]);

    await page.click('a:has-text("Delete course")');
    await expect(page.getByText(`Are you sure you want to delete the course: ${course.title}`)).toBeVisible();

    await page.click('button:has-text("Delete course")');

    await expect(page.getByText(course.title)).toHaveCount(0);
    await expect(page.getByText('Showing 2 courses')).toBeVisible();
  });

  test('clone course from actions', async ({ page, interceptGQL, expectGQLMutation }) => {
    await interceptGQL([
      {
        operationName: 'GetCourses',
        res: coursesResponse,
      }
    ]);

    await page.goto('/admin/courses');
    const course = course1.node;

    await page.getByText(course.title)
      .locator('xpath=ancestor::tr')
      .getByRole('button', { name: 'Actions' })
      .click();

    expectGQLMutation([
      {
        operationName: 'DuplicateCourse',
        variables: {
          id: course.id
        },
        res: {
          duplicateCourse: {
            contentItem: course,
            __typename: "DuplicateContentItemPayload"
          }
        }
      }
    ]);

    await page.click('a:has-text("Clone course")');
    await expect(page.getByText('Showing 3 of 4 courses')).toBeVisible();
  });
});
