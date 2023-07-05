import { api } from ".";
import { Bill } from "../models/bill";

export const createBill = async (
  bill_nif: number,
  reservation_id: string
): Promise<Bill> => {
  const orderData = {
    bill_nif,
    reservation_id,
  };

  try {
    const response = await api.post("/bill", orderData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data;
      throw new Error(errorMessage);
    } else {
      throw new Error("An error ocurred.");
    }
  }
};
