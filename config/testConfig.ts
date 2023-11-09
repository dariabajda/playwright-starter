import { PlaywrightTestConfig } from '@playwright/test';

// Config to hold extra properties
export interface TestConfig extends PlaywrightTestConfig {
  baseUrl: string;
  apiUrl: string;
}
