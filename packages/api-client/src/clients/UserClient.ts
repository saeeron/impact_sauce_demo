import { ApiClient } from './ApiClient';
import { CreateUserRequest, User } from '../models/User';

export class UsersClient {
  constructor(private readonly api: ApiClient) {}

  async createUser(user: CreateUserRequest): Promise<User> {
    return await this.api.post<User>('/users',user);
  }

  async getUser(id: string): Promise<User> {
    return await this.api.get<User>(`/users/${id}`);
  }

  async deleteUser(id: string): Promise<void> {await this.api.delete(`/users/${id}` );}
}
