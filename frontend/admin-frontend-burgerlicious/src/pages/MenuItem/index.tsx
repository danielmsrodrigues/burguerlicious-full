import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { MenuItem } from "../../models/menu";
import { getMenu } from "../../services/menu";
import {
  createMenuItem,
  getMenuItem,
  getMenuItemDetails,
  removeMenuItem,
} from "../../services/menuItem";

import Navbar from "../../components/Navbar";
import {
  AllMenuItems,
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
} from "./styles";
import { Container } from "../../styles/styles";

import { AiOutlineMenu } from "react-icons/ai";

function MenuItemPage() {
  const { menuItems, menus, isLoggedIn, dispatch } = useApp();
  const [menuItem, setMenuItem] = useState<MenuItem>();
  const [selectedMenuId, setSelectedMenuId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    getMenuItem()
      .then((menuItems) =>
        dispatch({ type: "SET_MENU_ITEMS", payload: menuItems })
      )
      .catch((error) => console.log(error));

    getMenu()
      .then((menus) => dispatch({ type: "SET_MENUS", payload: menus }))
      .catch((error) => console.log(error));
  }, [dispatch]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const menuItem_name = target.elements.namedItem(
      "menuItem_name"
    ) as HTMLInputElement;
    const menuItem_price = target.elements.namedItem(
      "menuItem_price"
    ) as HTMLInputElement;

    try {
      const newMenuItem = await createMenuItem(
        selectedMenuId,
        menuItem_name.value,
        Number(menuItem_price.value)
      );
      setMenuItem(newMenuItem);

      dispatch({ type: "CREATE_MENU_ITEM", payload: newMenuItem });
      getMenuItem()
        .then((menuItems) =>
          dispatch({ type: "SET_MENU_ITEMS", payload: menuItems })
        )
        .catch((error) => console.log(error));
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMenuId(event.target.value);
  };

  const handleRemove = async (menuItem_id: string) => {
    try {
      await removeMenuItem(menuItem_id);
      dispatch({ type: "REMOVE_MENU_ITEM", payload: menuItem_id });
      getMenuItem()
        .then((menuItems) =>
          dispatch({ type: "SET_MENU_ITEMS", payload: menuItems })
        )
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuItemSelection = async (
    event: FormEvent<HTMLSelectElement>
  ) => {
    const menuItemId = event.currentTarget.value;
    if (menuItemId) {
      try {
        const menuItemDetails = await getMenuItemDetails(menuItemId);
        setMenuItem(menuItemDetails);
      } catch (error) {
        console.log(error);
      }
    } else {
      setMenuItem(undefined);
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

          <h1>Menu Items</h1>

          <CreateHeader>Create Menu Item</CreateHeader>

          <Form onSubmit={handleSubmit}>
            <Select value={selectedMenuId} onChange={handleSelectChange}>
              <option value="" disabled>
                Select Menu
              </option>
              {menus.map((menu) => (
                <option key={menu.menu_id} value={menu.menu_id}>
                  {menu.menu_name}
                </option>
              ))}
            </Select>
            <Input
              placeholder="Item name"
              type="text"
              name="menuItem_name"
              id="menuItem_name"
              required
            />
            <Input
              placeholder="Price"
              type="number"
              name="menuItem_price"
              id="menuItem_price"
              required
              min={1}
            />
            <CreateBtn type="submit">Create</CreateBtn>
          </Form>

          <AllMenuItems>
            <h2>All Menu Items</h2>
            {menuItems.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Menu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((menuItem) => (
                      <tr key={menuItem?.menuItem_id}>
                        <td>{menuItem.menuItem_name}</td>
                        <td>{menuItem?.menuItem_price}€</td>
                        <td>{menuItem.menu.menu_name}</td>
                        <td>
                          <RemoveBtn
                            onClick={() => handleRemove(menuItem.menuItem_id)}
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
              <p>No menu items yet</p>
            )}
          </AllMenuItems>

          <br />
          <h2>Menu Item Details</h2>
          <Select name="selectedMenuItem" onChange={handleMenuItemSelection}>
            <option value="">SELECT A MENU ITEM</option>
            {menuItems.map((menuItem) => (
              <option key={menuItem.menuItem_id} value={menuItem.menuItem_id}>
                {menuItem.menuItem_name}
              </option>
            ))}
          </Select>

          {menuItem ? (
            <DetailTableContainer>
              <DetailTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Menu</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{menuItem.menuItem_name}</td>
                    <td>{menuItem.menuItem_price}€</td>
                    <td>{menuItem.menu.menu_name}</td>
                    <td>
                      <RemoveBtn
                        onClick={() => handleRemove(menuItem.menuItem_id)}
                      >
                        Remove
                      </RemoveBtn>
                    </td>
                  </tr>
                </tbody>
              </DetailTable>
            </DetailTableContainer>
          ) : (
            <p>No item selected</p>
          )}
        </Main>
      </Container>
    </>
  );
}

export default MenuItemPage;
