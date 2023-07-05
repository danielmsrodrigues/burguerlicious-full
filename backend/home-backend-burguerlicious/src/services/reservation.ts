import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../email";
import moment from "moment";

const prisma = new PrismaClient();

const add = async (
  user_id: string,
  reservation_date: string,
  reservation_hour: string,
  reservation_numPeople: number
) => {
  const currentDate = new Date();

  if (new Date(reservation_date) < currentDate) {
    return { error: "Cannot book a reservation in the past." };
  }

  const availableTables = await prisma.restaurantTable.findMany({
    where: {
      deleted: false,
      reservation: {
        none: {
          reservation_date: reservation_date,
          reservation_hour: reservation_hour,
          deleted: false,
        },
      },
    },
  });

  if (availableTables.length === 0) {
    throw new Error("No available tables for this time slot.");
  }

  const randomIndex = Math.floor(Math.random() * availableTables.length);
  const randomTable = availableTables[randomIndex];

  const newReservation = await prisma.reservation.create({
    data: {
      user: {
        connect: {
          user_id: user_id,
        },
      },
      restaurantTable: {
        connect: {
          restaurantTable_id: randomTable.restaurantTable_id,
        },
      },
      reservation_date,
      reservation_hour,
      reservation_numPeople,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      user_id: user_id,
    },
  });

  if (!user) {
    return { error: "User not found." };
  }

  const formattedReservationDate = moment
    .utc(reservation_date)
    .format("DD-MM-YYYY");
  const formattedReservationHour = moment.utc(reservation_hour).format("HH:mm");

  const confirmationSubject = "Reservation Confirmation";
  const confirmationContent = `Thank you for choosing Burguerlicious for your upcoming reservation.

Reservation Details:
  Date: ${formattedReservationDate}
  Time: ${formattedReservationHour}
    
We are excited to confirm your reservation and look forward to serving you a delicious meal.
    
If you have any special requests or need to make changes to your reservation, please feel free to contact us at least 24 hours in advance.

Thank you once again for choosing us. We can't wait to welcome you!

Best regards,

Burguerlicious
  `;
  sendEmail(user.user_email, confirmationSubject, confirmationContent);

  return newReservation;
};

const remove = async (reservation_id: string, user_id: string) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      reservation_id,
    },
    include: {
      user: true,
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found.");
  }

  if (reservation.user?.user_id !== user_id) {
    throw new Error("Unauthorized to remove this reservation.");
  }

  await prisma.reservation.update({
    where: {
      reservation_id,
    },
    data: {
      deleted: true,
    },
  });

  const formattedReservationDate = moment
    .utc(reservation.reservation_date)
    .format("DD-MM-YYYY");
  const formattedReservationHour = moment
    .utc(reservation.reservation_hour)
    .format("HH:mm");

  const cancellationSubject = "Reservation Cancellation";
  const cancellationContent = `We're sorry to hear that you have cancelled your reservation.

Reservation Details:
  Date: ${formattedReservationDate}
  Time: ${formattedReservationHour}

Your reservation for ${formattedReservationDate} at ${formattedReservationHour} has been successfully cancelled. If you have any questions or need further assistance, please don't hesitate to reach out to us.

We hope to have the opportunity to serve you in the future. If you change your mind or would like to make a new reservation, we would be more than happy to accommodate you.

Thank you for considering Burguerlicious, and we look forward to serving you another time.

Best regards,

Burguerlicious
`;
  sendEmail(
    reservation.user.user_email,
    cancellationSubject,
    cancellationContent
  );
};

const all = (user_id: string) =>
  prisma.reservation.findMany({
    where: {
      user_id,
      deleted: false,
      reservation_date: {
        gte: new Date().toISOString(),
      },
    },
  });

export { add, remove, all };
