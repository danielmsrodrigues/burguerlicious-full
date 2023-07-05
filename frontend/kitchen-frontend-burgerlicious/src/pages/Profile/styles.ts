import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #201b2c;
`;

export const Card = styled.div`
  width: 35rem;
  height: 32rem;
  margin: 0 auto;
  background-color: #555;
  border-radius: 8px;
  z-index: 1;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -40%);

  .tools {
    display: flex;
    align-items: center;
    padding: 9px;
  }

  .circle {
    padding: 0 4px;
  }

  .box {
    display: inline-block;
    align-items: center;
    width: 10px;
    height: 10px;
    padding: 1px;
    border-radius: 50%;
  }

  .red {
    background-color: #ff605c;
  }

  .yellow {
    background-color: #ffbd44;
  }

  .green {
    background-color: #00ca4e;
  }

  &:hover {
    box-shadow: 0px 10px 40px -12px #494949;
  }

  @media (max-width: 1023px) {
    width: 20rem;
    height: 23rem;
  }
`;

export const Content = styled.div`
  color: black;
  height: 100%;
  margin-top: 0.3rem;
`;

export const Line = styled.div`
  background-color: white;
  width: 80%;
  margin: 0 auto;
  padding: 0.5rem;
  border-radius: 20px;
  margin-bottom: 1rem;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }

  p {
    margin: 0;

    @media (max-width: 1023px) {
      font-size: 0.9rem;
    }
  }

  span {
    color: #9c9c9c;
    font-family: "Bebas Neue", sans-serif;
    font-size: 1.2rem;

    @media (max-width: 1023px) {
      font-size: 1rem;
    }
  }

  @media (max-width: 1023px) {
    padding: 0 1rem;
  }
`;

export const Loading = styled.div`
  left: 50%;
  top: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
`;

export const Reset = styled(Link)`
  color: #9c9c9c;
  font-family: "Bebas Neue";
  font-size: 1rem;
  text-decoration: underline;
`;
