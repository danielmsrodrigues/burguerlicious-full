import styled from "styled-components";

export const Container = styled.div`
  height: 87.9vh;
  width: 100%;
  background-color: #17181e;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0 0;
  height: auto;
`;

export const Details = styled.div`
  text-align: center;
  width: 100%;
`;

export const Option = styled.option`
  text-transform: capitalize;
`;

export const Choose = styled.select`
  padding: 0.5rem;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  margin-right: 0.5rem;

  @media (max-width: 1023px) {
    font-size: 0.9rem;
  }
`;

export const Amount = styled.input`
  padding: 0.5rem;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  outline: none;
  width: 3rem;
  margin-right: 0.5rem;

  @media (max-width: 1023px) {
    font-size: 0.9rem;
  }
`;

export const Notes = styled.input`
  padding: 0.5rem;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  outline: none;

  @media (max-width: 1023px) {
    font-size: 0.9rem;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #20547e;
  border-color: #0d6efd;
  display: inline-block;
  font-weight: bold;
  line-height: 1.5;
  text-align: center;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 16px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  :hover {
    color: #fff;
    background-color: #0b5ed7;
    border-color: #0a58ca;
  }

  @media (max-width: 1023px) {
    font-size: 0.9rem;
    display: block;
    margin: 0 auto;
  }
`;

export const OrderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  margin-top: 3rem;
  max-height: 60vh;

  @media (max-width: 1023px) {
    display: block;
  }
`;
