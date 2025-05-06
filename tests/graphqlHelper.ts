import { test as baseTest, Route } from '@playwright/test';
import { collectCoverage } from './coverage-collector';

type InterceptConfig = {
  operationName: string;
  res: Record<string, unknown>;
  variables?: Record<string, unknown>;
  delay?: number;
  mutation?: boolean;
  passed?: boolean;
};

const isMatch = (expected: Record<string, unknown>, actual: Record<string, unknown>): boolean => {
  return Object.entries(expected).every(([key, value]) => JSON.stringify(actual[key]) === JSON.stringify(value));
};

let accumulatedMocks: InterceptConfig[] = [];

const mockGraphQLResponse = (route: Route, response: Record<string, unknown>, delay: number) => {
  setTimeout(() => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: response }),
    });
  }, delay);
};

const interceptGQLRoute = (route: Route) => {
  const req = route.request().postDataJSON();
  const { operationName, variables } = req;

  const expectedConfig = accumulatedMocks.find(config => config.operationName === operationName && config.mutation);
  const matchedConfig = accumulatedMocks.find(config => config.operationName === operationName && (!config.variables || isMatch(config.variables, variables)));

  if (expectedConfig) {
    if (variables && !isMatch(expectedConfig.variables, variables)) {
      throw new Error(
        `GraphQL mutation "${operationName}" called with unexpected variables.\nExpected: ${JSON.stringify(expectedConfig.variables)}\nReceived: ${JSON.stringify(variables)}`
      );
    }
    expectedConfig.passed = true;
    mockGraphQLResponse(route, expectedConfig.res, expectedConfig?.delay ?? 0);
    return;
  } else if (matchedConfig) {
    mockGraphQLResponse(route, matchedConfig.res, matchedConfig?.delay ?? 0);
    return;
  }
  route.continue();
};

export async function interceptGQL(interceptConfigs: InterceptConfig[]) {
  accumulatedMocks.push(...interceptConfigs);
}

export async function expectGQLMutation(mutationConfigs: InterceptConfig[]) {
  accumulatedMocks.push(...mutationConfigs.map(config => ({ ...config, mutation: true, passed: false })));
}

export const test = baseTest.extend<{
  interceptGQL: typeof interceptGQL;
  expectGQLMutation: typeof expectGQLMutation;
}>({
  interceptGQL: async ({}, use) => {
    await use(interceptGQL);
  },
  expectGQLMutation: async ({}, use) => {
    await use(expectGQLMutation);
  },
  page: async ({ page }, use) => {
    await page.coverage.startJSCoverage();
    await page.route('/graphql', interceptGQLRoute);
    await use(page);
    const unhit = accumulatedMocks.filter(m => m.mutation && !m.passed);
    if (unhit.length > 0) {
      throw new Error(`Unhit GraphQL mutations:\n` + unhit.map(m => `- ${m.operationName}`).join('\n'));
    }
    accumulatedMocks = [];
    await collectCoverage(page);
  },
});
