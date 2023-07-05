import { Request, Response } from "express";
import { update, detail } from "../../services/user";

export default async (request: Request, response: Response) => {
  const { user_id } = request.params;

  if (!(await detail(user_id))) {
    return response.status(404).json({
      code: 404,
      message: "User not found",
    });
  }

  const user = await update(user_id, request.body);

  return response.json(user);
};
