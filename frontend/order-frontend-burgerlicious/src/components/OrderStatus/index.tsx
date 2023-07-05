import { useEffect, useState } from "react";

import { useApp } from "../../hooks/useApp";
import { Orders } from "../../models/orders";
import { getOrders, removeOrder } from "../../services/orders";

import {
  LeftListContainer,
  RightListContainer,
  StatusPending,
  StatusDone,
  StyledButton,
  Table,
  TableDescription,
} from "./styles";

import { ToastContainer, toast } from "react-toastify";

function OrderStatus() {
  const { dispatch } = useApp();
  const [orderList, setOrderList] = useState<Orders[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const orders = await getOrders();
      setOrderList(orders);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelOrder = async (order_id: string) => {
    try {
      await removeOrder(order_id);
      dispatch({ type: "REMOVE_ORDER", payload: order_id });
      const updatedOrders = orderList.filter(
        (orders) => orders.order_id !== order_id
      );
      setOrderList(updatedOrders);
      success("Order canceled.");
    } catch (error) {
      console.log(error);
    }
  };

  const success = (message: string) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 4000,
      pauseOnHover: false,
      draggable: false,
    });

  return (
    <>
      <LeftListContainer>
        <h3>Pending Orders</h3>

        <Table>
          <thead>
            <tr>
              <th>Table</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList
              .filter((order) => order.order_running)
              .map((order) => (
                <tr key={order.order_id}>
                  <TableDescription>
                    {order.reservation.restaurantTable.restaurantTable_number}
                  </TableDescription>
                  <TableDescription>
                    {order.menuItem.menuItem_name}
                  </TableDescription>
                  <TableDescription>
                    {order.order_itemQuantity}
                  </TableDescription>
                  <TableDescription>{order.order_notes}</TableDescription>
                  <TableDescription>
                    <StatusPending>Pending</StatusPending>
                  </TableDescription>
                  <td>
                    <StyledButton
                      onClick={() => handleCancelOrder(order.order_id)}
                    >
                      Cancel
                    </StyledButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </LeftListContainer>

      <RightListContainer>
        <h3>Completed Orders</h3>
        <Table>
          <thead>
            <tr>
              <th>Table</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Notes</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderList
              .filter((order) => !order.order_running)
              .map((order) => (
                <tr key={order.order_id}>
                  <TableDescription>
                    {order.reservation.restaurantTable.restaurantTable_number}
                  </TableDescription>
                  <TableDescription>
                    {order.menuItem.menuItem_name}
                  </TableDescription>
                  <TableDescription>
                    {order.order_itemQuantity}
                  </TableDescription>
                  <TableDescription>{order.order_notes}</TableDescription>
                  <TableDescription>
                    <StatusDone>Completed</StatusDone>
                  </TableDescription>
                </tr>
              ))}
          </tbody>
        </Table>
      </RightListContainer>
      <ToastContainer pauseOnFocusLoss={false} />
    </>
  );
}

export default OrderStatus;
