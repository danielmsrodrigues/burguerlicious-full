import { api } from ".";
import { Employee } from "../models/employee";

export async function getEmployees() {
  return api
    .get("/employee")
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export const createEmployee = async (
  employee_salary: number,
  permission_id: string,
  user_email: string,
  user_password: string,
  profile_firstName: string,
  profile_lastName: string,
  profile_phone: number,
  profile_address?: string,
  profile_birthday?: string
): Promise<Employee> => {
  const employeeData = {
    employee_salary,
    permission_id,
    user_email,
    user_password,
    profile_firstName,
    profile_lastName,
    profile_phone,
    profile_address,
    profile_birthday,
  };

  try {
    const response = await api.post("/employee", employeeData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      const errorMessage = error.response.data;
      throw new Error(errorMessage);
    } else {
      throw new Error("An error ocurred.");
    }
  }
};

export async function getEmployeeDetails(employee_id: string) {
  return api
    .get(`/employee/${employee_id}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error.message);
    });
}

export async function removeEmployee(employee_id: string): Promise<void> {
  return api
    .delete(`/employee/${employee_id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}

export async function updateEmployee(
  employee_id: string,
  employee_salary: number
): Promise<void> {
  return api
    .put(`/employee/${employee_id}`, { employee_salary })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      throw Error(error.message);
    });
}
