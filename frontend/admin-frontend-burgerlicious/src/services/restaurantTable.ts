import { RestaurantTable } from "../models/restaurantTable";
import { api } from "./";

export async function getTables(): Promise<RestaurantTable[]> {
  return api
    .get("/restaurantTable")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function createTable(
  restaurantTable_number: number
): Promise<RestaurantTable> {
  try {
    const response = await api.post("/restaurantTable", {
      restaurantTable_number: restaurantTable_number,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function removeTable(restaurantTable_id: string): Promise<void> {
  return api
    .delete(`/restaurantTable/${restaurantTable_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}
