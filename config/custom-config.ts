import { PlaywrightTestConfig } from '@playwright/test';

// Config to hold extra properties
export interface CustomTestConfig extends PlaywrightTestConfig {
  baseUrl: string;
  apiUrl: string;
}
