import { Bill } from "./bill";
import { Orders } from "./orders";
import { User } from "./user";

export type Reservation = {
  reservation_id: string;
  createdAt: Date;
  updatedAt: Date;
  reservation_date: Date;
  reservation_hour: Date;
  reservation_numPeople: number;
  user?: User;
  restaurantTable: RestaurantTable;
  order: Orders;
  bill?: Bill;
};

type RestaurantTable = {
  restaurantTable_id: string;
  restaurantTable_number: number;
};
