import { Request, Response } from "express";
import { remove } from "../../services/reservation";

export default async (request: Request, response: Response) => {
  const { reservation_id } = request.params;
  const user_id = request.user.user_id;

  try {
    await remove(reservation_id, user_id);
    return response.json("Reservation canceled.");
  } catch (error: any) {
    return response.status(401).json({ error: error.message });
  }
};
