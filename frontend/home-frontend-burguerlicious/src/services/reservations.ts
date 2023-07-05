import { Reservation } from "../models/reservation";
import { api } from "./";

export async function getReservations(): Promise<Reservation[]> {
  return api
    .get("/reservation")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function removeReservation(reservation_id: string): Promise<void> {
  return api
    .delete(`/reservation/${reservation_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}

export const createReservation = async (
  reservation_date: string,
  reservation_hour: string,
  reservation_numPeople: number
): Promise<Reservation> => {
  const reservationData = {
    reservation_date,
    reservation_hour,
    reservation_numPeople,
  };

  try {
    const response = await api.post("/reservation", reservationData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data;
      throw new Error(errorMessage);
    } else {
      throw new Error("An error occurred.");
    }
  }
};
