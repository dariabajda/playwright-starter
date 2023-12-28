// import { expect } from '@playwright/test';
import { test } from '../fixtures/my-test';

test('should create a bug report', async ({ bookingApi, petApi }) => {
  await bookingApi.createPet();
  await petApi.createPet();
});
