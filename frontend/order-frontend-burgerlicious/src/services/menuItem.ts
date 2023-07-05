import { api } from "./";
import { MenuItem } from "../models/orders";

export async function getMenuItem(): Promise<MenuItem[]> {
  return api
    .get("/menuItem")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}
