import { Request, Response } from "express";
import { detail } from "../../services/menuItem";

export default async (request: Request, response: Response) => {
  const { menuItem_id } = request.params;

  const menuItem = await detail(menuItem_id);

  if (!menuItem) {
    return response.status(404).json({
      code: 404,
      message: "Menu Item not found.",
    });
  }

  return response.json(menuItem);
};
