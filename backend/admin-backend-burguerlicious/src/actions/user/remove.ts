import { Request, Response } from "express";
import { remove, detail } from "../../services/user";

export default async (request: Request, response: Response) => {
  const { user_id } = request.params;

  if (!(await detail(user_id))) {
    return response.status(404).json({
      code: 404,
      message: "User not found",
    });
  }

  await remove(user_id);
  return response.json("User removed.");
};
