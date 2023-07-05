import { Request, Response } from "express";
import { remove, detail } from "../../services/costumer";

export default async (request: Request, response: Response) => {
  const { costumer_id } = request.params;

  if (!(await detail(costumer_id))) {
    return response.status(404).json({
      code: 404,
      message: "Costumer not found",
    });
  }

  await remove(costumer_id);
  return response.json("Costumer removed.");
};
