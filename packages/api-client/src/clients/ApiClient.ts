import { APIRequestContext } from '@playwright/test';

// main client to handle api calls
export class ApiClient {
  constructor(private readonly request: APIRequestContext,private readonly baseUrl: string,private readonly headers: Record<string, string> = {}
  ) {}

  async get<T>(path: string): Promise<T> { const response = await this.request.get(`${this.baseUrl}${path}`,{headers: this.headers}
    );

    if (!response.ok()) {
      throw new Error(
        `GET ${path} failed: ${response.status()}`
      );
    }
    return response.json();
  }

  async post<T>(path: string,data: unknown
  ): Promise<T> {
    const response = await this.request.post(
      `${this.baseUrl}${path}`,
      {
        headers: this.headers,
        data
      }
    );

    if (!response.ok()) {
      throw new Error(
        `POST ${path} failed: ${response.status()}`
      );
    }

    return response.json();
  }

  async delete<T>(path: string): Promise<void>{
    const response = await this.request.delete(path);
    if (!response.ok()) {
      throw new Error(`DELETE ${path} failed: ${response.status()} ${response.statusText()}`
      );
    }
  }
}
