import { api } from ".";
import { Reservation } from "../models/reservation";

export async function getReservation(): Promise<Reservation[]> {
  return api
    .get("/reservation")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}
export async function getDoneReservation(): Promise<Reservation[]> {
  return api
    .get("/reservation/done")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function updateReservation(
  reservation_id: string,
  reservation_numPeople: number
): Promise<void> {
  return api
    .put(`/reservation/${reservation_id}`, { reservation_numPeople })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function getReservationDetails(reservation_id: string) {
  return api
    .get(`/reservation/${reservation_id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
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
