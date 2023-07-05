import { AppAction, AppState } from "../context/AppContext";

export function reducer(state: AppState, { type, payload }: AppAction) {
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload, isLoggedIn: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, user: undefined, isLoggedIn: false, reservations: [] };

    // ORDERS
    case "UPDATE_STATUS": {
      const updateStatus = state.orders.filter(
        (orders) => orders.order_id !== payload
      );
      return { ...state, orders: updateStatus };
    }
    default:
      return state;
  }
}
