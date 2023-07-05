import { Request, Response } from "express";
import { update, detail } from "../../services/reservation";

export default async (req: Request, res: Response) => {
  const { reservation_id } = req.params;
  const { reservation_date, reservation_hour, reservation_numPeople } =
    req.body;

  if (!(await detail(reservation_id))) {
    return res.status(404).json({
      code: 404,
      message: "Reservation not found.",
    });
  }

  const reservation = await update(
    reservation_id,
    reservation_date,
    reservation_hour,
    reservation_numPeople
  );

  return res.json(reservation);
};
