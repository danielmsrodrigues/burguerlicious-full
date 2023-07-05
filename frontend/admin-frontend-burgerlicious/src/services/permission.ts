import { api } from ".";
import { Permission } from "../models/permission";

export async function getPermissions(): Promise<Permission[]> {
  return api
    .get("/permission")
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function createPermission(
  permission_name: string
): Promise<Permission> {
  try {
    const response = await api.post("/permission", {
      permission_name,
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function removePermission(permission_id: string): Promise<void> {
  return api
    .delete(`/permission/${permission_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}
