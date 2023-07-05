import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { getOrders, updateOrder } from "../../services/orders";
import { Orders } from "../../models/orders";

import Navbar from "../../components/Navbar";
import {
  Button,
  Container,
  ItemName,
  Loading,
  RecentOrders,
  SVG,
  Status,
  Table,
  TableContainer,
  TableDescription,
  Title,
  Wrapper,
} from "./styles";

import { RotatingLines } from "react-loader-spinner";
import jwtDecode from "jwt-decode";

function OrderPage() {
  const { isLoggedIn, logout, dispatch } = useApp();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Orders[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken: any = jwtDecode(token);
      const requiredPermission = "319010fe-0be4-4f71-8b33-2a5efe1fcda5";

      if (decodedToken.permission_id !== requiredPermission) {
        logout();
      }
    }
  }, []);

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const orders = await getOrders();
      setOrders(orders);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateOrder = async (order_id: string) => {
    try {
      await updateOrder(order_id);
      dispatch({ type: "UPDATE_STATUS", payload: order_id });
      const updatedOrders = orders.filter(
        (order) => order.order_id !== order_id
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Navbar />
        <Wrapper>
          <RecentOrders className="recent-order">
            {isLoading ? (
              <Loading>
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="40"
                  visible={true}
                />
              </Loading>
            ) : (
              <>
                <Title>Active Orders</Title>
                <TableContainer>
                  <Table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Notes</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length === 0 ? (
                        <tr>
                          <td rowSpan={4}>-</td>
                          <td rowSpan={4}>-</td>
                          <td rowSpan={4}>-</td>
                          <td rowSpan={4}>-</td>
                        </tr>
                      ) : (
                        orders.map((order) => (
                          <tr key={order.order_id}>
                            <TableDescription>
                              <ItemName>
                                {order.menuItem.menuItem_name}
                              </ItemName>
                            </TableDescription>
                            <TableDescription>
                              {order.order_itemQuantity}
                            </TableDescription>
                            <TableDescription>
                              {order.order_notes || "-"}
                            </TableDescription>
                            <TableDescription>
                              <Status>
                                {order.order_running ? "Pending" : "Done"}
                              </Status>
                            </TableDescription>
                            <TableDescription>
                              <Button
                                onClick={() =>
                                  handleUpdateOrder(order.order_id)
                                }
                              >
                                <div className="svg-wrapper-1">
                                  <div className="svg-wrapper">
                                    <SVG
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="1em"
                                      viewBox="0 0 448 512"
                                    >
                                      <path
                                        d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                        fill="white"
                                      />
                                    </SVG>
                                  </div>
                                </div>
                                <span>MARK AS DONE</span>
                              </Button>
                            </TableDescription>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </TableContainer>
              </>
            )}
          </RecentOrders>
        </Wrapper>
      </Container>
    </>
  );
}

export default OrderPage;
