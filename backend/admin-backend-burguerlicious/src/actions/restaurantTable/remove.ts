import { Request, Response } from "express";
import { remove } from "../../services/restaurantTable";

export default async (request: Request, response: Response) => {
  const { restaurantTable_id } = request.params;

  await remove(restaurantTable_id);
  return response.json(`Restaurant table removed.`);
};
