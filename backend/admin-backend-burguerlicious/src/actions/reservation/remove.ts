import { Request, Response } from "express";
import { remove, detail } from "../../services/reservation";

export default async (request: Request, response: Response) => {
  const { reservation_id } = request.params;

  if (!(await detail(reservation_id))) {
    return response.status(404).json({
      code: 404,
      message: "Reservation not found",
    });
  }

  await remove(reservation_id);
  return response.json("Reservation removed.");
};
