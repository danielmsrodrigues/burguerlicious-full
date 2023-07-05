import { Request, Response } from "express";
import { detail } from "../../services/order";

export default async (request: Request, response: Response) => {
  const { order_id } = request.params;

  const order = await detail(order_id);

  if (!order) {
    return response.status(404).json({
      code: 404,
      message: "Order not found.",
    });
  }

  return response.json(order);
};
