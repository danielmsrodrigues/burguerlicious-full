import { Request, Response } from "express";
import { detail } from "../../services/costumer";

export default async (request: Request, response: Response) => {
  const { costumer_id } = request.params;

  const costumer = await detail(costumer_id);

  if (!costumer) {
    return response.status(404).json({
      code: 404,
      message: "Costumer not found.",
    });
  }

  return response.json(costumer);
};
