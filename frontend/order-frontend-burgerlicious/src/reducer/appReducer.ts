import { AppAction, AppState } from "../context/AppContext";

export function reducer(state: AppState, { type, payload }: AppAction) {
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload, isLoggedIn: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, user: undefined, isLoggedIn: false, reservations: [] };

    // ORDERS
    case "CREATE_ORDER":
      return { ...state, orders: state.orders, payload };
    case "REMOVE_ORDER": {
      const updatedOrders = state.orders.filter(
        (orders) => orders.order_id !== payload
      );
      return { ...state, reservations: updatedOrders };
    }

    // BILLS
    case "CREATE_BILL":
      return { ...state, bills: state.bills, payload };

    default:
      return state;
  }
}
