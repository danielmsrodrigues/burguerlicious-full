import { useNavigate } from "react-router-dom";
import { useApp } from "../../hooks/useApp";

import {
  BsFillPersonFill,
  BsFillPeopleFill,
  BsFillFilePersonFill,
  BsReceipt,
  BsBook,
  BsFillBookmarkCheckFill,
} from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { MdFastfood, MdTableRestaurant, MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

import { Aside, Icon, Logo, Logout, Nav, Sidebar, Top } from "./styles";

function Navbar() {
  const { isLoggedIn, logout } = useApp();
  const navigate = useNavigate();

  function handleAuth() {
    if (isLoggedIn) {
      logout();
    }

    navigate(isLoggedIn ? "/" : "/dashboard");
  }

  return (
    <>
      <Aside>
        <Top>
          <Logo>
            <h2>Burgerlicious &trade;</h2>
          </Logo>
        </Top>

        <Sidebar>
          <Nav to={"/dashboard"}>
            <Icon>
              <MdDashboard title="Dashboard" />
            </Icon>
            <h3>Dashboard</h3>
          </Nav>
          <Nav to={"/employee"}>
            <Icon>
              <BsFillPersonFill title="Employees" />
            </Icon>
            <h3>Employees</h3>
          </Nav>
          <Nav to={"/costumer"}>
            <Icon>
              <BsFillPeopleFill title="Costumers" />
            </Icon>
            <h3>Customers</h3>
          </Nav>
          <Nav to={"/user"}>
            <Icon>
              <BsFillFilePersonFill title="Users" />
            </Icon>
            <h3>Users</h3>
          </Nav>
          <Nav to={"/bill"}>
            <Icon>
              <BsReceipt title="Bills" />
            </Icon>
            <h3>Bills</h3>
          </Nav>
          <Nav to={"/menu"}>
            <Icon>
              <BsBook title="Menus" />
            </Icon>
            <h3>Menus</h3>
          </Nav>
          <Nav to={"/menuItem"}>
            <Icon>
              <MdFastfood title="Menu Items" />
            </Icon>
            <h3>Menu Items</h3>
          </Nav>
          <Nav to={"/permission"}>
            <Icon>
              <AiFillLock title="Permissions" />
            </Icon>
            <h3>Permissions</h3>
          </Nav>
          <Nav to={"/reservation"}>
            <Icon>
              <BsFillBookmarkCheckFill title="Reservations" />
            </Icon>
            <h3>Reservations</h3>
          </Nav>
          <Nav to={"/table"}>
            <Icon>
              <MdTableRestaurant title="Tables" />
            </Icon>
            <h3>Tables</h3>
          </Nav>
          <Icon>
            <Logout onClick={handleAuth}>
              <FiLogOut /> {isLoggedIn ? "Logout" : "Login"}
            </Logout>
          </Icon>
        </Sidebar>
      </Aside>
    </>
  );
}

export default Navbar;
