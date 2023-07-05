import { Request, Response } from "express";
import { update, detail } from "../../services/order";

export default async (request: Request, response: Response) => {
  const { order_id } = request.params;

  if (!(await detail(order_id))) {
    return response.status(404).json({
      code: 404,
      message: "Order not found.",
    });
  }

  await update(order_id);
  return response.json("Order no longer running.");
};
