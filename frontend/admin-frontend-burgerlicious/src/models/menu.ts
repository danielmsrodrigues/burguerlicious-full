export type Menu = {
  menu_id: string;
  menu_name: string;
  menuItem: MenuItem[];
};

export type MenuItem = {
  menu_id: string;
  menuItem_id: string;
  menuItem_name: string;
  menuItem_price: number;
  menuItem_description?: string;
  menu: Menu;
};
