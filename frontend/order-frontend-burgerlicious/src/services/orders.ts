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

export const createOrder = async (
  reservation_id: string,
  menuItem_id: string,
  order_itemQuantity: number,
  order_notes: string
): Promise<Orders> => {
  const orderData = {
    reservation_id,
    menuItem_id,
    order_itemQuantity,
    order_notes,
  };

  try {
    const response = await api.post("/order", orderData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data;
      throw new Error(errorMessage);
    } else {
      throw new Error("An error ocurred.");
    }
  }
};

export async function removeOrder(order_id: string): Promise<void> {
  return api
    .delete(`/order/${order_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}
