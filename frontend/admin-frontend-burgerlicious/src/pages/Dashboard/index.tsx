import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { useApp } from "../../hooks/useApp";
import { getReservation } from "../../services/reservation";
import { getBill } from "../../services/bill";
import { getUsers } from "../../services/user";
import { User } from "../../models/user";
import { Reservation } from "../../models/reservation";

import Navbar from "../../components/Navbar";
import {
  Cards,
  DateTime,
  Icon,
  Insights,
  Main,
  Menu,
  Nav,
  RecentReservations,
  RecentUpdates,
  Right,
  Small,
  Table,
  Top,
  Update,
  Updates,
} from "./styles";
import { DashboardContainer } from "../../styles/styles";

import { AiOutlineMenu } from "react-icons/ai";
import { BiMoneyWithdraw } from "react-icons/bi";

function Dashboard() {
  const { reservations, isLoggedIn, dispatch } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setLimitedReservations] = useState<Reservation[] | null>(null);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalReservationsInLast24Hours, setTotalReservationsInLast24Hours] =
    useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    getReservation()
      .then((reservations) => {
        const limitedReservations = reservations.slice(0, 5);
        dispatch({ type: "SET_RESERVATIONS", payload: limitedReservations });
        setLimitedReservations(limitedReservations);
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    getBill()
      .then((bills) => {
        dispatch({ type: "SET_BILLS", payload: bills });

        const total = bills.reduce((acc, bill) => acc + bill.bill_total, 0);
        setTotalSales(total);
      })
      .catch((error) => console.log("Error:", error));
  }, [dispatch]);

  useEffect(() => {
    getUsers()
      .then((users) => {
        dispatch({ type: "SET_USER", payload: users });

        const last24Hours = moment().subtract(24, "hours");
        const filteredUsers = users.filter((user: User) =>
          moment(user.createdAt).isAfter(last24Hours)
        );
        const count = filteredUsers.length;
        setTotalUsers(count);
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    const last24Hours = moment().subtract(24, "hours");
    const filteredReservations = reservations.filter((reservation) =>
      moment(reservation.reservation_date).isAfter(last24Hours)
    );
    const count = filteredReservations.length;
    setTotalReservationsInLast24Hours(count);
  }, [reservations]);

  return (
    <>
      <DashboardContainer>
        <Navbar />
        <Main>
          <h1>Dashboard</h1>

          <DateTime>
            <p>{currentTime.toLocaleString()}</p>
          </DateTime>

          <Insights>
            <Cards>
              <Icon>
                <BiMoneyWithdraw />
              </Icon>
              <div>
                <div>
                  <h3>Total sales</h3>
                  <h1>{totalSales}€</h1>
                </div>
                <Small>all time</Small>
              </div>
            </Cards>
          </Insights>

          <RecentReservations>
            <h2>Recent Reservations</h2>
            {reservations.length > 0 ? (
              <div>
                <Table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Hour</th>
                      <th>Name</th>
                      <th>Nº People</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.reservation_id}>
                        <td>
                          {moment
                            .utc(reservation.reservation_date)
                            .format("DD/MM/YYYY")}
                        </td>
                        <td>
                          {moment
                            .utc(reservation.reservation_hour)
                            .format("HH:mm")}
                        </td>
                        <td>
                          {reservation.user?.profile?.profile_firstName}{" "}
                          {reservation.user?.profile?.profile_lastName}
                        </td>
                        <td>{reservation.reservation_numPeople}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Nav to={"/reservation"}>Show all</Nav>
              </div>
            ) : (
              <p>No reservations yet</p>
            )}
          </RecentReservations>
        </Main>

        <Right>
          <Top>
            <Menu>
              <AiOutlineMenu />
            </Menu>
            <div>
              <p>Welcome back</p>
              <small>Admin</small>
            </div>
          </Top>

          <RecentUpdates>
            <h2>Recent Updates</h2>
            <Updates>
              <Update>
                <div>
                  <p>
                    <b>{totalUsers}</b> users have signed up
                    <br />
                    <small>last 24 hours</small>
                  </p>
                </div>
              </Update>
              <Update>
                <div>
                  <p>
                    <b>{totalReservationsInLast24Hours}</b> reservation(s) were
                    made
                    <br />
                    <small>last 24 hours</small>
                  </p>
                </div>
              </Update>
            </Updates>
          </RecentUpdates>
        </Right>
      </DashboardContainer>
    </>
  );
}

export default Dashboard;
