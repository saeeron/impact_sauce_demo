export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
}

export interface User extends CreateUserRequest {
  id: string;
}
