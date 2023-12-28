import { test as base } from '@playwright/test';
import { BookingApi } from '../api/booking/booking-api';

interface CustomTestFixture {
  bookingApi: BookingApi;
}

// Extend base test by providing extensions.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<CustomTestFixture>({
  bookingApi: async ({ request }, use) => {
    await use(new BookingApi(request));
  },
});
