import { MenuItem, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const add = async (
  menu_id: string,
  menuItem_name: string,
  menuItem_price: number,
  menuItem_description?: string
) => {
  const lowerCaseName = menuItem_name.toLowerCase();

  const existingMenuItem = await prisma.menuItem.findFirst({
    where: {
      menuItem_name: {
        equals: lowerCaseName,
      },
      deleted: false,
    },
  });

  if (existingMenuItem) {
    throw new Error(`Menu item ${lowerCaseName} already exists.`);
  }

  const newMenuItem = await prisma.menuItem.create({
    data: {
      menu_id,
      menuItem_name: lowerCaseName,
      menuItem_price,
      menuItem_description,
    },
    include: {
      menu: {
        select: {
          menu_name: true,
        },
      },
    },
  });

  return newMenuItem;
};

const all = () =>
  prisma.menuItem.findMany({
    where: {
      deleted: false,
    },
    include: {
      menu: {
        select: {
          menu_name: true,
        },
      },
    },
  });

const detail = (menuItem_id: string) =>
  prisma.menuItem.findFirst({
    where: {
      menuItem_id,
      deleted: false,
    },
    include: {
      menu: true,
    },
  });

const remove = (menuItem_id: string) =>
  prisma.menuItem.update({
    where: {
      menuItem_id,
    },
    data: {
      deleted: true,
    },
  });

export { add, all, detail, remove };
