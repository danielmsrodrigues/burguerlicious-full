import { PrismaClient, Reservation } from "@prisma/client";

const prisma = new PrismaClient();

const all = () =>
  prisma.reservation.findMany({
    where: {
      deleted: false,
    },
    include: {
      restaurantTable: true,
      user: {
        include: {
          profile: true,
        },
      },
    },
  });

const done = () =>
  prisma.reservation.findMany({
    where: {
      deleted: true,
    },
    include: {
      restaurantTable: true,
      bill: true,
      order: true,
      user: {
        include: {
          profile: true,
        },
      },
    },
  });

const detail = (reservation_id: string) =>
  prisma.reservation.findFirst({
    where: {
      reservation_id,
      deleted: false,
    },
    include: {
      restaurantTable: true,
      user: {
        include: {
          profile: true,
        },
      },
    },
  });

const update = async (
  reservation_id: string,
  reservation_date: string,
  reservation_hour: string,
  reservation_numPeople: number
) => {
  const currentDate = new Date();

  if (new Date(reservation_date) < currentDate) {
    return { error: "Cannot book a reservation in the past." };
  }

  const reservations = await prisma.reservation.findMany({
    where: {
      reservation_date: reservation_date,
      reservation_hour: reservation_hour,
      deleted: false,
    },
  });

  if (reservations.length < 4) {
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
      return { error: "No available tables for this time slot." };
    }

    const randomIndex = Math.floor(Math.random() * availableTables.length);
    const randomTable = availableTables[randomIndex];

    const updateReservation = await prisma.reservation.update({
      where: {
        reservation_id,
      },
      data: {
        reservation_date,
        reservation_hour,
        reservation_numPeople,
        restaurantTable: {
          connect: {
            restaurantTable_id: randomTable.restaurantTable_id,
          },
        },
      },

      include: {
        restaurantTable: {
          select: {
            restaurantTable_id: true,
            restaurantTable_number: true,
          },
        },
      },
    });
    return updateReservation;
  } else {
    return { error: "This time slot is fully booked." };
  }
};

const remove = (reservation_id: string) =>
  prisma.reservation.update({
    where: {
      reservation_id,
    },
    data: {
      deleted: true,
    },
  });

export { all, done, detail, update, remove };
