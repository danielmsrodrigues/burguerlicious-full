import { Request, Response } from "express";
import { detail } from "../../services/menu";

export default async (request: Request, response: Response) => {
  const { menu_id } = request.params;

  const menu = await detail(menu_id);

  if (!menu) {
    return response.status(404).json({
      code: 404,
      message: "Menu not found.",
    });
  }

  return response.json(menu);
};
