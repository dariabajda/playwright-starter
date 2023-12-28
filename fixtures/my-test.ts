import { test as base } from '@playwright/test';
import { PetApi } from '../api/PetApi';
import { BookingApi } from '../api/BookingApi';

interface MyFixtures {
  petApi: PetApi;
  bookingApi: BookingApi;
}

// Extend base test by providing extensions.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  petApi: async ({ request }, use) => {
    await use(new PetApi(request));
  },
  bookingApi: async ({ request }, use) => {
    await use(new BookingApi(request));
  },
});
