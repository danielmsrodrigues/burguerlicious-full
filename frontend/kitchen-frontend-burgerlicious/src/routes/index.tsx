import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
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
        element: <Orders />,
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
