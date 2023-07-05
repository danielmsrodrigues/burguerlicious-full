import { PrismaClient } from "@prisma/client";
import { sendEmail } from "../email";

const prisma = new PrismaClient();

const add = async (reservation_id: string, bill_nif: number) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      reservation_id: reservation_id,
    },
    include: {
      order: {
        include: {
          menuItem: true,
        },
        where: {
          deleted: false,
        },
      },
    },
  });

  if (!reservation) {
    throw new Error("Reservation not found");
  }

  const validOrders = reservation.order.filter(
    (order) => !order.deleted && order.order_itemQuantity > 0
  );

  if (validOrders.length === 0) {
    throw new Error("Reservation does not have any valid orders");
  }

  let totalPrice = 0;

  for (const order of validOrders) {
    totalPrice += order.menuItem.menuItem_price * order.order_itemQuantity;
  }

  const newBill = await prisma.bill.create({
    data: {
      bill_total: totalPrice,
      bill_nif: bill_nif,
      reservation: {
        connect: {
          reservation_id: reservation_id,
        },
      },
    },
  });

  const updatedReservation = await prisma.reservation.update({
    where: {
      reservation_id: reservation_id,
    },
    data: {
      deleted: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      user_id: reservation.user_id,
    },
  });

  if (!user) {
    return { error: "User not found." };
  }

  const orderedItems = validOrders.map((order) => {
    const menuItemTotal =
      order.menuItem.menuItem_price * order.order_itemQuantity;
    return `- ${order.order_itemQuantity}X | ${order.menuItem.menuItem_name} | ${menuItemTotal}€`;
  });
  const orderedItemsText = orderedItems.join("\n");

  const billSubject = "Bill";
  const billContent = `Thank you for choosing our service and dining with us. We sincerely appreciate your visit and trust in us to provide you with a memorable experience. We have prepared a summary of your bill for your reference.

Summary of Items:
${orderedItemsText}

Total Amount: ${newBill.bill_total}€

Should you have any questions or require further assistance regarding your bill, please feel free to contact our team at burguerlicious@gmail.com. We are here to help!

We greatly value your satisfaction and hope that you had a wonderful dining experience with us. We look forward to serving you again in the future. Stay tuned for upcoming promotions and events that might pique your interest.

Thank you again for choosing our service. We appreciate your support and look forward to welcoming you back soon!

Best regards,

Burgerlicious
`;
  sendEmail(user.user_email, billSubject, billContent);

  return newBill;
};

export { add };
