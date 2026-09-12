export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
}
