import { Costumer, Employee, Permission, User } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      user: User;
      costumer: Costumer;
      employee: Employee;
      permission: Permission;
    }
  }
}
