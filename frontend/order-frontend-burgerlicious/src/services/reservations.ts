import { api } from ".";
import { Reservation } from "../models/reservation";

export async function getReservations(): Promise<Reservation[]> {
  return api
    .get("/reservation")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function getReservationDetails(
  reservation_id: string
): Promise<Reservation> {
  return api
    .get(`/reservation/${reservation_id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}
