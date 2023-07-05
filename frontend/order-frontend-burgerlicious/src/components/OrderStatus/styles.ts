import styled from "styled-components";

export const StyledButton = styled.button`
  cursor: pointer;
  outline: 0;
  color: #cdcdcd;
  background-color: #eee;
  display: inline-block;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  border: 1px solid transparent;
  padding: 6px 12px;
  margin-left: 1rem;
  font-size: 16px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  :hover {
    color: #fff;
    background-color: #c53f3f;
  }

  @media (max-width: 1023px) {
    font-size: 0.5rem;
  }
`;

export const LeftListContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  background-color: white;
  border-radius: 0.25rem;
  color: black;
  padding: 2rem;
  overflow: auto;
  max-height: 60vh;

  @media (max-width: 1023px) {
    margin: 0 auto 1rem;
    width: 70vw;
    overflow: auto;
    height: 6rem;

    h3 {
      font-size: 1rem;
    }
  }
`;

export const RightListContainer = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 0.25rem;
  color: black;
  padding: 2rem;
  overflow: auto;
  max-height: 60vh;

  @media (max-width: 1023px) {
    margin: 0 auto;
    width: 70vw;
    overflow: auto;
    height: 6rem;

    h3 {
      font-size: 1rem;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  height: 100%;
  text-align: center;

  @media (max-width: 1023px) {
    font-size: 0.8rem;
  }
`;

export const TableDescription = styled.td`
  text-transform: capitalize;
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);
`;

export const StatusPending = styled.span`
  font-weight: bold;
  color: #dc4545;
`;

export const StatusDone = styled.span`
  font-weight: bold;
  color: green;
`;
