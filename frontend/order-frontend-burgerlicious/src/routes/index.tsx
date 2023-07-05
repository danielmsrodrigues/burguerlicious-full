import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import OrderPage from "../pages/Orders";
import BillPage from "../pages/Bill";
import PasswordReset from "../pages/PasswordReset";

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
        path: "/orders",
        element: <OrderPage />,
      },
      {
        path: "/bill",
        element: <BillPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/reset",
        element: <PasswordReset />,
      },
    ],
  },
]);
