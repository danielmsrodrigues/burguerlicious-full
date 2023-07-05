import { Request, Response } from "express";
import { detail } from "../../services/user";

export default async (request: Request, response: Response) => {
  const { user_id } = request.params;

  const user = await detail(user_id);

  if (!user) {
    return response.status(404).json({
      code: 404,
      message: "User not found",
    });
  }

  return response.json(user);
};
