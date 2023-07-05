import { Reservation } from "./reservation";

export type Bill = {
  bill_id: string;
  bill_total: number;
  bill_nif?: number;
  reservation_id: Reservation;
};
