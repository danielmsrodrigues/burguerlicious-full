import { Request, Response } from "express";
import { remove } from "../../services/menu";

export default async (request: Request, response: Response) => {
  const { menu_id } = request.params;

  await remove(menu_id);
  return response.json("Menu removed.");
};
