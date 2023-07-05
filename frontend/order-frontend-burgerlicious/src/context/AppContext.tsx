import {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useState,
} from "react";

import { reducer } from "../reducer/appReducer";
import { login, profile } from "../services/auth";
import { Orders } from "../models/orders";
import { User } from "../models/user";
import { Bill } from "../models/bill";

import { RotatingLines } from "react-loader-spinner";

export type AppState = {
  user?: User;
  isLoggedIn: boolean;
  orders: Orders[];
  bills: Bill[];
  users: User[];
};

export type AppAction = {
  type: string;
  payload?: any;
};

interface AppContextModel extends AppState {
  dispatch: React.Dispatch<AppAction>;
  attemptLogin: (user_email: string, user_password: string) => Promise<void>;
  logout: () => void;
}

export const AppContext = createContext({} as AppContextModel);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const initialState: AppState = {
    user: undefined,
    isLoggedIn: false,
    orders: [],
    bills: [],
    users: [],
  };

  const [appState, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      profile().then((user) => {
        dispatch({ type: "LOGIN", payload: user });
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  async function attemptLogin(user_email: string, user_password: string) {
    const { token } = await login(user_email, user_password);
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
    logout,
    isLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {isLoading ? (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="40"
          visible={true}
        />
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};

export default AppProvider;
