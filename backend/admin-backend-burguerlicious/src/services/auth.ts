import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export async function register(
  user_email: string,
  user_password: string,
  permission_id: string = ""
) {
  const user = await prisma.user.create({
    data: {
      user_email,
      user_password: await bcrypt.hash(user_password, 8),
      permission_id,
    },
  });

  return createToken(user);
}

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
  });

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
