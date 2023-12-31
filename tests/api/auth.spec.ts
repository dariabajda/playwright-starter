import { test, expect, APIRequestContext } from '@playwright/test';
import config from '../../playwright.config';

let apiContext: APIRequestContext;

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: config.bookingApiUrl,
  });
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test('auth with incorrect credentials ', async () => {
  const response = await apiContext.post(`/auth`, {
    data: {
      password: 'password1234',
    },
  });
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  expect(responseBody.reason).toEqual('Bad credentials');
});
