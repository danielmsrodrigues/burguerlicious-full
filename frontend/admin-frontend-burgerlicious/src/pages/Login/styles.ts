import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #636aa1;
`;

export const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Right = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 1023px) {
    width: 0;
  }
`;

export const Left = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1023px) {
    width: 90vw;
  }
`;

export const CardLogin = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px 35px;
  background-color: #2f2841;
  border-radius: 20px;
  box-shadow: 0px 10px 40px #00000056;

  @media (max-width: 1023px) {
    width: 100%;
  }
`;

export const Form = styled.form`
  width: 80%;
  padding: 15px 0;
`;

export const LeftTitle = styled.h2`
  color: rgb(115, 128, 236);
  font-weight: 800;
  margin: 0;
`;

export const LeftSubTitle = styled.p`
  font-size: 1.2rem;
  color: white;
`;

export const TextField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0;
`;

export const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  border: none;
  border-radius: 10px;
  padding: 15px;
  background-color: #514869;
  color: #f0ffffde;
  font-size: 1rem;
  box-shadow: 0px 10px 40px #00000056;
  outline: none;
  box-sizing: border-box;

  ::placeholder {
    color: #f0ffff94;
  }
`;

export const Label = styled.label`
  color: #f0ffffde;
  bottom: 5px;
  position: relative;
`;

export const Button = styled.button`
  width: 100%;
  padding: 16px 0;
  margin: 25px 0;
  border: none;
  border-radius: 8px;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 2px;
  color: #fff;
  background-color: rgb(115, 128, 236);
  cursor: pointer;
  box-shadow: 0px 10px 40px -12px #9ba3e7;
`;

export const Image = styled.img`
  width: 30vw;

  @media (max-width: 1023px) {
    display: none;
  }
`;

export const ErrorMessage = styled.p`
  color: white;
  text-align: center;
`;

export const RegisterP = styled.p`
  color: white;
`;

export const RegisterLink = styled(Link)`
  color: rgb(115, 128, 236);
`;
