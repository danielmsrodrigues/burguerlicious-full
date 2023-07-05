import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { Menu } from "../../models/menu";
import {
  createMenu,
  getMenu,
  getMenuDetails,
  removeMenu,
  updateMenuName,
} from "../../services/menu";

import Navbar from "../../components/Navbar";
import {
  AllMenus,
  CreateBtn,
  CreateHeader,
  DetailTable,
  DetailTableContainer,
  Form,
  Input,
  Main,
  MenuBtn,
  RemoveBtn,
  Select,
  Table,
  TableContainer,
  Top,
  UpdateBtn,
} from "./styles";
import { Container } from "../../styles/styles";

import { AiOutlineMenu } from "react-icons/ai";

function MenuPage() {
  const { menus, isLoggedIn, dispatch } = useApp();
  const [menu, setMenu] = useState<Menu>();
  const [updatedMenuNames, setUpdatedMenuNames] = useState<{
    [key: string]: string;
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    getMenu()
      .then((menus) => dispatch({ type: "SET_MENUS", payload: menus }))
      .catch((error) => console.log(error));
  }, [dispatch]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const menu_name = target.elements.namedItem(
      "menu_name"
    ) as HTMLInputElement;

    try {
      const newMenu = await createMenu(menu_name.value);
      setMenu(newMenu);

      dispatch({ type: "CREATE_MENU", payload: newMenu });
      getMenu()
        .then((menus) => dispatch({ type: "SET_MENUS", payload: menus }))
        .catch((error) => console.log(error));
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleRemove = async (menu_id: string) => {
    try {
      await removeMenu(menu_id);
      dispatch({ type: "REMOVE_MENU", payload: menu_id });
      getMenu()
        .then((menus) => dispatch({ type: "SET_MENUS", payload: menus }))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuNameUpdate = async (menu_id: string) => {
    try {
      const updatedName = updatedMenuNames[menu_id];
      if (updatedName) {
        await updateMenuName(menu_id, updatedName);
        dispatch({
          type: "UPDATE_MENU_NAME",
          payload: { menu_id, updatedMenuName: updatedName },
        });
        setUpdatedMenuNames((prevState) => ({ ...prevState, [menu_id]: "" }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuNameChange = (menu_id: string, value: string) => {
    setUpdatedMenuNames((prevState) => ({ ...prevState, [menu_id]: value }));
  };

  const handleMenuSelection = async (event: FormEvent<HTMLSelectElement>) => {
    const menuId = event.currentTarget.value;
    if (menuId) {
      try {
        const menuDetails = await getMenuDetails(menuId);
        setMenu(menuDetails);
      } catch (error) {
        console.log(error);
      }
    } else {
      setMenu(undefined);
    }
  };

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

          <h1>Menus</h1>
          <CreateHeader>Create Menu</CreateHeader>
          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="Name"
              type="text"
              name="menu_name"
              id="menu_name"
            />
            <CreateBtn type="submit">Create</CreateBtn>
          </Form>

          <AllMenus>
            <h2>All Menus</h2>
            {menus.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Menu Item</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menus.map((menu) => (
                      <tr key={menu.menu_id}>
                        <td>{menu.menu_name}</td>
                        <td>
                          {menu.menuItem && menu.menuItem.length > 0 ? (
                            menu.menuItem.map((menuItem) => (
                              <div key={menuItem.menuItem_id}>
                                <p>{menuItem.menuItem_name}</p>
                              </div>
                            ))
                          ) : (
                            <p>No menu items available</p>
                          )}
                        </td>
                        <td>
                          {menu.menuItem && menu.menuItem.length > 0 ? (
                            menu.menuItem.map((menuItem) => (
                              <div key={menuItem.menuItem_id}>
                                <p>{menuItem.menuItem_price}€</p>
                              </div>
                            ))
                          ) : (
                            <p>No menu items available</p>
                          )}
                        </td>
                        <td>
                          <Input
                            placeholder="Change name"
                            type="text"
                            value={updatedMenuNames[menu.menu_id] || ""}
                            onChange={(e) =>
                              handleMenuNameChange(menu.menu_id, e.target.value)
                            }
                          />
                          <UpdateBtn
                            onClick={() => handleMenuNameUpdate(menu.menu_id)}
                          >
                            Update
                          </UpdateBtn>
                        </td>
                        <td>
                          <RemoveBtn onClick={() => handleRemove(menu.menu_id)}>
                            Remove
                          </RemoveBtn>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            ) : (
              <p>No menus yet</p>
            )}

            <br />
            <h2>Menu Details</h2>
            <Select name="selectedMenu" onChange={handleMenuSelection}>
              <option value="">SELECT A MENU</option>
              {menus.map((menu) => (
                <option key={menu.menu_id} value={menu.menu_id}>
                  {menu.menu_name}
                </option>
              ))}
            </Select>

            {menu ? (
              <DetailTableContainer>
                <DetailTable>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Menu Item</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{menu.menu_name}</td>
                      <td>
                        {menu.menuItem && menu.menuItem.length > 0 ? (
                          menu.menuItem.map((menuItem) => (
                            <div key={menuItem.menuItem_id}>
                              <p>{menuItem.menuItem_name}</p>
                            </div>
                          ))
                        ) : (
                          <p>No menu items available</p>
                        )}
                      </td>
                      <td>
                        {menu.menuItem && menu.menuItem.length > 0 ? (
                          menu.menuItem.map((menuItem) => (
                            <div key={menuItem.menuItem_id}>
                              <p>{menuItem.menuItem_price}€</p>
                            </div>
                          ))
                        ) : (
                          <p>No menu items available</p>
                        )}
                      </td>
                      <td>
                        <Input
                          placeholder="Change name"
                          type="text"
                          value={updatedMenuNames[menu.menu_id] || ""}
                          onChange={(e) =>
                            handleMenuNameChange(menu.menu_id, e.target.value)
                          }
                        />
                        <UpdateBtn
                          onClick={() => handleMenuNameUpdate(menu.menu_id)}
                        >
                          Update
                        </UpdateBtn>
                      </td>
                      <td>
                        <RemoveBtn onClick={() => handleRemove(menu.menu_id)}>
                          Remove
                        </RemoveBtn>
                      </td>
                    </tr>
                  </tbody>
                </DetailTable>
              </DetailTableContainer>
            ) : (
              <p>No menu selected</p>
            )}
          </AllMenus>
        </Main>
      </Container>
    </>
  );
}

export default MenuPage;
