import { APIRequestContext } from '@playwright/test';

// main client to handle api calls
export class ApiClient {
  constructor(private readonly request: APIRequestContext,private readonly baseUrl: string,private readonly headers: Record<string, string> = {}
  ) {}
  async get<T>(path: string): Promise<T> {
    const response = await this.request.get(`${this.baseUrl}${path}`,
      { headers: this.headers }
    );

    return response.json();
  }
  async post<T>(path: string, data: unknown
  ): Promise<T> {
    const response = await this.request.post(
      `${this.baseUrl}${path}`,
      {
        headers: this.headers,
        data
      }
    );
    return response.json();
  }

  async delete(path: string): Promise<void>{
    await this.request.delete(`${this.baseUrl}${path}`,
        { headers: this.headers });
  }
}
