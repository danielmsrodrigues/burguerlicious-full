import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const add = async (menu_name: string) => {
  const lowerCaseName = menu_name.toLowerCase();

  const existingMenu = await prisma.menu.findFirst({
    where: {
      menu_name: {
        equals: lowerCaseName,
      },
      deleted: false,
    },
  });

  if (existingMenu) {
    throw new Error(`Menu ${lowerCaseName} already exists.`);
  }

  const newMenu = await prisma.menu.create({
    data: {
      menu_name: lowerCaseName,
    },
  });

  return newMenu;
};

const all = () =>
  prisma.menu.findMany({
    where: {
      deleted: false,
    },
    include: {
      menuItem: {
        where: {
          deleted: false,
        },
        select: {
          menuItem_id: true,
          menuItem_name: true,
          menuItem_price: true,
          menuItem_description: true,
        },
      },
    },
  });

const detail = (menu_id: string) =>
  prisma.menu.findFirst({
    where: {
      menu_id,
      deleted: false,
    },
    include: {
      menuItem: true,
    },
  });

const update = async (menu_id: string, menu_name: string) => {
  const lowerCaseName = menu_name.toLowerCase();

  const existingMenu = await prisma.menu.findFirst({
    where: {
      menu_name: {
        equals: lowerCaseName,
      },
      deleted: false,
    },
  });

  if (existingMenu) {
    throw new Error(`Menu ${lowerCaseName} already exists.`);
  }

  const updateMenu = await prisma.menu.update({
    where: {
      menu_id,
    },
    data: {
      menu_name: lowerCaseName,
    },
  });

  return updateMenu;
};

const remove = (menu_id: string) =>
  prisma.menu.update({
    where: {
      menu_id,
    },
    data: {
      deleted: true,
    },
  });

export { add, all, detail, update, remove };
