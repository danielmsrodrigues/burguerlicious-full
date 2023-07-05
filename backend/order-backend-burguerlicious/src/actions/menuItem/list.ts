import { Request, Response } from "express";
import { all } from "../../services/menuItem";

export default async (request: Request, response: Response) => {
  response.json(await all());
};
