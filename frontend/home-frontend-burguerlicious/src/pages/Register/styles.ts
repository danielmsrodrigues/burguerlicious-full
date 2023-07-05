import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  background-color: #c31e26;
`;

export const Wrapper = styled.div`
  display: flex;
  height: 82.8vh;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("/assets/burger-auth.jpg");
  background-position: center;
  background-size: cover;
  position: relative;

  @media (max-width: 760px) {
    height: 100vh;
  }
`;

export const Form = styled.div`
  position: absolute;
  width: 90%;
  max-width: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 50px 60px 70px;
  text-align: center;

  @media (max-width: 760px) {
    padding: 20px 60px 40px;
  }
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 60px;
  position: relative;

  &::after {
    content: "";
    width: 30px;
    height: 4px;
    border-radius: 3px;
    background: #c31e26;
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const InputGroup = styled.div`
  height: 400px;

  @media (max-width: 760px) {
    height: 345px;
  }
`;

export const InputField = styled.div`
  background: #eaeaea;
  margin: 15px 0;
  border-radius: 3px;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  background: transparent;
  border: 0;
  outline: 0;
  padding: 18px 15px;
  font-family: "Open Sans", sans-serif;
  font-size: 1rem;

  @media (max-width: 760px) {
    font-size: 0.7rem;
  }
`;

export const Icon = styled.span`
  margin-left: 15px;
  color: #999;
`;

export const ButtonField = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media (max-width: 760px) {
    width: 90%;
    margin: 0 auto;
  }
`;

export const Button = styled.button`
  flex-basis: 100%;
  font-size: 1.5rem;
  background: #c31e26;
  color: #ffc236;
  height: 40px;
  border-radius: 20px;
  border: 0;
  outline: 0;
  cursor: pointer;

  @media (max-width: 760px) {
    font-size: 1rem;
  }
`;

export const Login = styled.p`
  padding: 1rem 0 0;
  color: rgba(0, 0, 0, 0.7);
`;

export const LoginLink = styled(Link)`
  color: #c31e26;
`;
