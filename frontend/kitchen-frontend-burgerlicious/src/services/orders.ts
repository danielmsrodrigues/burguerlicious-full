import { Orders } from "../models/orders";
import { api } from "./";

export async function getOrders(): Promise<Orders[]> {
  return api
    .get("/order")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function updateOrder(order_id: string): Promise<void> {
  return api
    .put(`/order/${order_id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.message);
    });
}
