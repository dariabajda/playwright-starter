import { expect } from '@playwright/test';
import { test } from '../../fixtures/custom-test';
import { defaultBooking, updatedBooking } from '../../api/booking/default-booking-data';

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

test('should get new booking in all booking IDs', async ({ bookingApi }) => {
  // given
  const newBooking = await bookingApi.createBooking();

  // when
  const bookingIds = await bookingApi.getAllBookings();

  // then
  expect(bookingIds.map((booking) => booking.bookingid)).toContain(newBooking.bookingid);
});

test('should delete booking', async ({ bookingApi }) => {
  // given
  const newBooking = await bookingApi.createBooking();

  // when
  await bookingApi.deleteBookingById(newBooking.bookingid);

  // then
  const bookingIds = await bookingApi.getAllBookings();
  expect(bookingIds.map((booking) => booking.bookingid)).not.toContain(newBooking.bookingid);
});

test('should update booking', async ({ bookingApi }) => {
  // given
  const newBooking = await bookingApi.createBooking();

  // when
  const updateBookingResponse = await bookingApi.updateBookingById(newBooking.bookingid, updatedBooking);
  expect(updateBookingResponse).toEqual(updatedBooking);

  // then
  const getBookingByIdResponse = await bookingApi.getBookingById(newBooking.bookingid);
  expect(getBookingByIdResponse).toEqual(updatedBooking);
});

test('should partially update booking', async ({ bookingApi }) => {
  // given
  const newBooking = await bookingApi.createBooking();

  // when
  const partialUpdate = { firstname: 'Anna', lastname: 'Wanna' };
  const updateBookingResponse = await bookingApi.partialUpdateBookingById(newBooking.bookingid, partialUpdate);
  expect(updateBookingResponse.firstname).toEqual(partialUpdate.firstname);
  expect(updateBookingResponse.lastname).toEqual(partialUpdate.lastname);
  expect(updateBookingResponse.totalprice).toEqual(defaultBooking.totalprice);
  expect(updateBookingResponse.depositpaid).toEqual(defaultBooking.depositpaid);
  expect(updateBookingResponse.bookingdates).toEqual(defaultBooking.bookingdates);
  expect(updateBookingResponse.additionalneeds).toEqual(defaultBooking.additionalneeds);

  // then
  const getBookingByIdResponse = await bookingApi.getBookingById(newBooking.bookingid);
  expect(getBookingByIdResponse.firstname).toEqual(partialUpdate.firstname);
  expect(getBookingByIdResponse.lastname).toEqual(partialUpdate.lastname);
  expect(getBookingByIdResponse.totalprice).toEqual(defaultBooking.totalprice);
  expect(getBookingByIdResponse.depositpaid).toEqual(defaultBooking.depositpaid);
  expect(getBookingByIdResponse.bookingdates).toEqual(defaultBooking.bookingdates);
  expect(getBookingByIdResponse.additionalneeds).toEqual(defaultBooking.additionalneeds);
});
