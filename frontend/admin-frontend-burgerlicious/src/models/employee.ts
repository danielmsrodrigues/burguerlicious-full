import { User } from "./user";

export type Employee = {
  employee_id: string;
  employee_salary: number;
  user?: User;
};
