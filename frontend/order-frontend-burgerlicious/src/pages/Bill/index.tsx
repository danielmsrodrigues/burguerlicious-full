import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { useApp } from "../../hooks/useApp";

import { Reservation } from "../../models/reservation";
import { Orders } from "../../models/orders";

import {
  getReservationDetails,
  getReservations,
} from "../../services/reservations";
import { createBill } from "../../services/bill";

import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";

import {
  Checkout,
  Choose,
  Container,
  Details,
  Nif,
  Submit,
  Table,
  TableContainer,
  TableDescription,
  TableHeader,
  TableRow,
  Titles,
  Wrapper,
} from "./styles";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BillPage() {
  const { dispatch, isLoggedIn } = useApp();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [reservation, setReservation] = useState<string>("");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [nif, setNif] = useState<number>();
  const [orderList, setOrderList] = useState<Orders[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const notify = () =>
    toast.success("Bill created successfully!", {
      position: "top-right",
      autoClose: 4000,
      pauseOnHover: false,
      draggable: false,
    });

  useEffect(() => {
    isLoggedIn && navigate("/bill");
  }, [isLoggedIn]);

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchReservations();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [orderList]);

  const fetchReservations = async () => {
    try {
      const reservationsList = await getReservations();

      const completedReservations = reservationsList.filter((reservation) => {
        const allOrdersCompleted = reservation.order.every(
          (order) => order.order_running === false
        );

        const hasOrders = reservation.order.length > 0;

        return allOrdersCompleted && hasOrders;
      });

      const reservationsWithProfile = completedReservations.map(
        (reservation) => {
          const profileFirstName =
            reservation.user?.profile?.profile_firstName || "";
          return {
            ...reservation,
            profile_firstName: profileFirstName,
          };
        }
      );

      setReservations(reservationsWithProfile);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReservationOrders = async (reservation_id: string) => {
    try {
      const orders = await getReservationDetails(reservation_id);
      setOrderList(orders.order);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReservations = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const reservationId = event.target.value;
    setReservation(reservationId);
    fetchReservationOrders(reservationId);
  };

  const handleNif = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const parsedValue = parseInt(value);

    setNif(parsedValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newBill = await createBill(nif ?? 0, reservation);
      dispatch({ type: "CREATE_BILL", payload: newBill });
      notify();
      setLoading(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    let totalAmount = 0;

    for (const order of orderList) {
      const price = order.menuItem.menuItem_price;
      const amount = order.order_itemQuantity;

      totalPrice += price * amount;
      totalAmount += amount;
    }

    setTotalPrice(totalPrice);
    setTotalAmount(totalAmount);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Wrapper>
          <Checkout>
            <h3>Order Summary</h3>
            <form onSubmit={handleSubmit}>
              <Choose value={reservation} onChange={handleReservations}>
                <option value="" disabled>
                  Select a Reservation
                </option>
                {reservations.map((reservation) => (
                  <option
                    key={reservation.reservation_id}
                    value={reservation.reservation_id}
                  >
                    [{moment.utc(reservation.reservation_hour).format("HH:mm")}]
                    [TABLE {reservation.restaurantTable.restaurantTable_number}]{" "}
                    {reservation.user.profile.profile_firstName}{" "}
                    {reservation.user.profile.profile_lastName}
                  </option>
                ))}
              </Choose>

              <Nif
                placeholder="NIF (9 digits)"
                type="text"
                name="notes"
                id="notes"
                onChange={handleNif}
                minLength={9}
                maxLength={9}
                pattern="[0-9.]+"
              />

              <div>
                <Titles>
                  Items Ordered <Details>{totalAmount}</Details>
                </Titles>
                <Titles>
                  Total <Details>{totalPrice}€</Details>
                </Titles>
              </div>

              <Submit type="submit">Submit {loading && <Loader />}</Submit>
            </form>
          </Checkout>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <TableHeader>Items summary</TableHeader>
                  <TableHeader>Qty</TableHeader>
                  <TableHeader>Price</TableHeader>
                  <TableHeader>Total Price</TableHeader>
                </tr>
              </thead>
              <tbody>
                {orderList.map((order, index) => (
                  <TableRow key={order.order_id || index}>
                    <TableDescription>
                      {order.menuItem.menuItem_name}
                    </TableDescription>
                    <TableDescription>
                      {order.order_itemQuantity}
                    </TableDescription>
                    <TableDescription>
                      {order.menuItem.menuItem_price}€
                    </TableDescription>
                    <TableDescription>
                      {order.menuItem.menuItem_price * order.order_itemQuantity}
                      €
                    </TableDescription>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableContainer>
        </Wrapper>
      </Container>
      <ToastContainer pauseOnFocusLoss={false} />
    </>
  );
}

export default BillPage;
