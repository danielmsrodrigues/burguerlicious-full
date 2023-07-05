import { Request, Response } from "express";
import { remove } from "../../services/menuItem";

export default async (request: Request, response: Response) => {
  const { menuItem_id } = request.params;

  await remove(menuItem_id);
  return response.json("Menu item removed.");
};
