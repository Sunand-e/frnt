import { test as baseTest, Page, Route } from '@playwright/test';
import { collectCoverage } from './coverage-collector';

type InterceptConfig = {
  operationName: string;
  res: Record<string, unknown>;
  variables?: Record<string, unknown>;
  delay?: number;
};

function isMatch(expected: Record<string, unknown>, actual: Record<string, unknown>): boolean {
  return Object.entries(expected).every(([key, value]) => JSON.stringify(actual[key]) === JSON.stringify(value));
}

let accumulatedMocks: InterceptConfig[] = [];

export async function interceptGQL(
  page: Page,
  interceptConfigs: InterceptConfig[]
) {

  accumulatedMocks = [...accumulatedMocks, ...interceptConfigs];

  await page.route('/graphql', (route: Route) => {
    const req = route.request().postDataJSON();
    const { operationName, variables } = req;

    const operationConfig = accumulatedMocks.find(
      config =>
        config.operationName === operationName &&
        (!config.variables || isMatch(config.variables, variables))
    );

    if (!operationConfig) {
      return route.continue();
    }

    setTimeout(() => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: operationConfig.res }),
      });
    }, operationConfig?.delay ?? 0);
  });
}

export const test = baseTest.extend<{
  interceptGQL: typeof interceptGQL;
}>({
  interceptGQL: async ({}, use) => {
    await use(interceptGQL);
  },
  page: async ({ page }, use) => {
    await page.coverage.startJSCoverage();
    await use(page);
    accumulatedMocks = [];
    await collectCoverage(page);
  },
});
