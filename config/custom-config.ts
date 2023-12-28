import { PlaywrightTestConfig } from '@playwright/test';

// Config to hold extra properties
export interface CustomTestConfig extends PlaywrightTestConfig {
  bookingApiUrl: string;
  baseUrl: string;
  apiUrl: string;
}
