import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { useApp } from "../../hooks/useApp";
import { Reservation } from "../../models/reservation";
import {
  createReservation,
  getReservations,
  removeReservation,
} from "../../services/reservations";

import Navbar from "../../components/Navbar";

import {
  Button,
  Calendar,
  Cancel,
  Card,
  Center,
  Choose,
  Container,
  Empty,
  Image,
  ImageContainer,
  List,
  ListText,
  ListWrapper,
  Loader,
  Number,
  SubTitle,
  Text,
  Time,
  Title,
  Welcome,
  Wrapper,
} from "./styles";

import { BsFillPersonFill } from "react-icons/bs";

import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReservationPage() {
  const navigate = useNavigate();
  const { user, isLoggedIn, dispatch } = useApp();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservationDate, setReservationDate] = useState("");
  const [reservationHour, setReservationHour] = useState("");
  const [numPeople, setNumPeople] = useState(1);
  const [, setFullyBookedTimeSlots] = useState<string[]>([]);
  const [loading] = useState(false);

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const reservations = await getReservations();
      setReservations(reservations);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelReservation = async (reservation_id: string) => {
    try {
      await removeReservation(reservation_id);
      dispatch({ type: "REMOVE_RESERVATION", payload: reservation_id });
      const updatedReservations = reservations.filter(
        (reservation) => reservation.reservation_id !== reservation_id
      );
      setReservations(updatedReservations);
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  const notify = () =>
    toast.success("Reservation Canceled!", {
      position: "bottom-right",
      autoClose: 4000,
      pauseOnHover: false,
      draggable: false,
    });

  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReservationDate(event.target.value);
  };

  const handleHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReservationHour(event.target.value);
  };

  const handleNumPeople = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumPeople(parseInt(event.target.value, 10));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (reservationDate && reservationHour && numPeople) {
      try {
        const date = moment
          .utc(`${reservationDate}T${reservationHour}`)
          .toISOString();
        const hour = moment
          .utc(`${reservationDate}T${reservationHour}:00`)
          .toISOString();

        const newReservation = await createReservation(date, hour, numPeople);
        setReservations([...reservations, newReservation]);

        setFullyBookedTimeSlots((prevBookedTimeSlots) => [
          ...prevBookedTimeSlots,
          newReservation.reservation_hour.toString(),
        ]);

        dispatch({ type: "CREATE_RESERVATION", payload: newReservation });
        success("Reservation Made!");
      } catch (error: any) {
        console.error("Error creating reservation:", error);
        const errorMessage = error.message || "An error occurred.";
        notifyError(errorMessage);
      }
    }
  };

  const success = (message: string) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 4000,
      pauseOnHover: false,
      draggable: false,
    });

  const notifyError = (errorMessage: string) => {
    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 4000,
      pauseOnHover: false,
      draggable: false,
    });
  };

  const minDate = moment().format("YYYY-MM-DD");

  const hours = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ];

  const hourOptions = [
    <option key="default" value="" disabled>
      Select an hour
    </option>,
    ...hours.map((hour) => {
      const isPastHour = moment().isSameOrAfter(
        moment(`${reservationDate}T${hour}`, "YYYY-MM-DDTHH:mm"),
        "minute"
      );

      const disabled = isPastHour;

      return (
        <option key={hour} value={hour} disabled={disabled}>
          {hour}
        </option>
      );
    }),
  ];

  return (
    <>
      <Navbar />

      {loading ? (
        <Loader>
          <Center>
            <Oval
              height={80}
              width={80}
              color="#430a0e"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#c31e26"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </Center>
        </Loader>
      ) : (
        <>
          <Container>
            <Wrapper>
              {user && (
                <Welcome>Welcome {user.profile.profile_firstName}</Welcome>
              )}
              <Text>
                <Title>Eat the best burgers you have ever eaten</Title>
                <SubTitle>Get your chance to try them</SubTitle>
              </Text>

              <Choose>
                {" "}
                <div>
                  <form onSubmit={handleSubmit}>
                    <Calendar
                      type="date"
                      id="calendar"
                      value={reservationDate}
                      onChange={handleDate}
                      required
                      min={minDate}
                    />
                    <Time
                      id="time"
                      value={reservationHour}
                      onChange={handleHour}
                      required
                    >
                      {hourOptions}
                    </Time>
                    <Number
                      type="number"
                      id="number"
                      value={numPeople}
                      onChange={handleNumPeople}
                      required
                      min="1"
                      max="20"
                    />
                    <Button type="submit">Make Reservation</Button>
                  </form>

                  <ToastContainer pauseOnFocusLoss={false} />
                </div>
              </Choose>
              <List>
                <ListText>Your Reservations</ListText>
                {reservations.length > 0 ? (
                  <ListWrapper>
                    {reservations.map((reservation) => (
                      <div key={reservation.reservation_id}>
                        <Card>
                          <div>
                            <p>
                              {moment
                                .utc(reservation.reservation_date)
                                .format("DD-MM-YYYY")}
                            </p>
                            <p>
                              {moment
                                .utc(reservation.reservation_hour)
                                .format("HH:mm")}
                            </p>
                            <p>
                              <BsFillPersonFill />
                              {reservation.reservation_numPeople}
                            </p>

                            <Cancel
                              onClick={() =>
                                handleCancelReservation(
                                  reservation.reservation_id
                                )
                              }
                            >
                              Cancel
                            </Cancel>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </ListWrapper>
                ) : (
                  <Empty>No reservations yet</Empty>
                )}
              </List>
            </Wrapper>
            <ImageContainer>
              <Image src="/assets/burger-auth.jpg" alt="Burguer and fries" />
            </ImageContainer>
          </Container>
          <ToastContainer pauseOnFocusLoss={false} />
        </>
      )}
    </>
  );
}

export default ReservationPage;
