import { Permission, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const add = async (
  permission_name: string,
  permission_description?: string
) => {
  const lowerCaseName = permission_name.toLowerCase();

  const existingPermission = await prisma.permission.findFirst({
    where: {
      permission_name: {
        equals: lowerCaseName,
      },
      deleted: false,
    },
  });

  if (existingPermission) {
    throw new Error(`Permission ${permission_name} already exists.`);
  }

  const newPermission = await prisma.permission.create({
    data: {
      permission_name: lowerCaseName,
      permission_description,
    },
  });

  return newPermission;
};

const all = () =>
  prisma.permission.findMany({
    where: {
      deleted: false,
    },
  });

const remove = (permission_id: string) =>
  prisma.permission.update({
    where: {
      permission_id,
    },
    data: {
      deleted: true,
    },
  });

export { add, all, remove };
