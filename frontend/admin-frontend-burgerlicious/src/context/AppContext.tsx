import { createContext, ReactNode, useEffect, useReducer } from "react";

import { reducer } from "../reducer/appReducer";
import { login, profile, register, RegisterData } from "../services/auth";
import { User } from "../models/user";
import { Employee } from "../models/employee";
import { Menu, MenuItem } from "../models/menu";
import { RestaurantTable } from "../models/restaurantTable";
import { Permission } from "../models/permission";
import { Reservation } from "../models/reservation";
import { Bill } from "../models/bill";
import { Costumer } from "../models/costumer";

export type AppState = {
  darkMode: boolean;
  user?: User;
  isLoggedIn: boolean;
  users: User[];
  employees: Employee[];
  costumers: Costumer[];
  menus: Menu[];
  menuItems: MenuItem[];
  restaurantTables: RestaurantTable[];
  permissions: Permission[];
  reservations: Reservation[];
  doneReservations: Reservation[];
  bills: Bill[];
};

export type AppAction = {
  type: string;
  payload?: any;
};

interface AppContextModel extends AppState {
  dispatch: React.Dispatch<AppAction>;
  attemptLogin: (username: string, password: string) => Promise<void>;
  attemptRegister: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

export const AppContext = createContext({} as AppContextModel);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const initialState: AppState = {
    darkMode: true,
    user: undefined,
    isLoggedIn: false,
    users: [],
    employees: [],
    costumers: [],
    menus: [],
    menuItems: [],
    restaurantTables: [],
    permissions: [],
    reservations: [],
    doneReservations: [],
    bills: [],
  };

  const [appState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      profile().then((user) => {
        dispatch({ type: "LOGIN", payload: user });
      });
    }

    const cart = localStorage.getItem("cart");
    cart && dispatch({ type: "SET_CART", payload: JSON.parse(cart) });
  }, []);

  async function attemptLogin(email: string, password: string) {
    const { token } = await login(email, password);
    if (token) {
      localStorage.setItem("token", token);
      const user = await profile();
      dispatch({ type: "LOGIN", payload: user });
    }
  }

  async function attemptRegister(data: RegisterData) {
    const { token } = await register(data);
    if (token) {
      localStorage.setItem("token", token);
      const user = await profile();
      dispatch({ type: "LOGIN", payload: user });
    }
  }

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
  };

  const value = {
    ...appState,
    dispatch,
    attemptLogin,
    attemptRegister,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
