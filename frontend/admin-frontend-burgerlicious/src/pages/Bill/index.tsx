import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { getBill, getBillDetails } from "../../services/bill";
import { Bill } from "../../models/bill";

import Navbar from "../../components/Navbar";
import {
  AllBills,
  DetailTable,
  DetailTableContainer,
  Main,
  Menu,
  Select,
  Table,
  TableContainer,
  Top,
} from "./styles";
import { Container } from "../../styles/styles";

import { AiOutlineMenu } from "react-icons/ai";

function BillPage() {
  const { bills, isLoggedIn, dispatch } = useApp();
  const [bill, setBill] = useState<Bill>();
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    getBill()
      .then((bills) => {
        dispatch({ type: "SET_BILLS", payload: bills });
      })
      .catch((error) => console.log("Error:", error));
  }, [dispatch]);

  const handleBillSelection = async (event: FormEvent<HTMLSelectElement>) => {
    const billId = event.currentTarget.value;
    if (billId) {
      try {
        const billDetails = await getBillDetails(billId);
        setBill(billDetails);
      } catch (error) {
        console.log(error);
      }
    } else {
      setBill(undefined);
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

          <h1>Bills</h1>
          <AllBills>
            <h2>All Bills</h2>
            {bills.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Bill ID</th>
                      <th>Total</th>
                      <th>Nif</th>
                      <th>Reservation ID</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bills.map((bill) => (
                      <tr key={bill.bill_id}>
                        <td>{bill.bill_id}</td>
                        <td>{bill.bill_total}€</td>
                        <td>{bill.bill_nif ? bill.bill_nif : "-"}</td>
                        <td>{bill.reservation_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableContainer>
            ) : (
              <p>No bills yet</p>
            )}

            <br />
            <Select name="selectedBill" onChange={handleBillSelection}>
              <option value="">SELECT A BILL</option>
              {bills.map((bill) => (
                <option key={bill.bill_id} value={bill.bill_id}>
                  {bill.bill_id}
                </option>
              ))}
            </Select>

            {bill ? (
              <DetailTableContainer>
                <DetailTable>
                  <thead>
                    <tr>
                      <th>Bill ID</th>
                      <th>Total</th>
                      <th>Nif</th>
                      <th>Reservation ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{bill.bill_total}€</td>
                      <td>{bill.bill_nif ? bill.bill_nif : "-"}</td>
                      <td>{bill.reservation_id ? bill.reservation_id : "-"}</td>
                    </tr>
                  </tbody>
                </DetailTable>
              </DetailTableContainer>
            ) : (
              <p>No item selected</p>
            )}
          </AllBills>
        </Main>
      </Container>
    </>
  );
}

export default BillPage;
