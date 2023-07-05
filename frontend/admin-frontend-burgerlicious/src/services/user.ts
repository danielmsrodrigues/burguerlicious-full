import { api } from ".";

export async function getUsers() {
  return api
    .get("/user")
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export async function getUserDetails(user_id: string) {
  return api
    .get(`/user/${user_id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export async function removeUser(user_id: string): Promise<void> {
  return api
    .delete(`/user/${user_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function updateUser(
  user_id: string,
  permission_id: string
): Promise<void> {
  return api
    .put(`/user/${user_id}`, { permission_id })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}
