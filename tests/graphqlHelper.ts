import { test as baseTest, Page, Route } from '@playwright/test';

type CalledWith = Record<string, unknown>;


type InterceptConfig = {
  operationName: string; 
  res: Record<string, unknown>;
};

type InterceptedPayloads = {
  [operationName: string]: CalledWith[];
};

export async function interceptGQL(
  page: Page,
  interceptConfigs: InterceptConfig[]
): Promise<{ reqs: InterceptedPayloads }> {
  const reqs: InterceptedPayloads = {};

  interceptConfigs.forEach(config => {
    reqs[config.operationName] = [];
  });

  await page.route('/graphql', (route: Route) => {
    const req = route.request().postDataJSON();

    const operationConfig = interceptConfigs.find(
      config => config.operationName === req.operationName
    );

    if (!operationConfig) {
      return route.continue();
    }

    reqs[req.operationName].push(req.variables);

    return route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: operationConfig.res }),
    });
  });

  return { reqs };
}

export const test = baseTest.extend<{ interceptGQL: typeof interceptGQL }>({
  interceptGQL: async ({ browser }, use) => {
    await use(interceptGQL);
  },
});
