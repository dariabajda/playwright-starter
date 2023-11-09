import { devices } from '@playwright/test';
import { PlaywrightTestConfig } from '@playwright/test';

// Config to hold extra properties
interface TestConfig extends PlaywrightTestConfig {
  baseUrl: string;
  apiUrl: string;
}

const defaultConfig: PlaywrightTestConfig = {
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
};

// set config for dev
const devConfig: TestConfig = {
  baseUrl: 'https://dev.example.com',
  apiUrl: 'https://dev.api.example.com',
};

// set config for stage
const stageConfig: TestConfig = {
  baseUrl: 'https://stage.example.com',
  apiUrl: 'https://stage.api.example.com',
};

// set config for prod
const prodConfig: TestConfig = {
  baseUrl: 'https://prod.example.com',
  apiUrl: 'https://prod.api.example.com',
};

// get the environment type from command line. If none, set it to dev
const environment = process.env.TEST_ENV || 'dev';

// config object with default configuration and environment specific configuration
const config: TestConfig = {
  ...defaultConfig,
  ...(environment === 'dev' ? devConfig : environment === 'prod' ? prodConfig : stageConfig),
};

export default config;
