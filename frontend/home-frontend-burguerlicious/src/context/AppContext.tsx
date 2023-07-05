import {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useState,
} from "react";

import { reducer } from "../reducer/appReducer";
import { Reservation } from "../models/reservation";
import { User } from "../models/user";
import { RegisterData, login, profile, register } from "../services/auth";

import { RotatingLines } from "react-loader-spinner";

export type AppState = {
  user?: User;
  isLoggedIn: boolean;
  reservations: Reservation[];
};

export type AppAction = {
  type: string;
  payload?: any;
};

interface AppContextModel extends AppState {
  dispatch: React.Dispatch<AppAction>;
  attemptLogin: (user_email: string, user_password: string) => Promise<void>;
  attemptRegister: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AppContext = createContext({} as AppContextModel);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const initialState: AppState = {
    user: undefined,
    isLoggedIn: false,
    reservations: [],
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

  async function attemptRegister(data: RegisterData) {
    const { token } = await register(data);
    if (token) {
      localStorage.setItem("token", token);
    }
  }

  const logout = () => dispatch({ type: "LOGOUT" });

  const value = {
    ...appState,
    dispatch,
    attemptLogin,
    attemptRegister,
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
