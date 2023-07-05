import { User } from "../models/user";
import { api } from "./";

type AuthResponse = {
  token: string;
};

export type RegisterData = {
  user_email: string;
  user_password: string;
  permission_id?: string;
  profile_firstName: string;
  profile_lastName: string;
  profile_phone: number;
  profile_address?: string;
  profile_birthday?: Date;
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

export async function confirmAccount(user_id: string): Promise<void> {
  return api
    .put(`/auth/confirm/${user_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}
