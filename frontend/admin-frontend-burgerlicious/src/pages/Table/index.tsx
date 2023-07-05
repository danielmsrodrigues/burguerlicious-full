import { useEffect, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { RestaurantTable } from "../../models/restaurantTable";
import {
  createTable,
  getTables,
  removeTable,
} from "../../services/restaurantTable";

import Navbar from "../../components/Navbar";
import {
  AllTables,
  CreateBtn,
  Form,
  Input,
  Main,
  MenuBtn,
  RemoveBtn,
  Table,
  TableContainer,
  Top,
} from "./styles";
import { Container } from "../../styles/styles";

import { AiOutlineMenu } from "react-icons/ai";

function TablePage() {
  const { restaurantTables, isLoggedIn, dispatch } = useApp();
  const [, setTable] = useState<RestaurantTable>();
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    getTables()
      .then((restaurantTables) =>
        dispatch({ type: "SET_TABLES", payload: restaurantTables })
      )
      .catch((error) => console.log(error));
  }, [dispatch]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const restaurantTable_number = target.elements.namedItem(
      "restaurantTable_number"
    ) as HTMLInputElement;

    try {
      const newTable = await createTable(
        parseInt(restaurantTable_number.value)
      );
      setTable(newTable);

      dispatch({ type: "CREATE_TABLE", payload: newTable });
      getTables()
        .then((tables) => dispatch({ type: "SET_TABLES", payload: tables }))
        .catch((error) => console.log(error));
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleRemove = async (restaurantTable_id: string) => {
    try {
      await removeTable(restaurantTable_id);
      dispatch({ type: "REMOVE_TABLE", payload: restaurantTable_id });
      getTables()
        .then((restaurantTables) =>
          dispatch({ type: "SET_TABLES", payload: restaurantTables })
        )
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const sortedTables = [...restaurantTables].sort(
    (a, b) => a.restaurantTable_number - b.restaurantTable_number
  );

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

          <h1>Tables</h1>

          <Form onSubmit={handleSubmit}>
            <Input
              placeholder="Table number"
              type="number"
              name="restaurantTable_number"
              id="restaurantTable_number"
            />
            <CreateBtn type="submit">Create</CreateBtn>
          </Form>

          <AllTables>
            <h2>All Tables</h2>
            {sortedTables.length > 0 ? (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <th>Table Number</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTables.map((restaurantTable) => (
                      <tr key={restaurantTable.restaurantTable_id}>
                        <td>{restaurantTable.restaurantTable_number}</td>
                        <td>
                          <RemoveBtn
                            onClick={() =>
                              handleRemove(restaurantTable.restaurantTable_id)
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
              <p>No tables yet</p>
            )}
          </AllTables>
        </Main>
      </Container>
    </>
  );
}

export default TablePage;
