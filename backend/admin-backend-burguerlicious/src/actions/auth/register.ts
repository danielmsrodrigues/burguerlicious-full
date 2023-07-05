import { Request, Response } from "express";
import { register } from "../../services/auth";

export default async (request: Request, response: Response) => {
  try {
    const { user_email, user_password, permission_id } = request.body;

    const token = await register(user_email, user_password, permission_id);

    return response.json({ token });
  } catch (e: any) {
    return response.status(400).json({
      code: 400,
      error: "Bad Request.",
      message: e.message,
    });
  }
};
