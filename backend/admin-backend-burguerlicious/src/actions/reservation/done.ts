import { Request, Response } from "express";
import { done } from "../../services/reservation";

export default async (_: Request, response: Response) => {
  response.json(await done());
};
