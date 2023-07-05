import { Link } from "react-router-dom";
import styled from "styled-components";

export const Main = styled.main`
  margin-top: 1.4rem;

  @media (max-width: 768px) {
    margin-top: 0.8rem;
    padding: 0 8rem;
  }
`;

export const DateTime = styled.div`
  display: inline-block;
  background-color: rgba(132, 139, 200, 0.18);
  border-radius: 0.4rem;
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
`;

export const Small = styled.small`
  color: #7d8da1;
  margin-top: 1.6rem;
  display: block;
`;

export const Insights = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 0;
  }
`;

export const Cards = styled.div`
  background-color: #fff;
  padding: 1.8rem;
  border-radius: 2rem;
  margin-top: 1rem;
  box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
  transition: all 300 ease;

  :hover {
    box-shadow: none;
  }

  h3 {
    margin: 1rem 0 0.6rem;
  }
`;

export const Icon = styled.span`
  background-color: #7380ec;
  padding: 0.5rem;
  border-radius: 50%;
  color: #fff;
  font-size: 2rem;
  display: flex;
  width: 3rem;
  align-items: center;
  justify-content: center;
`;

export const RecentReservations = styled.div`
  margin-top: 2rem;

  h2 {
    margin-bottom: 0.8rem;
  }

  @media (max-width: 1200px) {
    width: 94%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin: 2rem 0 0 8.8rem;
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
  border-radius: 2rem;
  padding: 1.8rem;
  box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
  text-align: center;
  transition: all 300 ease;

  :hover {
    box-shadow: none;
  }

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

export const Nav = styled(Link)`
  text-align: center;
  display: block;
  margin: 1rem auto;
  color: #7380ec;
`;

export const Right = styled.div`
  margin-top: 1.4rem;

  @media (max-width: 768px) {
    width: 94%;
    margin: 0 auto 4rem;
  }
`;

export const Top = styled.div`
  display: flex;
  justify-content: end;
  gap: 2rem;
  text-align: right;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    align-items: center;
    padding: 0 3rem;
    height: 4.6rem;
    background-color: white;
    width: 100%;
    margin-right: 0;
    z-index: 2;
    box-shadow: 0 1rem 1rem rgba(132, 139, 200, 0.18);
  }
`;

export const RecentUpdates = styled.div`
  margin-top: 1rem;

  h2 {
    margin-bottom: 0.8rem;
  }
`;

export const Updates = styled.div`
  background-color: #fff;
  padding: 1.8rem;
  border-radius: 2rem;
  box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
  transition: all 300 ease;

  :hover {
    box-shadow: none;
  }
`;

export const Update = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 1rem;
  margin-bottom: 2rem;

  :last-child {
    margin: 0;
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
