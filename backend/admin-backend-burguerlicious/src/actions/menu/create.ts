import { Request, Response } from "express";
import { add } from "../../services/menu";

export default async (request: Request, response: Response) => {
  const { menu_name } = request.body;

  try {
    const newMenu = await add(menu_name);
    return response.json(newMenu);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
};
