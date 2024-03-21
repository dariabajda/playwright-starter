import { expect } from '@playwright/test';
import { test } from '../../fixtures/custom-test';
import { defaultBooking } from '../../api/booking/default-booking-data';

test.describe('API smoke test', () => {
  test('should create a booking', async ({ bookingApi }) => {
    // when
    const newBooking = await bookingApi.createBookingWithRetry2();

    // then
    expect(newBooking.bookingid).toBeGreaterThan(0);
    expect(newBooking.booking).toEqual(defaultBooking);
  });
});
