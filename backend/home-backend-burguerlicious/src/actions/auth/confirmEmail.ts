import { Request, Response } from "express";
import { confirmAccount } from "../../services/auth";

export default async (request: Request, response: Response) => {
  const { user_id } = request.params;

  try {
    await confirmAccount(user_id);
    return response.json("Account activate.");
  } catch (error: any) {
    return response.status(401).json({ error: error.message });
  }
};
