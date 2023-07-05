import styled from "styled-components";

export const Main = styled.main`
  margin: 1.4rem 6rem 0 0;

  @media (max-width: 768px) {
    margin-top: 0.8rem;
    padding: 0 1rem 0 2rem;
  }
`;

export const AllUsers = styled.div`
  margin-top: 2rem;

  h2 {
    margin-bottom: 0.8rem;
  }
`;

export const TableContainer = styled.div`
  max-height: 300px;
  min-height: 300px;
  overflow-y: auto;
  background-color: transparent;
  box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
  border-radius: 2rem;
  transition: all 300 ease;
  :hover {
    box-shadow: none;
  }

  @media (max-width: 768px) {
    position: relative;
    margin: 3rem 0 0 0;
    width: 100%;
  }
`;

export const Table = styled.table`
  background-color: #fff;
  width: 100%;
  min-height: 300px;
  padding: 1.8rem;
  text-align: center;

  td {
    height: 2.8rem;
    border-bottom: 1px solid rgba(132, 139, 200, 0.18);
    color: #677483;

    :first-child {
      text-transform: capitalize;
    }
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 1200px) {
    width: 83vw;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

export const RemoveBtn = styled.button`
  border: none;
  outline: none;
  background-color: #7380ec;
  color: white;
  border-radius: 0.3rem;
  padding: 0.5rem;
  cursor: pointer;
`;

export const Select = styled.select`
  font-size: 1em;
  padding: 0.6em 1em;
  margin-right: 2px;
  border: none;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  text-transform: capitalize;
`;

export const DetailTableContainer = styled.div`
  margin-top: 1rem;
  min-height: 130px;
  background-color: transparent;
  border-radius: 2rem;
  box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
  transition: all 300 ease;
  :hover {
    box-shadow: none;
  }
`;

export const DetailTable = styled.table`
  background-color: #fff;
  width: 100%;
  border-radius: 2rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 1.8rem;
  text-align: center;
  margin-bottom: 1rem;

  td {
    height: 2.8rem;
    border-bottom: 1px solid rgba(132, 139, 200, 0.18);
    color: #677483;
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 1200px) {
    width: 83vw;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

export const UpdateBtn = styled.button`
  border: none;
  outline: none;
  font-size: 1em;
  background-color: #7380ec;
  color: white;
  padding: 0.6em 1em;
  cursor: pointer;
`;

export const Top = styled.div`
  display: flex;
  justify-content: end;
  gap: 2rem;
  text-align: right;
  padding: 0 3rem 0;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    align-items: center;
    padding: 0 3rem 0 0;
    height: 4.6rem;
    background-color: white;
    width: 100%;
    margin: 0;
    z-index: 2;
    box-shadow: 0 1rem 1rem rgba(132, 139, 200, 0.18);
  }
`;

export const Menu = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: inline-block;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 2rem;
    position: absolute;
    left: 1rem;
  }
`;
