import { test, expect, APIRequestContext } from '@playwright/test';

test('should create a bug report', async ({ request }) => {
  const responseBody = await createPet(request);
  console.log(responseBody.name);
});

interface Pet {
  name: string;
}

async function createPet(request: APIRequestContext): Promise<Pet> {
  const newPet = await request.post('https://petstore.swagger.io/v2/pet', {
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
