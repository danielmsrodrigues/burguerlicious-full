import { Request, Response } from "express";
import { all } from "../../services/reservations";

export default async (request: Request, response: Response) => {
  response.json(await all());
};
