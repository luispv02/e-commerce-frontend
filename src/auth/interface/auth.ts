import type { User } from "../../interfaces/user";

export interface AuthResponse {
  ok: boolean,
  msg: string,
  data: {
    user: User
    token: string
  }
}

export interface AuthError {
  ok: boolean;
  msg: string;
}

export interface UserFormValues {
  name: string;
  email: string;
  password?: string;
}

