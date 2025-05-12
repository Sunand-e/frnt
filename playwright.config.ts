import { defineConfig } from '@playwright/test';

const PORT = process.env.PORT || '5000';

export default defineConfig({
  testDir: './tests',
  timeout: process.env.CI ? 30000 : 100000,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : undefined,
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: `cross-env NODE_ENV='test' PORT=${PORT} node server.js`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  globalTeardown: './tests/finalCoverageReport.ts',
  reporter: [['html', { open: 'never' }]],
});
