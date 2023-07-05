import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MenuItemPage from "../pages/MenuItem";
import MenuPage from "../pages/Menu";
import TablePage from "../pages/Table";
import PermissionPage from "../pages/Permission";
import EmployeePage from "../pages/Employee";
import BillPage from "../pages/Bill";
import ReservationPage from "../pages/Reservation";
import CostumerPage from "../pages/Costumer";
import UserPage from "../pages/User";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/employee",
        element: <EmployeePage />,
      },
      {
        path: "/costumer",
        element: <CostumerPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/menu",
        element: <MenuPage />,
      },
      {
        path: "/menuItem",
        element: <MenuItemPage />,
      },
      {
        path: "/table",
        element: <TablePage />,
      },
      {
        path: "/permission",
        element: <PermissionPage />,
      },
      {
        path: "/bill",
        element: <BillPage />,
      },
      {
        path: "/reservation",
        element: <ReservationPage />,
      },
    ],
  },
]);
