import { useEffect, useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { useApp } from "../../hooks/useApp";
import {
  getCostumerDetails,
  getCostumers,
  removeCostumer,
} from "../../services/costumer";
import { Costumer } from "../../models/costumer";
import { Reservation } from "../../models/reservation";

import Navbar from "../../components/Navbar";
import {
  AllCostumers,
  DetailTable,
  DetailTableContainer,
  Main,
  Menu,
  RemoveBtn,
  Select,
  Table,
  TableContainer,
  Top,
} from "./styles";
import { Container } from "../../styles/styles";

import { AiOutlineMenu } from "react-icons/ai";

function CostumerPage() {
  const { costumers, isLoggedIn, dispatch } = useApp();
  const [selectedCostumerDetails, setSelectedCostumerDetails] =
    useState<Costumer>();
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    getCostumers()
      .then((costumers) =>
        dispatch({ type: "SET_COSTUMER", payload: costumers })
      )
      .catch((error) => console.log(error));
  }, [dispatch]);

  const handleRemove = async (costumer_id: string) => {
    try {
      await removeCostumer(costumer_id);
      dispatch({ type: "REMOVE_RESERVATION", payload: costumer_id });
      getCostumers()
        .then((costumers) =>
          dispatch({ type: "SET_COSTUMER", payload: costumers })
        )
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCostumerSelection = async (
    event: FormEvent<HTMLSelectElement>
  ) => {
    const costumerId = event.currentTarget.value;
    if (costumerId) {
      try {
        const costumerDetails = await getCostumerDetails(costumerId);
        setSelectedCostumerDetails(costumerDetails);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSelectedCostumerDetails(undefined);
    }
  };

  return (
    <>
      <Container>
        <Navbar />
        <Main>
          <Top>
            <Menu>
              <AiOutlineMenu />
            </Menu>
            <div>
              <p>Welcome back</p>
              <small>Admin</small>
            </div>
          </Top>
          <h1>Costumers</h1>

          <AllCostumers>
            <h2>All Costumers</h2>
            {costumers.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {costumers.map((costumer) => (
                      <tr key={costumer.costumer_id}>
                        <td>
                          {costumer.user?.profile?.profile_firstName}{" "}
                          {costumer.user?.profile?.profile_lastName}
                        </td>
                        <td>{costumer.user?.user_email}</td>
                        <td>{costumer.user?.profile?.profile_phone}</td>

                        <td>
                          <RemoveBtn
                            onClick={() => handleRemove(costumer.costumer_id)}
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
              <p>There are no costumers</p>
            )}
          </AllCostumers>

          <br />
          <h2>Costumer Details</h2>
          <Select name="selectedCostumer" onChange={handleCostumerSelection}>
            <option value="">SELECT A COSTUMER</option>
            {costumers.map((costumer) => (
              <option key={costumer.costumer_id} value={costumer.costumer_id}>
                {costumer.user?.profile?.profile_firstName}{" "}
                {costumer.user?.profile?.profile_lastName}
              </option>
            ))}
          </Select>

          {selectedCostumerDetails ? (
            <DetailTableContainer>
              <DetailTable>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {selectedCostumerDetails.user?.profile?.profile_firstName}{" "}
                      {selectedCostumerDetails.user?.profile?.profile_lastName}
                    </td>
                    <td>{selectedCostumerDetails.user?.user_email}</td>
                    <td>
                      {selectedCostumerDetails.user?.profile?.profile_phone}
                    </td>

                    <td>
                      <RemoveBtn
                        onClick={() =>
                          handleRemove(selectedCostumerDetails.costumer_id)
                        }
                      >
                        Remove
                      </RemoveBtn>
                    </td>
                  </tr>
                </tbody>
              </DetailTable>
              <DetailTable>
                <thead>
                  <tr>
                    <th>Reservation ID</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCostumerDetails.user?.reservation.map(
                    (reservation: Reservation) => (
                      <tr key={reservation.reservation_id}>
                        <td>{reservation.reservation_id}</td>
                        <td>
                          {moment
                            .utc(reservation.reservation_date)
                            .format("DD-MM-YYYY")}{" "}
                          |{" "}
                          {moment
                            .utc(reservation.reservation_hour)
                            .format("HH:mm")}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </DetailTable>
            </DetailTableContainer>
          ) : (
            <p>No costumer selected</p>
          )}
        </Main>
      </Container>
    </>
  );
}

export default CostumerPage;
