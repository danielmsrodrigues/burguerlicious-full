import { Request, Response } from "express";
import { add } from "../../services/restaurantTable";

export default async (request: Request, response: Response) => {
  const { restaurantTable_number } = request.body;

  try {
    const newRestaurantTable = await add(restaurantTable_number);
    return response.json(newRestaurantTable);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
};
