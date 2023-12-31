import { APIResponse, expect } from '@playwright/test';

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function retryRequest(callback: () => Promise<APIResponse>): Promise<any> {
  let response: APIResponse;
  return await expect(async () => {
    response = await callback();
    return response;
  })
    .toPass({ intervals: [1000, 1500, 2500], timeout: 5000 })
    .then(async () => {
      return await response.json();
    });
}
