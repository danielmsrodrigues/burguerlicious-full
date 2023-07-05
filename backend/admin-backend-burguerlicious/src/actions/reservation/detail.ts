import { Request, Response } from "express";
import { detail } from "../../services/reservation";

export default async (request: Request, response: Response) => {
  const { reservation_id } = request.params;

  const reservation = await detail(reservation_id);

  if (!reservation) {
    return response.status(404).json({
      code: 404,
      message: "Reservation not found",
    });
  }

  return response.json(reservation);
};
