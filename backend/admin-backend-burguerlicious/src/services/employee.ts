import { Employee, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const prisma = new PrismaClient();

const add = async (
  employee_salary: number,
  permission_id: string,
  user_email: string,
  user_password: string,
  profile_firstName: string,
  profile_lastName: string,
  profile_phone: number,
  profile_address?: string,
  profile_birthday?: string
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      user_email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const newUser = await prisma.user.create({
    data: {
      user_email,
      user_password: await bcrypt.hash(user_password, 8),
      permission: {
        connect: {
          permission_id: permission_id,
        },
      },
      profile: {
        create: {
          profile_firstName,
          profile_lastName,
          profile_phone,
          profile_address,
          profile_birthday,
        },
      },
      employee: {
        create: {
          employee_salary,
        },
      },
    },
    include: {
      profile: {
        select: {
          profile_firstName: true,
          profile_lastName: true,
        },
      },
      employee: {
        select: {
          employee_id: true,
          employee_salary: true,
        },
      },
    },
  });

  return newUser;
};

const all = () =>
  prisma.employee.findMany({
    where: {
      deleted: false,
    },
    include: {
      user: {
        include: {
          profile: true,
          permission: true,
        },
      },
    },
  });

const detail = (employee_id: string) =>
  prisma.employee.findFirst({
    where: {
      employee_id,
      deleted: false,
    },
    include: {
      user: {
        include: {
          profile: true,
          permission: true,
        },
      },
    },
  });

const update = (employee_id: string, employee: Employee) =>
  prisma.employee.update({
    where: {
      employee_id,
    },
    data: employee,
    include: {
      user: {
        select: {
          user_email: true,
        },
      },
    },
  });

const remove = (employee_id: string) =>
  prisma.employee.update({
    where: {
      employee_id,
    },
    data: {
      deleted: true,
    },
  });

export { add, all, detail, update, remove };
