import { test } from '@playwright/test';
import config from '../playwright.config';

test('get started link', async () => {
  console.log(config.baseUrl);
  console.log(config.apiUrl);
});
