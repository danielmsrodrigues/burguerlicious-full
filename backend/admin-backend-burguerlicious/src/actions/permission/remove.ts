import { Request, Response } from "express";
import { remove } from "../../services/permission";

export default async (request: Request, response: Response) => {
  const { permission_id } = request.params;

  await remove(permission_id);
  return response.json("Permission removed.");
};
