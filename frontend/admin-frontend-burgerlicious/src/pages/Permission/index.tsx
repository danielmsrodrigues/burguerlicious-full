import { useEffect, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { Permission } from "../../models/permission";
import {
  createPermission,
  getPermissions,
  removePermission,
} from "../../services/permission";

import Navbar from "../../components/Navbar";
import {
  AllPermissions,
  CreateBtn,
  CreateHeader,
  Form,
  Input,
  Main,
  MenuBtn,
  RemoveBtn,
  Table,
  TableContainer,
  Top,
} from "./styles";
import { Container } from "../../styles/styles";

import { AiOutlineMenu } from "react-icons/ai";

function PermissionPage() {
  const { permissions, isLoggedIn, dispatch } = useApp();
  const [, setPermission] = useState<Permission>();
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    getPermissions()
      .then((permissions) =>
        dispatch({ type: "SET_PERMISSIONS", payload: permissions })
      )
      .catch((error) => console.log(error));
  }, [dispatch]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const permission_name = target.elements.namedItem(
      "permission_name"
    ) as HTMLInputElement;

    try {
      const newPermission = await createPermission(permission_name.value);
      setPermission(newPermission);

      dispatch({ type: "CREATE_PERMISSION", payload: newPermission });
      getPermissions()
        .then((permissions) =>
          dispatch({ type: "SET_PERMISSIONS", payload: permissions })
        )
        .catch((error) => console.log(error));
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleRemove = async (permission_id: string) => {
    try {
      await removePermission(permission_id);
      dispatch({ type: "REMOVE_PERMISSION", payload: permission_id });
      getPermissions()
        .then((permissions) =>
          dispatch({ type: "SET_PERMISSIONS", payload: permissions })
        )
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const sortedPermissions = [...permissions].sort((a, b) =>
    a.permission_name.localeCompare(b.permission_name)
  );

  return (
    <>
      <Container>
        <Navbar />
        <Main>
          <Top>
            <MenuBtn>
              <AiOutlineMenu />
            </MenuBtn>
            <div>
              <p>Welcome back</p>
              <small>Admin</small>
            </div>
          </Top>

          <h1>Permissions</h1>

          <CreateHeader>Create Permission</CreateHeader>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="Name"
              type="text"
              name="permission_name"
              id="permission_name"
            />
            <CreateBtn type="submit">Create</CreateBtn>
          </Form>

          <AllPermissions>
            <h2>All Permissions</h2>
            {sortedPermissions.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPermissions.map((permission) => (
                      <tr key={permission.permission_id}>
                        <td>{permission.permission_name}</td>
                        <td>{permission.permission_id}</td>
                        <td>
                          <RemoveBtn
                            onClick={() =>
                              handleRemove(permission.permission_id)
                            }
                          >
                            Remove
                          </RemoveBtn>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            ) : (
              <p>No permissions yet</p>
            )}
          </AllPermissions>
        </Main>
      </Container>
    </>
  );
}

export default PermissionPage;
