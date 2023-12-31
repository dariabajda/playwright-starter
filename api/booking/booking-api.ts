import { expect, type APIRequestContext, APIResponse } from '@playwright/test';
import { ApiHandler } from '../api-handler';
import { defaultBooking } from './default-booking-data';
import config from '../../playwright.config';

export class BookingApi {
  private readonly apiHandler: ApiHandler;

  constructor(public readonly request: APIRequestContext) {
    this.apiHandler = new ApiHandler(request, config.bookingApiUrl);
  }

  async authorize(authData: { username: string; password: string }): Promise<string> {
    const response = await this.apiHandler.post('/auth', { data: authData });
    expect(response.ok()).toBeTruthy();
    const tokenResponse: { token: string } = await response.json();
    return tokenResponse.token;
  }

  async createBooking(): Promise<{
    bookingid?: number;
    booking: Booking;
  }> {
    let response: APIResponse;
    return await expect(async () => {
      response = await this.apiHandler.post('/booking', { data: defaultBooking });
      expect(response.ok()).toBeTruthy();
      return response;
    })
      .toPass({ intervals: [1000, 1500, 2500], timeout: 5000 })
      .then(async () => {
        return await response.json();
      });
  }

  async getBookingById(id?: number): Promise<Booking> {
    const response = await this.apiHandler.get(`/booking/${id}`);
    expect(response.ok()).toBeTruthy();
    return await response.json();
  }

  async getAllBookings(): Promise<{ bookingid: number }[]> {
    const response = await this.apiHandler.get('/booking');
    expect(response.ok()).toBeTruthy();
    return await response.json();
  }

  async deleteBookingById(id?: number) {
    const authToken = await this.authorize({ username: 'admin', password: 'password123' });
    const response = await this.apiHandler.delete(`/booking/${id}`, { headers: { Cookie: `token=${authToken}` } });
    expect(response.ok()).toBeTruthy();
  }

  async updateBookingById(id: number | undefined, booking: Booking): Promise<Booking> {
    const authToken = await this.authorize({ username: 'admin', password: 'password123' });
    const response = await this.apiHandler.put(`/booking/${id}`, {
      data: booking,
      headers: { Cookie: `token=${authToken}` },
    });
    expect(response.ok()).toBeTruthy();
    return await response.json();
  }

  async partialUpdateBookingById(id: number | undefined, partialUpdate: BookingPartialUpdate): Promise<Booking> {
    const authToken = await this.authorize({ username: 'admin', password: 'password123' });
    const response = await this.apiHandler.patch(`/booking/${id}`, {
      data: partialUpdate,
      headers: { Cookie: `token=${authToken}` },
    });
    expect(response.ok()).toBeTruthy();
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

export interface BookingPartialUpdate {
  firstname?: string;
  lastname?: string;
  totalprice?: number;
  depositpaid?: boolean;
  bookingdates?: { checkin?: string; checkout?: string };
  additionalneeds?: string;
}
