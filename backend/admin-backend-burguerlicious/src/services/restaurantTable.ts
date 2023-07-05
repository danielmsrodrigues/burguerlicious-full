import { PrismaClient, RestaurantTable } from "@prisma/client";

const prisma = new PrismaClient();

const add = async (restaurantTable_number: number) => {
  const restaurantTable = await prisma.restaurantTable.findFirst({
    where: {
      restaurantTable_number,
    },
  });

  if (!restaurantTable) {
    const newRestaurantTable = await prisma.restaurantTable.create({
      data: {
        restaurantTable_number,
      },
    });

    return newRestaurantTable;
  } else {
    throw new Error(`Table number ${restaurantTable_number} already exists.`);
  }
};

const all = () =>
  prisma.restaurantTable.findMany({
    where: {
      deleted: false,
    },
  });

const remove = (restaurantTable_id: string) =>
  prisma.restaurantTable.update({
    where: {
      restaurantTable_id,
    },
    data: {
      deleted: true,
    },
  });

export { add, all, remove };
