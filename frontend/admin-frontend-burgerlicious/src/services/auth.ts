import { User } from "../models/user";
import { api } from "./";

type AuthResponse = {
  token: string;
};

export type RegisterData = {
  user_email: string;
  user_password: string;
};

export async function login(
  user_email: string,
  user_password: string
): Promise<AuthResponse> {
  return api
    .post("/auth/login", { user_email, user_password })
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export async function register(data: RegisterData): Promise<AuthResponse> {
  return api
    .post("/auth/register", data)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export async function profile(): Promise<User> {
  return api
    .get("/auth/profile")
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}
