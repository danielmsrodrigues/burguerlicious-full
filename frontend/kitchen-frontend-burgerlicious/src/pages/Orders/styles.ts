import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #201b2c;
`;

export const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RecentOrders = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

export const Title = styled.h2`
  margin-bottom: 2rem;
  color: white;
  text-align: center;
`;

export const TableContainer = styled.div`
  max-height: 60vh;
  overflow: auto;
  border-radius: 2rem;
  margin: 0 auto;

  ::-webkit-scrollbar {
    width: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  ::-webkit-scrollbar-track {
    background-color: rgb(47, 41, 65);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  @media (max-width: 1023px) {
    width: 95%;
    max-height: 50vh;
  }
`;

export const Table = styled.table`
  background-color: #fff;
  width: 100%;
  padding: 1.8rem;
  text-align: center;
  box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
  transition: all 300ms ease;

  &:hover {
    box-shadow: none;
  }

  th {
    @media (max-width: 1023px) {
      font-size: 0.8rem;
    }
  }
`;

export const TableDescription = styled.td`
  height: 2.8rem;
  width: 20%;
  border-bottom: 1px solid rgba(132, 139, 200, 0.18);
  color: #677483;

  @media (max-width: 1023px) {
    font-size: 0.8rem;
  }
`;

export const ItemName = styled.span`
  text-transform: capitalize;
`;

export const Status = styled.span`
  color: green;
  font-weight: bold;
`;

export const Button = styled.button`
  font-family: inherit;
  cursor: pointer;
  background: rgb(47, 41, 65);
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;

  :hover {
    background-color: green;
  }

  :hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  :hover svg {
    transform: translateX(4em) scale(1.1);
  }

  :hover span {
    transform: translateX(9em);
  }

  span {
    display: block;
    margin-left: 0.5em;
    transition: all 0.3s ease-in-out;
  }

  :active {
    transform: scale(0.95);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }

  @media (max-width: 1023px) {
    font-size: 0.4rem;
  }
`;

export const SVG = styled.svg`
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
`;

export const Loading = styled.div`
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`;
