import { type APIRequestContext, APIResponse } from '@playwright/test';
import { Serializable } from 'child_process';

export class ApiHandler {
  constructor(
    public readonly request: APIRequestContext,
    private readonly baseUrl: string
  ) {}

  async post(path: string, options: RequestOptions): Promise<APIResponse> {
    const url = this.baseUrl + path;
    this.logRequest('POST', url, options);
    return await this.request.post(url, options).then((response: APIResponse) => {
      this.logResponse(response);
      return response;
    });
  }

  async get(path: string, options?: RequestOptions): Promise<APIResponse> {
    const url = this.baseUrl + path;
    this.logRequest('GET', url, options);
    return await this.request.get(url, options).then((response: APIResponse) => {
      this.logResponse(response);
      return response;
    });
  }

  async logRequest(method: string, url: string, options?: RequestOptions) {
    console.log(`=== REQUEST ===`);
    console.log(`${method} ${url}\n`);
    if (options) console.log(`Body:\n${JSON.stringify(options.data, null, 2)}\n`);
    console.log(`Headers:`);
    if (options?.headers)
      Object.entries(options.headers).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    console.log();
  }

  async logResponse(response: APIResponse) {
    console.log(`=== RESPONSE ===`);
    console.log(`Status code: ${response.status()}\n`);
    console.log(`Body:\n${JSON.stringify(await response.json(), null, 2)}\n`);
    console.log(`Headers:`);
    if (response.headers())
      Object.entries(response.headers()).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
  }
}

interface RequestOptions {
  data?: string | Serializable;
  headers?: Record<string, string>;
}
