export type Orders = {
  order_id: string;
  createdAt: Date;
  updatedAt: Date;
  order_notes?: string;
  order_running: boolean;
  order_itemQuantity: number;
  reservation_id: string;
  menuItem: MenuItem;
  user_id: string;
};

type MenuItem = {
  menuItem_id: string;
  menuItem_name: string;
};
