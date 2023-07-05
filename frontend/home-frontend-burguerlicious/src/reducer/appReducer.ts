import { AppAction, AppState } from "../context/AppContext";

export function reducer(state: AppState, { type, payload }: AppAction) {
  switch (type) {
    case "LOGIN":
      return { ...state, user: payload, isLoggedIn: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, user: undefined, isLoggedIn: false, reservations: [] };

    // RESERVATIONS
    case "CREATE_RESERVATION":
      return { ...state, reservations: [...state.reservations, payload] };
    case "REMOVE_RESERVATION": {
      const updatedReservations = state.reservations.filter(
        (reservation) => reservation.reservation_id !== payload
      );
      return { ...state, reservations: updatedReservations };
    }
    default:
      return state;
  }
}
