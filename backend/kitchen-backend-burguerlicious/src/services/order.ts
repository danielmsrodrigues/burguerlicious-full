import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const all = () =>
  prisma.orders.findMany({
    where: {
      deleted: false,
      order_running: true,
    },
    include: {
      menuItem: {
        select: {
          menuItem_name: true,
        },
      },
    },
  });

const detail = (order_id: string) =>
  prisma.orders.findFirst({
    where: {
      order_id,
      deleted: false,
    },
    include: {
      menuItem: {
        select: {
          menuItem_name: true,
        },
      },
    },
  });

const update = (order_id: string) =>
  prisma.orders.update({
    where: {
      order_id,
    },
    data: {
      order_running: false,
    },
  });

export { all, detail, update };
