import { defineConfig } from '@playwright/test';

const PORT = process.env.PORT || '5000';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: "cross-env NODE_ENV='test' PORT=5000 node server.js",
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe',
  },
  globalTeardown: './tests/finalCoverageReport.ts',
});
