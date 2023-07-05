import { Request, Response } from "express";
import { detail } from "../../services/bill";

export default async (request: Request, response: Response) => {
  const { bill_id } = request.params;

  const bill = await detail(bill_id);

  if (!bill) {
    return response.status(404).json({
      code: 404,
      message: "Bill not found.",
    });
  }

  return response.json(bill);
};
