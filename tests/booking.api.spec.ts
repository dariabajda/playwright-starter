import { expect } from '@playwright/test';
import { test } from '../fixtures/my-test';
import { defaultBooking } from '../api/booking/DefaultBooking';

test('should create a booking', async ({ bookingApi }) => {
  // when
  const newBooking = await bookingApi.createBooking();

  // then
  expect(newBooking.bookingid).toBeGreaterThan(0);
  expect(newBooking.booking).toEqual(defaultBooking);
});

test('should get a new booking by ID', async ({ bookingApi }) => {
  // given
  const newBooking = await bookingApi.createBooking();

  // when
  const getBookingByIdResponse = await bookingApi.getBookingById(newBooking.bookingid);

  // then
  expect(getBookingByIdResponse).toEqual(newBooking.booking);
});
