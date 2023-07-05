import { Request, Response } from "express";
import { add } from "../../services/permission";

export default async (request: Request, response: Response) => {
  const { permission_name, permission_description } = request.body;

  try {
    const newPermission = await add(permission_name, permission_description);

    return response.json(newPermission);
  } catch (error: any) {
    return response.status(400).json({ error: error.message });
  }
};
