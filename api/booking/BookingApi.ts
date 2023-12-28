import { expect, type APIRequestContext } from '@playwright/test';
import { ApiHandler } from '../ApiHandler';
import { defaultBooking } from './DefaultBooking';

export class BookingApi {
  private readonly apiHandler: ApiHandler;

  constructor(public readonly request: APIRequestContext) {
    this.apiHandler = new ApiHandler(request, 'https://restful-booker.herokuapp.com');
  }

  async createBooking(): Promise<{
    bookingid?: number;
    booking: Booking;
  }> {
    const response = await this.apiHandler.post('/booking', { data: defaultBooking });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    return await response.json();
  }

  async getBookingById(id?: number): Promise<Booking> {
    const response = await this.apiHandler.get(`/booking/${id}`);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    return await response.json();
  }

  async getAllBookings(): Promise<{ bookingid: number }[]> {
    const response = await this.apiHandler.get('/booking');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    return await response.json();
  }
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: { checkin: string; checkout: string };
  additionalneeds: string;
}
