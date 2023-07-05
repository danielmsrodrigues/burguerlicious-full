import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { sendConfirmationEmail } from "../email";

const prisma = new PrismaClient();

export async function register(
  user_email: string,
  user_password: string,
  permission_id: string = "",
  profile_firstName: string,
  profile_lastName: string,
  profile_phone: number,
  profile_address?: string,
  profile_birthday?: string
) {
  const user = await prisma.user.create({
    data: {
      user_email,
      user_password: await bcrypt.hash(user_password, 8),
      permission_id,
      profile: {
        create: {
          profile_firstName,
          profile_lastName,
          profile_phone,
          profile_address,
          profile_birthday,
        },
      },
      costumer: {
        create: {},
      },
    },
    include: {
      costumer: true,
    },
  });

  const confirmationContent = ` <h1>Account Verification</h1>

  Hello ${profile_firstName},

Thank you for creating an account with us! To complete the registration process, please click on the following link to verify your account:
<br/>
<br/>

<a href="http://localhost:5173/confirm/${user.user_id}">Verify Account</a>
<br/>
<br/>

We're excited to have you as a member of our community. If you have any questions or need further assistance, please don't hesitate to contact our support team.
<br/>
<br/>
Best regards,
<br/>
Burgerlicious

   `;

  sendConfirmationEmail(user.user_email, confirmationContent);
  return createToken(user);
}

export const confirmAccount = async (user_id: string) =>
  prisma.user.update({
    where: {
      user_id,
    },
    data: {
      isVerified: true,
    },
  });

export const findById = async (user_id: string) =>
  prisma.user.findUnique({
    where: { user_id },
    include: { profile: true, costumer: true },
  });

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

  if (!user.isVerified) {
    throw new Error("Please confirm your email to login.");
  }

  return createToken(user);
}

function createToken(user: User): string {
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 180,
      user_email: user.user_email,
      user_id: user.user_id,
    },
    "VerySecretKeyToSignMyLogin"
  );

  return token;
}
