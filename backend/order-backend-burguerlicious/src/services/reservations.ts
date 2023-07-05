import { PrismaClient } from "@prisma/client";
import moment from "moment";

const prisma = new PrismaClient();

const all = async () => {
  const todayStart = moment().utc().startOf("day");
  const todayEnd = moment(todayStart).add(1, "day");

  const reservation = await prisma.reservation.findMany({
    where: {
      deleted: false,
      reservation_date: {
        gte: todayStart.toDate(),
        lt: todayEnd.toDate(),
      },
      reservation_hour: {
        gte: todayStart.toDate(),
        lt: todayEnd.toDate(),
      },
    },
    include: {
      user: {
        select: {
          profile: {
            select: {
              profile_firstName: true,
              profile_lastName: true,
            },
          },
        },
      },
      restaurantTable: {
        select: {
          restaurantTable_number: true,
        },
      },
      order: true,
    },
  });
  return reservation;
};

const detail = (reservation_id: string) =>
  prisma.reservation.findFirst({
    where: {
      reservation_id,
      deleted: false,
    },
    include: {
      bill: {
        select: {
          bill_total: true,
        },
      },
      order: {
        select: {
          order_itemQuantity: true,

          menuItem: {
            select: {
              menuItem_name: true,
              menuItem_price: true,
            },
          },
        },
      },
    },
  });

export { all, detail };
