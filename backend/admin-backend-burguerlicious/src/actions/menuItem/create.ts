import { Request, Response } from "express";
import { add } from "../../services/menuItem";

export default async (request: Request, response: Response) => {
  const { menu_id, menuItem_name, menuItem_price, menuItem_description } =
    request.body;

  try {
    const newMenuItem = await add(
      menu_id,
      menuItem_name,
      menuItem_price,
      menuItem_description
    );
    return response.json(newMenuItem);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
};
