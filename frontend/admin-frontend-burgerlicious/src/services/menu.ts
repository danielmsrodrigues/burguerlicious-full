import { api } from "./";
import { Menu } from "../models/menu";

export async function getMenu(): Promise<Menu[]> {
  return api
    .get("/menu")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function createMenu(menu_name: string): Promise<Menu> {
  try {
    const response = await api.post("/menu", { menu_name });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getMenuDetails(menu_id: string) {
  return api
    .get(`/menu/${menu_id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export async function removeMenu(menu_id: string): Promise<void> {
  return api
    .delete(`/menu/${menu_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function updateMenuName(
  menu_id: string,
  menu_name: string
): Promise<void> {
  return api
    .put(`/menu/${menu_id}`, { menu_name })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}
