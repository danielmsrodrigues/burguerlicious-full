import { User } from "../models/user";
import { api } from "./";

type AuthResponse = {
  token: string;
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

export async function profile(): Promise<User> {
  return api
    .get("/auth/profile")
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export async function updatePassword(user_password: string): Promise<void> {
  return api
    .put(`/auth/reset`, { user_password })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}
