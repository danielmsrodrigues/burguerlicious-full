import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const all = () =>
  prisma.bill.findMany({
    where: {
      deleted: false,
    },
  });

const detail = (bill_id: string) =>
  prisma.bill.findFirst({
    where: {
      bill_id,
      deleted: false,
    },
    include: {
      reservation: true,
    },
  });

export { all, detail };
