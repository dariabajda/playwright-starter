import { Booking } from './BookingApi';

export const defaultBooking: Booking = {
  firstname: 'Jim',
  lastname: 'Brown',
  totalprice: 111,
  depositpaid: true,
  bookingdates: {
    checkin: '2023-09-11',
    checkout: '2023-10-21',
  },
  additionalneeds: 'Breakfast',
};
