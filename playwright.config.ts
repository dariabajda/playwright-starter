import { devices } from '@playwright/test';
import { PlaywrightTestConfig } from '@playwright/test';
import { devConfig } from './config/env/devConfig';
import { TestConfig } from './config/testConfig';
import { prodConfig } from './config/env/prodConfig';
import { stageConfig } from './config/env/stageConfig';

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
  reporter: [['list'], ['html', { open: 'never' }]],

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

// get the environment type from command line. If none, set it to stage
const environment = process.env.TEST_ENV || 'stage';

// config object with default configuration and environment specific configuration
const config: TestConfig = {
  ...defaultConfig,
  ...(environment === 'prod' ? prodConfig : environment === 'stage' ? stageConfig : devConfig),
};

export default config;
