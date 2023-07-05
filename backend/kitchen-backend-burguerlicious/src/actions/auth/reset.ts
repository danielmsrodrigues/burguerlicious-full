import { Request, Response } from "express";
import { passwordReset } from "../../services/auth";

export default async (request: Request, response: Response) => {
  const userId = request.user.user_id;
  const { user_password } = request.body;

  try {
    const user = await passwordReset(userId, user_password);
    return response.json(user);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
};
