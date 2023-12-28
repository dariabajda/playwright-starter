import { expect, type APIRequestContext } from '@playwright/test';
import { ApiHandler } from './ApiHandler';

export class PetApi {
  private readonly apiHandler: ApiHandler;

  constructor(public readonly request: APIRequestContext) {
    this.apiHandler = new ApiHandler(request, 'https://petstore.swagger.io/v2');
  }

  async createPet(): Promise<Pet> {
    const newPet = await this.apiHandler.post('/pet', {
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
      headers: {
        test: 'test value',
        test2: 'test value2',
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
