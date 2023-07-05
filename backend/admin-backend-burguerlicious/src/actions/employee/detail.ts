import { Request, Response } from "express";
import { detail } from "../../services/employee";

export default async (request: Request, response: Response) => {
  const { employee_id } = request.params;

  const employee = await detail(employee_id);

  if (!employee) {
    return response.status(404).json({
      code: 404,
      message: "Employee not found.",
    });
  }

  return response.json(employee);
};
