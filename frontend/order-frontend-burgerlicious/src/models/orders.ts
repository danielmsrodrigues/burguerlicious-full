import { Reservation } from "./reservation";
import { User } from "./user";

export type Orders = {
  order_id: string;
  createdAt: Date;
  updatedAt: Date;
  order_notes?: string;
  order_running: boolean;
  order_itemQuantity: number;
  reservation: Reservation;
  menuItem: MenuItem;
  user_id: User;
};

export type MenuItem = {
  menuItem_id: string;
  menuItem_name: string;
  menuItem_price: number;
  menuItem_description?: string;
  menu_id: Menu;
};

type Menu = {
  menu_id: string;
  menu_name: string;
};
