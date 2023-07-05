import { Request, Response } from "express";
import { add } from "../../services/reservation";

export default async (request: Request, response: Response) => {
  const { reservation_date, reservation_hour, reservation_numPeople } =
    request.body;
  try {
    const newReservation = await add(
      request.user.user_id,
      reservation_date,
      reservation_hour,
      reservation_numPeople
    );

    return response.json(newReservation);
  } catch (error: any) {
    return response.status(400).json(error.message);
  }
};
