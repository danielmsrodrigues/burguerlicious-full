import { Orders, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const add = async (
  user_id: string,
  reservation_id: string,
  menuItem_id: string,
  order_itemQuantity: number,
  order_running: boolean,
  order_notes?: string
) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      reservation_id: reservation_id,
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found.");
  }

  const menuItem = await prisma.menuItem.findUnique({
    where: {
      menuItem_id: menuItem_id,
    },
  });

  if (!menuItem) {
    throw new Error("Menu Item not found.");
  }

  return prisma.orders.create({
    data: {
      user: {
        connect: {
          user_id: user_id,
        },
      },
      reservation: {
        connect: {
          reservation_id: reservation_id,
        },
      },
      menuItem: {
        connect: {
          menuItem_id: menuItem_id,
        },
      },
      order_itemQuantity,
      order_running,
      order_notes,
    },
    include: {
      reservation: {
        include: {
          restaurantTable: {
            select: {
              restaurantTable_number: true,
            },
          },
        },
      },
      menuItem: {
        select: {
          menuItem_name: true,
        },
      },
    },
  });
};

const all = (user_id: string) =>
  prisma.orders.findMany({
    where: {
      reservation: {
        deleted: false,
      },
      user_id,
      deleted: false,
    },
    include: {
      reservation: {
        select: {
          restaurantTable: true,
        },
      },
      menuItem: {
        select: {
          menuItem_name: true,
        },
      },
    },
  });

const remove = (order_id: string) =>
  prisma.orders.update({
    where: {
      order_id,
    },
    data: {
      deleted: true,
    },
  });

export { add, all, remove };
