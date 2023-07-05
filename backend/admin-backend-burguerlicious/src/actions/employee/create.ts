import { Request, Response } from "express";
import { add } from "../../services/employee";

export default async (request: Request, response: Response) => {
  try {
    const {
      employee_salary,
      permission_id,
      user_email,
      user_password,
      profile_firstName,
      profile_lastName,
      profile_phone,
      profile_address,
      profile_birthday,
    } = request.body;

    const newEmployee = await add(
      employee_salary,
      permission_id,
      user_email,
      user_password,
      profile_firstName,
      profile_lastName,
      profile_phone,
      profile_address,
      profile_birthday
    );

    return response.json(newEmployee);
  } catch (e: any) {
    return response.status(400).json({
      code: 400,
      error: "Bad Request.",
      message: e.message,
    });
  }
};
