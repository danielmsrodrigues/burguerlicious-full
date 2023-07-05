import { api } from ".";
import { Bill } from "../models/bill";

export async function getBill(): Promise<Bill[]> {
  return api
    .get("/bill")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function getBillDetails(bill_id: string) {
  return api
    .get(`/bill/${bill_id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}
