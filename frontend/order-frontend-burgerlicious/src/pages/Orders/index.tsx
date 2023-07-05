import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { MenuItem, Orders } from "../../models/orders";
import { Reservation } from "../../models/reservation";

import { getMenuItem } from "../../services/menuItem";
import { createOrder } from "../../services/orders";
import { getReservations } from "../../services/reservations";

import { useApp } from "../../hooks/useApp";

import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";
import OrderStatus from "../../components/OrderStatus";

import {
  Amount,
  Button,
  Choose,
  Container,
  Details,
  Notes,
  Option,
  OrderContainer,
  Wrapper,
} from "./styles";

import jwtDecode from "jwt-decode";

function OrderPage() {
  const { dispatch, logout, isLoggedIn } = useApp();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [, setOrder] = useState<Orders>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservation, setReservation] = useState<string>("");
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const requiredPermission = "15e218a0-4d42-4ba4-87a7-cf259692e0e2";

      if (decodedToken.permission_id !== requiredPermission) {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    fetchMenuItem();
    fetchReservations();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchReservations();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchMenuItem = async () => {
    try {
      const menuItemList = await getMenuItem();
      setMenuItems(menuItemList);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReservations = async () => {
    try {
      const reservationsList = await getReservations();
      const reservationsWithProfile = reservationsList.map((reservation) => {
        const profileFirstName =
          reservation.user?.profile?.profile_firstName || "";
        return {
          ...reservation,
          profile_firstName: profileFirstName,
        };
      });
      setReservations(reservationsWithProfile);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReservations = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReservation(event.target.value);
  };

  const handleMenuItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMenuItem(event.target.value);
  };

  const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(value);
  };

  const handleNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newOrder = await createOrder(
        reservation,
        selectedMenuItem,
        quantity,
        notes
      );
      setOrder(newOrder);

      dispatch({ type: "CREATE_ORDER", payload: newOrder });
      setLoading(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <>
            <Details>
              <form onSubmit={handleSubmit}>
                <Choose
                  value={reservation}
                  onChange={handleReservations}
                  required
                >
                  <option value="" disabled>
                    Select a Reservation
                  </option>
                  {reservations.map((reservation) => (
                    <option
                      key={reservation.reservation_id}
                      value={reservation.reservation_id}
                    >
                      [
                      {moment.utc(reservation.reservation_hour).format("HH:mm")}
                      ] [TABLE{" "}
                      {reservation.restaurantTable.restaurantTable_number}]{" "}
                      {reservation.user.profile.profile_firstName}{" "}
                      {reservation.user.profile.profile_lastName}
                    </option>
                  ))}
                </Choose>

                <Choose
                  value={selectedMenuItem}
                  onChange={handleMenuItem}
                  required
                >
                  <option value="" disabled>
                    Select an Item
                  </option>
                  {menuItems.map((menuItem) => (
                    <Option
                      key={menuItem.menuItem_id}
                      value={menuItem.menuItem_id}
                    >
                      {menuItem.menuItem_name}
                    </Option>
                  ))}
                </Choose>

                <Amount
                  placeholder="Qt."
                  type="number"
                  name="quantity"
                  id="quantity"
                  onChange={handleQuantity}
                  min={1}
                  required
                />
                <Notes
                  placeholder="Notes"
                  type="text"
                  name="notes"
                  id="notes"
                  onChange={handleNotes}
                />

                <Button type="submit">SUBMIT {loading && <Loader />}</Button>
              </form>
            </Details>

            <OrderContainer>
              <OrderStatus />
            </OrderContainer>
          </>
        </Wrapper>
      </Container>
    </>
  );
}

export default OrderPage;
