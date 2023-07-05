import { Request, Response } from "express";
import { add } from "../../services/bill";

export default async (request: Request, response: Response) => {
  const { reservation_id, bill_nif } = request.body;

  try {
    const bill = await add(reservation_id, bill_nif);
    return response.json(bill);
  } catch (error: any) {
    return response.status(400).json(error.message);
  }
};
