import { defineConfig, devices } from '@playwright/test';

const url = 'http://127.0.0.1:4175';

export default defineConfig({
  testDir: './tests',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: url,
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --port 4175 --strictPort',
    url,
  },
});
