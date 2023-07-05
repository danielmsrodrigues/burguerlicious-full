import { AppAction, AppState } from "../context/AppContext";

export function reducer(state: AppState, { type, payload }: AppAction) {
  switch (type) {
    // AUTH
    case "LOGIN":
      return { ...state, user: payload, isLoggedIn: true };
    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, user: undefined, isLoggedIn: false, reservations: [] };

    // EMPLOYEES
    case "SET_EMPLOYEES":
      return { ...state, employees: payload };
    case "CREATE_EMPLOYEE":
      return { ...state, employees: [...state.employees, payload] };
    case "REMOVE_EMPLOYEE": {
      const updatedEmployees = state.employees.filter(
        (employees) => employees.employee_id !== payload
      );
      return { ...state, employees: updatedEmployees };
    }
    case "UPDATE_EMPLOYEE": {
      const { employee_id, updatedEmployee } = payload;
      const updatedEmployees = state.employees.map((employee) =>
        employee.employee_id === employee_id
          ? { ...employee, employee_salary: updatedEmployee }
          : employee
      );
      return { ...state, employees: updatedEmployees };
    }

    // COSTUMERS
    case "SET_COSTUMER":
      return { ...state, costumers: payload };

    // USERS
    case "SET_USER":
      return { ...state, users: payload };
    case "REMOVE_USER": {
      const updatedUsers = state.users.filter(
        (users) => users.user_id !== payload
      );
      return { ...state, users: updatedUsers };
    }
    case "UPDATE_USER": {
      const { user_id, updatedUser } = payload;
      const updatedUsers = state.users.map((user) =>
        user.user_id === user_id
          ? { ...user, permission_id: updatedUser }
          : user
      );
      return { ...state, employees: updatedUsers };
    }

    // MENUS
    case "SET_MENUS":
      return { ...state, menus: payload };
    case "CREATE_MENU":
      return { ...state, menus: [...state.menus, payload] };
    case "REMOVE_MENU": {
      const updatedMenu = state.menus.filter(
        (menus) => menus.menu_id !== payload
      );
      return { ...state, menus: updatedMenu };
    }
    case "UPDATE_MENU_NAME": {
      const { menu_id, updatedMenuName } = payload;
      const updatedMenus = state.menus.map((menu) =>
        menu.menu_id === menu_id
          ? { ...menu, menu_name: updatedMenuName }
          : menu
      );
      return { ...state, menus: updatedMenus };
    }

    // MENU ITEMS
    case "SET_MENU_ITEMS":
      return { ...state, menuItems: payload };
    case "CREATE_MENU_ITEM":
      return { ...state, menuItems: [...state.menuItems, payload] };
    case "REMOVE_MENU_ITEM": {
      const updatedMenuItems = state.menuItems.filter(
        (menuItems) => menuItems.menuItem_id !== payload
      );
      return { ...state, menuItems: updatedMenuItems };
    }

    // TABLES
    case "SET_TABLES":
      return { ...state, restaurantTables: payload };
    case "CREATE_TABLE":
      return {
        ...state,
        restaurantTables: [...state.restaurantTables, payload],
      };
    case "REMOVE_TABLE": {
      const updatedTable = state.restaurantTables.filter(
        (restaurantTables) => restaurantTables.restaurantTable_id !== payload
      );
      return { ...state, restaurantTables: updatedTable };
    }

    // PERMISSIONS
    case "SET_PERMISSIONS":
      return { ...state, permissions: payload };
    case "CREATE_PERMISSION":
      return {
        ...state,
        permissions: [...state.permissions, payload],
      };
    case "REMOVE_PERMISSION": {
      const updatePermission = state.permissions.filter(
        (permissions) => permissions.permission_id !== payload
      );
      return { ...state, permissions: updatePermission };
    }

    // BILL
    case "SET_BILLS":
      return { ...state, bills: payload };

    // RESERVATION
    case "SET_RESERVATIONS":
      return { ...state, reservations: payload };
    case "SET_DONE_RESERVATIONS":
      return { ...state, doneReservations: payload };
    case "REMOVE_RESERVATION": {
      const updateReservation = state.reservations.filter(
        (reservations) => reservations.reservation_id !== payload
      );
      return { ...state, reservations: updateReservation };
    }
    case "UPDATE_RESERVATION": {
      const { reservation_id, updatedReservation } = payload;
      const updatedReservations = state.reservations.map((reservation) =>
        reservation.reservation_id === reservation_id
          ? { ...reservation, reservation_numPeople: updatedReservation }
          : reservation
      );
      return { ...state, reservations: updatedReservations };
    }

    default:
      return state;
  }
}
