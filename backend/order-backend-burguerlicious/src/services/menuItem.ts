import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const all = () =>
  prisma.menuItem.findMany({
    where: {
      deleted: false,
    },
  });

export { all };
