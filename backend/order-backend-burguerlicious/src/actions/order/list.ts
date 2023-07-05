import { Request, Response } from "express";
import { all } from "../../services/order";

export default async (request: Request, response: Response) => {
  response.json(await all(request.user.user_id));
};
