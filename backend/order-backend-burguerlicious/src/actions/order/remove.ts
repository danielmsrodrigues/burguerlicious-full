import { Request, Response } from "express";
import { remove } from "../../services/order";

export default async (request: Request, response: Response) => {
  const { order_id } = request.params;

  await remove(order_id);
  return response.json("Order removed.");
};
