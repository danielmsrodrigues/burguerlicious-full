import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function attemptLogin(user_email: string, user_password: string) {
  const user = await prisma.user.findFirst({
    where: {
      user_email,
      deleted: false,
    },
  });

  const match =
    user && (await bcrypt.compare(user_password, user.user_password));

  if (!user || !match) {
    throw new Error("Bad Credentials.");
  }

  return createToken(user);
}

export const findById = async (user_id: string) =>
  prisma.user.findUnique({
    where: { user_id },
    include: {
      profile: true,
      employee: {
        select: {
          employee_salary: true,
        },
      },
    },
  });

export async function passwordReset(user_id: string, user_password: string) {
  return prisma.user.update({
    where: { user_id },
    data: { user_password: await bcrypt.hash(user_password, 8) },
  });
}

function createToken(user: User): string {
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 180,
      email: user.user_email,
      user_id: user.user_id,
      permission_id: user.permission_id,
    },
    "VerySecretKeyToSignMyLogin"
  );

  return token;
}
