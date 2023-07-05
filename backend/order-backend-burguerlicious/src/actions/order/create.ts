import { Request, Response } from "express";
import { add } from "../../services/order";

export default async (request: Request, response: Response) => {
  const {
    reservation_id,
    menuItem_id,
    order_itemQuantity,
    order_running,
    order_notes,
  } = request.body;

  try {
    const newOrder = await add(
      request.user.user_id,
      reservation_id,
      menuItem_id,
      order_itemQuantity,
      order_running,
      order_notes
    );
    return response.json(newOrder);
  } catch (error: any) {
    return response.status(400).json(error.message);
  }
};
