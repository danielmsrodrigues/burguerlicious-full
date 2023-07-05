import { PrismaClient, User } from "@prisma/client";

export const prisma = new PrismaClient();

const all = () =>
  prisma.user.findMany({
    where: {
      deleted: false,
    },
    include: {
      profile: {
        select: {
          profile_firstName: true,
          profile_lastName: true,
          profile_address: true,
          profile_birthday: true,
        },
      },
      costumer: {
        select: {
          costumer_id: true,
        },
      },
      employee: {
        select: {
          employee_id: true,
        },
      },
      reservation: {},
      permission: true,
    },
  });

const detail = (user_id: string) =>
  prisma.user.findFirst({
    where: {
      user_id,
      deleted: false,
    },
    include: {
      profile: true,
      permission: true,
      costumer: {
        select: {
          costumer_id: true,
        },
      },
      employee: {
        select: {
          employee_id: true,
        },
      },
      reservation: {},
    },
  });

const update = (user_id: string, user: User) =>
  prisma.user.update({
    where: {
      user_id,
    },
    data: user,
    include: {
      permission: {
        select: {
          permission_name: true,
        },
      },
    },
  });

const remove = (user_id: string) =>
  prisma.user.update({
    where: {
      user_id,
    },
    data: {
      deleted: true,
    },
  });

export { all, detail, update, remove };
