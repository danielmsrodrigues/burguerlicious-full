import { api } from "./";
import { MenuItem } from "../models/orders";

export async function getMenu(): Promise<MenuItem[]> {
  return api
    .get("/menu")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}
