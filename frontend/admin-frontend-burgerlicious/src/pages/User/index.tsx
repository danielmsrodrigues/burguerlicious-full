import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { User } from "../../models/user";
import { Permission } from "../../models/permission";
import { getPermissions } from "../../services/permission";
import {
  getUserDetails,
  getUsers,
  removeUser,
  updateUser,
} from "../../services/user";
import { Container } from "../../styles/styles";

import Navbar from "../../components/Navbar";
import {
  AllUsers,
  DetailTable,
  DetailTableContainer,
  Main,
  Menu,
  RemoveBtn,
  Select,
  Table,
  TableContainer,
  Top,
  UpdateBtn,
} from "./styles";

import { AiOutlineMenu } from "react-icons/ai";

function UserPage() {
  const { users, isLoggedIn, dispatch } = useApp();
  const [selectedUserDetails, setSelectedUserDetails] = useState<User>();
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [updatedUser, setUpdatedUser] = useState<{
    [key: string]: string;
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    getUsers()
      .then((users) => dispatch({ type: "SET_USER", payload: users }))
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

  const handleRemove = async (user_id: string) => {
    try {
      await removeUser(user_id);
      dispatch({ type: "REMOVE_USER", payload: user_id });
      getUsers()
        .then((users) => dispatch({ type: "SET_USER", payload: users }))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserSelection = async (event: FormEvent<HTMLSelectElement>) => {
    const costumerId = event.currentTarget.value;
    if (costumerId) {
      try {
        const userDetails = await getUserDetails(costumerId);
        setSelectedUserDetails(userDetails);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedUserDetails(undefined);
    }
  };

  const handleUserUpdate = async (user_id: string) => {
    try {
      const update = updatedUser[user_id];
      if (update) {
        const userPermission = update;
        await updateUser(user_id, userPermission);

        const updatedEmployeeDetails = await getUserDetails(user_id);
        setSelectedUserDetails(updatedEmployeeDetails);

        dispatch({
          type: "UPDATE_USER",
          payload: { user_id, updatedUser: userPermission },
        });
        setUpdatedUser((prevState) => {
          const updatedState = { ...prevState };
          updatedState[user_id] = "";
          return updatedState;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserChange = (user_id: string, value: string) => {
    setUpdatedUser((prevState) => ({
      ...prevState,
      [user_id]: value,
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

          <h1>Users</h1>
          <AllUsers>
            <h2>All Users</h2>
            {users.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Permission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.user_id}>
                        <td>
                          {user.profile?.profile_firstName
                            ? `${user.profile.profile_firstName} ${user.profile.profile_lastName}`
                            : "-"}
                        </td>

                        <td>{user.user_email}</td>
                        <td>
                          {user.permission?.permission_name
                            ? user.permission.permission_name
                            : "default"}
                        </td>
                        <td>
                          <RemoveBtn onClick={() => handleRemove(user.user_id)}>
                            Remove
                          </RemoveBtn>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            ) : (
              <p>No users yet</p>
            )}

            <br />
            <h2>User Details</h2>
            <Select name="selectedUser" onChange={handleUserSelection}>
              <option value="">SELECT A USER</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>
                  {user.profile?.profile_firstName ||
                  user.profile?.profile_lastName
                    ? `${user.profile?.profile_firstName ?? ""} ${
                        user.profile?.profile_lastName ?? ""
                      }`
                    : "-Name not available-"}
                </option>
              ))}
            </Select>

            {selectedUserDetails ? (
              <DetailTableContainer>
                <DetailTable>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Permission</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {selectedUserDetails.profile?.profile_firstName
                          ? `${selectedUserDetails.profile.profile_firstName} ${selectedUserDetails.profile.profile_lastName}`
                          : "-"}
                      </td>
                      <td>{selectedUserDetails.user_email}</td>
                      <td>
                        {selectedUserDetails.permission?.permission_name
                          ? selectedUserDetails.permission.permission_name
                          : "default"}
                      </td>
                      <td>
                        <Select
                          value={updatedUser[selectedUserDetails.user_id] || ""}
                          onChange={(e) =>
                            handleUserChange(
                              selectedUserDetails.user_id,
                              e.target.value
                            )
                          }
                        >
                          <option value="" disabled>
                            Select Permission
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
                        <UpdateBtn
                          onClick={() =>
                            handleUserUpdate(selectedUserDetails.user_id)
                          }
                        >
                          Update
                        </UpdateBtn>
                      </td>
                      <td>
                        <RemoveBtn
                          onClick={() =>
                            handleRemove(selectedUserDetails.user_id)
                          }
                        >
                          Remove
                        </RemoveBtn>
                      </td>
                    </tr>
                  </tbody>
                </DetailTable>
              </DetailTableContainer>
            ) : (
              <p>No user selected</p>
            )}
          </AllUsers>
        </Main>
      </Container>
    </>
  );
}

export default UserPage;
