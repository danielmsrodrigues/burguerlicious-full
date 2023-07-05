import { Request, Response } from "express";
import { remove, detail } from "../../services/employee";

export default async (request: Request, response: Response) => {
  const { employee_id } = request.params;

  if (!(await detail(employee_id))) {
    return response.sendStatus(404).json({
      code: 404,
      message: "Employee not found.",
    });
  }

  await remove(employee_id);
  return response.json("Employee removed.");
};
