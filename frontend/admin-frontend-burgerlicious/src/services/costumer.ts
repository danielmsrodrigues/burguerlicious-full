import { api } from ".";

export async function getCostumers() {
  return api
    .get("/costumer")
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export async function getCostumerDetails(costumer_id: string) {
  return api
    .get(`/costumer/${costumer_id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export async function removeCostumer(costumer_id: string): Promise<void> {
  return api
    .delete(`/costumer/${costumer_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}
