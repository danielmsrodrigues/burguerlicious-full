import { Request, Response } from "express";
import { update } from "../../services/menu";

export default async (request: Request, response: Response) => {
  const { menu_id } = request.params;
  const { menu_name } = request.body;

  try {
    const menu = await update(menu_id, menu_name);
    return response.json(menu);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
};
