import { api } from "./";
import { MenuItem } from "../models/menu";

export async function getMenuItem(): Promise<MenuItem[]> {
  return api
    .get("/menuItem")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function createMenuItem(
  menu_id: string,
  menuItem_name: string,
  menuItem_price: number
): Promise<MenuItem> {
  try {
    const response = await api.post("/menuItem", {
      menu_id,
      menuItem_name,
      menuItem_price,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function removeMenuItem(menuItem_id: string): Promise<void> {
  return api
    .delete(`/menuItem/${menuItem_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function updateMenuItem(
  menuItem_id: string,
  menuItem_price: number
): Promise<void> {
  return api
    .put(`/menu/${menuItem_id}`, { menuItem_price })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function getMenuItemDetails(menuItem_id: string) {
  return api
    .get(`/menuItem/${menuItem_id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}
