import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #17181e;
`;

export const Wrapper = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 1023px) {
    display: block;
  }

  @media (max-width: 768px) {
    margin: 4rem auto 0;
  }
`;

export const Checkout = styled.div`
  max-width: fit-content;
  padding: 1rem 2rem;
  border: 1px solid rgb(231, 229, 232);
  border-radius: 0.45rem;
  height: fit-content;
  background-color: white;

  @media (max-width: 1023px) {
    margin: 0 auto;
  }
`;

export const Titles = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 0.9rem;
`;

export const Details = styled.span`
  font-weight: normal;
  margin-right: 4rem;
`;

export const Submit = styled.button`
  background-color: #ffb21d;
  border: none;
  outline: none;
  height: 2.5rem;
  width: auto;
  padding: 0 2rem;
  color: white;
  font-size: 1rem;
  border-radius: 0.45rem;
  cursor: pointer;

  &:hover {
    background-color: #ffc046;
  }
`;

export const Choose = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  margin-right: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const Nif = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  outline: none;
`;

export const TableContainer = styled.div`
  max-width: 30vw;
  max-height: 50vh;

  padding: 1rem 2rem;
  border: 1px solid rgb(231, 229, 232);
  border-radius: 0.45rem;
  overflow: auto;
  background-color: white;

  @media (max-width: 1023px) {
    margin: 1rem auto 0;
    max-width: 70vw;
    max-height: 30vh;
  }
`;

export const Table = styled.table`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
`;

export const TableHeader = styled.th`
  font-size: 1rem;
  line-height: 1.5;
  color: #212529;
  border-collapse: collapse;
  box-sizing: border-box;
  text-align: inherit;
  padding: 0.75rem;
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
`;

export const TableRow = styled.tr`
  border-top: 1px solid black;
`;

export const TableDescription = styled.td`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  border-collapse: collapse;
  box-sizing: border-box;
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  text-transform: capitalize;
`;
