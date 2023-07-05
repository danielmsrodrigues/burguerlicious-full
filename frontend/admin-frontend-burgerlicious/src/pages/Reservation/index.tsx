import { FormEvent, useEffect, useState } from "react";
import moment from "moment";

import { useApp } from "../../hooks/useApp";
import {
  getDoneReservation,
  getReservation,
  getReservationDetails,
  removeReservation,
  updateReservation,
} from "../../services/reservation";

import Navbar from "../../components/Navbar";
import { Reservation } from "../../models/reservation";
import {
  Active,
  AllReservations,
  DetailTable,
  DetailTableContainer,
  Input,
  Main,
  MenuBtn,
  RemoveBtn,
  Select,
  Table,
  TableContainer,
  Top,
  UpdateBtn,
} from "./styles";
import { Container } from "../../styles/styles";

import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

function ReservationPage() {
  const { reservations, doneReservations, isLoggedIn, dispatch } = useApp();
  const [selectedReservationDetails, setSelectedReservationDetails] =
    useState<Reservation>();
  const [updatedReservations, setUpdatedReservations] = useState<{
    [key: string]: number;
  }>({});
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    getReservation()
      .then((reservations) =>
        dispatch({ type: "SET_RESERVATIONS", payload: reservations })
      )
      .catch((error) => console.log(error));
  }, [dispatch]);

  useEffect(() => {
    getDoneReservation()
      .then((doneReservations) =>
        dispatch({ type: "SET_DONE_RESERVATIONS", payload: doneReservations })
      )
      .catch((error) => console.log(error));
  }, [dispatch]);

  const handleRemove = async (reservation_id: string) => {
    try {
      await removeReservation(reservation_id);
      dispatch({ type: "REMOVE_RESERVATION", payload: reservation_id });
      getReservation()
        .then((reservations) =>
          dispatch({ type: "SET_RESERVATIONS", payload: reservations })
        )
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReservationSelection = async (
    event: FormEvent<HTMLSelectElement>
  ) => {
    const reservationId = event.currentTarget.value;
    if (reservationId) {
      try {
        const reservationDetails = await getReservationDetails(reservationId);
        setSelectedReservationDetails(reservationDetails);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedReservationDetails(undefined);
    }
  };

  const handleReservationUpdate = async (reservation_id: string) => {
    try {
      const update = updatedReservations[reservation_id];
      if (update) {
        const reservationNumPeople = Number(update);
        await updateReservation(reservation_id, reservationNumPeople);

        dispatch({
          type: "UPDATE_RESERVATION",
          payload: { reservation_id, updatedReservation: reservationNumPeople },
        });

        setUpdatedReservations((prevState) => ({
          ...prevState,
          [reservation_id]: 0,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReservationChange = (reservation_id: string, value: number) => {
    setUpdatedReservations((prevState) => ({
      ...prevState,
      [reservation_id]: value,
    }));
  };

  return (
    <>
      <Container>
        <Navbar />
        <Main>
          <Top>
            <MenuBtn>
              <AiOutlineMenu />
            </MenuBtn>
            <div>
              <p>Welcome back</p>
              <small>Admin</small>
            </div>
          </Top>

          <h1>Reservations</h1>

          <Active>Active Reservations</Active>

          <AllReservations>
            {reservations.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Date</th>
                      <th>Nº People</th>
                      <th>Table Nº</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.reservation_id}>
                        <td>
                          {reservation.user?.profile?.profile_firstName
                            ? `${reservation.user.profile.profile_firstName} ${reservation.user.profile.profile_lastName}`
                            : "-"}
                        </td>
                        <td>{reservation.user?.user_email || "-"}</td>
                        <td>
                          {reservation.user?.profile?.profile_phone || "-"}
                        </td>
                        <td>
                          {moment
                            .utc(reservation.reservation_date)
                            .format("DD-MM-YYYY")}
                          {" | "}
                          {moment
                            .utc(reservation.reservation_hour)
                            .format("HH:mm")}
                        </td>
                        <td>{reservation.reservation_numPeople}</td>
                        <td>
                          {reservation.restaurantTable.restaurantTable_number}
                        </td>
                        <td>
                          <Input
                            type="number"
                            value={
                              updatedReservations[reservation.reservation_id] ||
                              ""
                            }
                            onChange={(e) =>
                              handleReservationChange(
                                reservation.reservation_id,
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="Update nº people"
                          />
                          <UpdateBtn
                            onClick={() =>
                              handleReservationUpdate(
                                reservation.reservation_id
                              )
                            }
                          >
                            Update
                          </UpdateBtn>
                        </td>
                        <td>
                          <RemoveBtn
                            onClick={() =>
                              handleRemove(reservation.reservation_id)
                            }
                          >
                            Remove
                          </RemoveBtn>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            ) : (
              <p>No reservations yet</p>
            )}
          </AllReservations>

          <br />
          <h2>Reservation Details</h2>
          <Select
            name="selectedReservation"
            onChange={handleReservationSelection}
          >
            <option value="">SELECT A RESERVATION</option>
            {reservations.map((reservation) => (
              <option
                key={reservation.reservation_id}
                value={reservation.reservation_id}
              >
                {reservation.user?.profile?.profile_firstName}{" "}
                {reservation.user?.profile?.profile_lastName} (
                {moment.utc(reservation.reservation_date).format("DD-MM-YYYY")}
                {" | "}
                {moment.utc(reservation.reservation_hour).format("HH:mm")})
              </option>
            ))}
          </Select>
          {selectedReservationDetails ? (
            <DetailTableContainer>
              <DetailTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>NºPeople</th>
                    <th>Table Nº</th>
                    <th>Reservation ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {
                        selectedReservationDetails.user?.profile
                          ?.profile_firstName
                      }{" "}
                      {
                        selectedReservationDetails.user?.profile
                          ?.profile_lastName
                      }
                    </td>
                    <td>{selectedReservationDetails.user?.user_email}</td>
                    <td>
                      {selectedReservationDetails.user?.profile?.profile_phone}
                    </td>
                    <td>
                      {moment
                        .utc(selectedReservationDetails.reservation_date)
                        .format("DD-MM-YYYY")}
                      {" | "}
                      {moment
                        .utc(selectedReservationDetails.reservation_hour)
                        .format("HH:mm")}
                    </td>
                    <td>{selectedReservationDetails.reservation_numPeople}</td>
                    <td>
                      {
                        selectedReservationDetails.restaurantTable
                          .restaurantTable_number
                      }
                    </td>
                    <td>{selectedReservationDetails.user?.user_id}</td>

                    <td>
                      <Input
                        type="number"
                        value={
                          updatedReservations[
                            selectedReservationDetails.reservation_id
                          ] || ""
                        }
                        onChange={(e) =>
                          handleReservationChange(
                            selectedReservationDetails.reservation_id,
                            parseInt(e.target.value)
                          )
                        }
                        placeholder="Update people"
                      />
                      <UpdateBtn
                        onClick={() =>
                          handleReservationUpdate(
                            selectedReservationDetails.reservation_id
                          )
                        }
                      >
                        Update
                      </UpdateBtn>
                    </td>
                    <td>
                      <RemoveBtn
                        onClick={() =>
                          handleRemove(
                            selectedReservationDetails.reservation_id
                          )
                        }
                      >
                        Remove
                      </RemoveBtn>
                    </td>
                  </tr>
                </tbody>
              </DetailTable>
            </DetailTableContainer>
          ) : (
            <p>No reservation selected</p>
          )}

          <AllReservations>
            <h2>Done Reservations</h2>
            {doneReservations.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Date</th>
                      <th>NºPeople</th>
                      <th>Table Nº</th>
                      <th>Bill</th>
                      <th>User ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {doneReservations.map((doneReservation) => (
                      <tr key={doneReservation.reservation_id}>
                        <td>
                          {doneReservation.user?.profile?.profile_firstName}{" "}
                          {doneReservation.user?.profile?.profile_lastName ||
                            "-"}
                        </td>
                        <td>{doneReservation.user?.user_email || "-"}</td>
                        <td>
                          {doneReservation.user?.profile?.profile_phone || "-"}
                        </td>
                        <td>
                          {moment
                            .utc(doneReservation.reservation_date)
                            .format("DD-MM-YYYY")}
                          {" | "}
                          {moment
                            .utc(doneReservation.reservation_hour)
                            .format("HH:mm")}
                        </td>
                        <td>{doneReservation.reservation_numPeople}</td>
                        <td>
                          {
                            doneReservation.restaurantTable
                              .restaurantTable_number
                          }
                        </td>
                        <td>
                          {doneReservation.bill?.bill_total
                            ? `${doneReservation.bill.bill_total}€`
                            : "-"}
                        </td>
                        <td>{doneReservation.reservation_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            ) : (
              <p>No reservations yet</p>
            )}
          </AllReservations>
        </Main>
      </Container>
    </>
  );
}

export default ReservationPage;
