import { useEffect, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { getPermissions } from "../../services/permission";
import { Permission } from "../../models/permission";
import { Employee } from "../../models/employee";
import {
  createEmployee,
  getEmployeeDetails,
  getEmployees,
  removeEmployee,
  updateEmployee,
} from "../../services/employee";

import Navbar from "../../components/Navbar";
import {
  AllEmployees,
  CancelBtn,
  CreateBtn,
  Input,
  Main,
  Select,
  Table,
  Form,
  CreateHeader,
  TableContainer,
  DetailTableContainer,
  DetailTable,
  DetailInput,
  UpdateBtn,
  Top,
  Menu,
} from "./styles";
import { Container } from "../../styles/styles";

import { AiOutlineMenu } from "react-icons/ai";

function EmployeePage() {
  const { employees, isLoggedIn, dispatch } = useApp();
  const [, setEmployee] = useState<Employee>();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] =
    useState<Employee>();
  const [updatedEmployee, setUpdatedEmployee] = useState<{
    [key: string]: number;
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    getEmployees()
      .then((response) => {
        const employeesData = Object.values(response);
        dispatch({ type: "SET_EMPLOYEES", payload: employeesData });
      })
      .catch((error) => console.log(error));

    fetchPermissions();
  }, [dispatch]);

  const fetchPermissions = async () => {
    try {
      const permissionsData = await getPermissions();
      setPermissions(permissionsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const employee_salary = target.elements.namedItem(
      "employee_salary"
    ) as HTMLInputElement;
    const permission_id = target.elements.namedItem(
      "permission_id"
    ) as HTMLSelectElement;
    const user_email = target.elements.namedItem(
      "user_email"
    ) as HTMLInputElement;
    const user_password = target.elements.namedItem(
      "user_password"
    ) as HTMLInputElement;
    const profile_firstName = target.elements.namedItem(
      "profile_firstName"
    ) as HTMLInputElement;
    const profile_lastName = target.elements.namedItem(
      "profile_lastName"
    ) as HTMLInputElement;
    const profile_phone = target.elements.namedItem(
      "profile_phone"
    ) as HTMLInputElement;
    const profile_address = target.elements.namedItem(
      "profile_address"
    ) as HTMLInputElement;

    try {
      const newEmployee = await createEmployee(
        parseInt(employee_salary.value),
        permission_id.value,
        user_email.value,
        user_password.value,
        profile_firstName.value,
        profile_lastName.value,
        parseInt(profile_phone.value),
        profile_address.value
      );
      setEmployee(newEmployee);

      dispatch({ type: "CREATE_EMPLOYEE", payload: newEmployee });
      getEmployees()
        .then((employees) =>
          dispatch({ type: "SET_EMPLOYEES", payload: employees })
        )
        .catch((error) => console.log(error));
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleRemove = async (employee_id: string) => {
    try {
      await removeEmployee(employee_id);
      dispatch({ type: "REMOVE_EMPLOYEE", payload: employee_id });
      getEmployees()
        .then((employees) =>
          dispatch({ type: "SET_EMPLOYEES", payload: employees })
        )
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmployeeSelection = async (
    event: FormEvent<HTMLSelectElement>
  ) => {
    const employeeId = event.currentTarget.value;
    if (employeeId) {
      try {
        const employeeDetails = await getEmployeeDetails(employeeId);
        setSelectedEmployeeDetails(employeeDetails);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedEmployeeDetails(undefined);
    }
  };

  const handleEmployeeUpdate = async (employee_id: string) => {
    try {
      const update = updatedEmployee[employee_id];
      if (update) {
        const employeeSalary = Number(update);
        await updateEmployee(employee_id, employeeSalary);

        const updatedEmployeeDetails = await getEmployeeDetails(employee_id);
        setSelectedEmployeeDetails(updatedEmployeeDetails);

        dispatch({
          type: "UPDATE_EMPLOYEE",
          payload: { employee_id, updatedEmployee: employeeSalary },
        });
        setUpdatedEmployee((prevState) => {
          const updatedState = { ...prevState };
          updatedState[employee_id] = 0;
          return updatedState;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmployeeChange = (employee_id: string, value: number) => {
    setUpdatedEmployee((prevState) => ({
      ...prevState,
      [employee_id]: value,
    }));
  };

  return (
    <>
      <Container>
        <Navbar />

        <Main>
          <Top>
            <Menu>
              <AiOutlineMenu />
            </Menu>
            <div>
              <p>Welcome back</p>
              <small>Admin</small>
            </div>
          </Top>
          <h1>Employees</h1>

          <CreateHeader>Create Employee</CreateHeader>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="First Name"
              type="text"
              name="profile_firstName"
              id="profile_firstName"
              required
            />
            <Input
              placeholder="Last Name"
              type="text"
              name="profile_lastName"
              id="profile_lastName"
              required
            />

            <Select name="permission_id" id="permission_id" required>
              <option disabled value={""}>
                Choose Permission
              </option>
              {permissions.map((permission) => (
                <option
                  key={permission.permission_id}
                  value={permission.permission_id}
                >
                  {permission.permission_name}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Email"
              type="email"
              name="user_email"
              id="user_email"
              required
            />
            <Input
              placeholder="Password"
              type="text"
              name="user_password"
              id="user_password"
              required
            />

            <Input
              placeholder="Phone"
              type="text"
              name="profile_phone"
              id="profile_phone"
              required
            />
            <Input
              placeholder="Address"
              type="text"
              name="profile_address"
              id="profile_address"
            />
            <Input
              placeholder="Salary"
              type="number"
              name="employee_salary"
              id="employee_salary"
              required
              min={1}
            />
            <CreateBtn type="submit">Create</CreateBtn>
          </Form>

          <AllEmployees>
            <h2>All Employees</h2>
            {employees.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Permission</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.employee_id}>
                        <td>
                          {employee.user?.profile?.profile_firstName ||
                          employee.user?.profile?.profile_lastName
                            ? `${employee.user?.profile?.profile_firstName} ${employee.user?.profile?.profile_lastName}`
                            : "-"}
                        </td>
                        <td>
                          {employee.user?.user_email
                            ? employee.user?.user_email
                            : "-"}
                        </td>
                        <td>
                          {employee.user?.permission?.permission_name
                            ? employee.user?.permission?.permission_name
                            : "default"}
                        </td>
                        <td>{employee.employee_salary}€</td>
                        <td>
                          <CancelBtn
                            onClick={() => handleRemove(employee.employee_id)}
                          >
                            Remove
                          </CancelBtn>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            ) : (
              <p>There are no employees</p>
            )}
          </AllEmployees>

          <br />
          <h2>Employee Details</h2>
          <Select name="selectedEmployee" onChange={handleEmployeeSelection}>
            <option value="">SELECT AN EMPLOYEE</option>
            {employees.map((employee) => (
              <option key={employee.employee_id} value={employee.employee_id}>
                {`${employee.user?.profile?.profile_firstName} ${employee.user?.profile?.profile_lastName}`}
              </option>
            ))}
          </Select>

          {selectedEmployeeDetails ? (
            <DetailTableContainer>
              <DetailTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Permission</th>
                    <th>Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {selectedEmployeeDetails.user?.profile?.profile_firstName}{" "}
                      {selectedEmployeeDetails.user?.profile?.profile_lastName}
                    </td>
                    <td>{selectedEmployeeDetails.user?.user_email}</td>
                    <td>
                      {
                        selectedEmployeeDetails.user?.permission
                          ?.permission_name
                      }
                    </td>
                    <td>{selectedEmployeeDetails.employee_salary}€</td>
                    <td>
                      <DetailInput
                        type="number"
                        value={
                          updatedEmployee[
                            selectedEmployeeDetails.employee_id
                          ] || ""
                        }
                        onChange={(e) =>
                          handleEmployeeChange(
                            selectedEmployeeDetails.employee_id,
                            parseInt(e.target.value)
                          )
                        }
                        placeholder="Update salary"
                      />
                      <UpdateBtn
                        onClick={() =>
                          handleEmployeeUpdate(
                            selectedEmployeeDetails.employee_id
                          )
                        }
                      >
                        Update
                      </UpdateBtn>
                    </td>
                    <td>
                      <CancelBtn
                        onClick={() =>
                          handleRemove(selectedEmployeeDetails.employee_id)
                        }
                      >
                        Remove
                      </CancelBtn>
                    </td>
                  </tr>
                </tbody>
              </DetailTable>
            </DetailTableContainer>
          ) : (
            <p>No employee selected</p>
          )}
        </Main>
      </Container>
    </>
  );
}

export default EmployeePage;
