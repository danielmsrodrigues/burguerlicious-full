import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const all = () =>
  prisma.costumer.findMany({
    where: {
      deleted: false,
    },
    include: {
      user: {
        select: {
          user_id: true,
          user_email: true,
          user_password: true,
          permission: {
            select: {
              permission_name: true,
            },
          },
          profile: true,
          reservation: true,
        },
      },
    },
  });

const detail = (costumer_id: string) =>
  prisma.costumer.findFirst({
    where: {
      costumer_id,
      deleted: false,
    },
    include: {
      user: {
        select: {
          user_id: true,
          user_email: true,
          user_password: true,
          permission: {
            select: {
              permission_name: true,
            },
          },
          profile: true,
          reservation: true,
        },
      },
    },
  });

const remove = (costumer_id: string) =>
  prisma.costumer.update({
    where: {
      costumer_id,
    },
    data: {
      deleted: true,
    },
  });

export { all, detail, remove };
