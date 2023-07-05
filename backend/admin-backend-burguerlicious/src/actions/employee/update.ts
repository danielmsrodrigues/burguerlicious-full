import { Request, Response } from "express";
import { update, detail } from "../../services/employee";

export default async (request: Request, response: Response) => {
  const { employee_id } = request.params;

  if (!(await detail(employee_id))) {
    return response.status(404).json({
      code: 404,
      message: "Employee not found.",
    });
  }

  const employee = await update(employee_id, request.body);

  return response.json(employee);
};
