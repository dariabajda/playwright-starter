import { expect, type APIRequestContext } from '@playwright/test';

export class BookingApi {
  constructor(public readonly request: APIRequestContext) {}

  async createPet(): Promise<Pet> {
    const newPet = await this.request.post('https://petstore.swagger.io/v2/pet', {
      data: {
        id: 0,
        category: {
          id: 0,
          name: 'string',
        },
        name: 'doggie',
        photoUrls: ['string'],
        tags: [
          {
            id: 0,
            name: 'string',
          },
        ],
        status: 'available',
      },
    });
    expect(newPet.ok()).toBeTruthy();
    expect(newPet.status()).toBe(200);
    return await newPet.json();
  }
}

interface Pet {
  name: string;
}
