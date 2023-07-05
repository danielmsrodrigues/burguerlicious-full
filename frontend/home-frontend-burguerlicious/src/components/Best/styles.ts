import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  background-color: #fefdf9;
  z-index: 1;
  padding: 5rem 0 3rem;
`;

export const Title = styled.div`
  color: #3e3f3c;
  text-align: center;
  font-size: 3.5rem;

  @media (width < 1280px) {
    font-size: 3rem;
  }

  @media (width < 480px) {
    font-size: 2.5rem;
  }
`;

export const Content = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 5rem 0 0;
`;

export const BestContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  margin-bottom: 2rem;
  justify-items: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 80%;
  height: auto;
`;

export const Text = styled.div`
  text-align: left;
  width: 70%;
`;

export const ImageRight = styled.img`
  width: 80%;
  height: auto;
  order: 2;
`;

export const TextLeft = styled.div`
  text-align: left;
  width: 70%;
  order: 1;
  justify-self: center;
`;

export const BestTitle = styled.h3`
  font-size: 4rem;
  color: #585657;

  @media (width < 736px) {
    font-size: 3rem;
  }
`;

export const BestDescription = styled.p`
  color: #bebcbb;
  font-size: 1.2rem;
  width: 70%;

  @media (width < 736px) {
    font-size: 1rem;
  }
`;

export const BestPrice = styled.p`
  color: #6d6d6b;
  font-size: 3rem;

  @media (width < 736px) {
    font-size: 2.5rem;
  }
`;

export const BestSeller = styled.span`
  color: #c31e26;
  font-size: 1rem;
`;

export const Button = styled.button`
  background-color: #c31e26;
  border: none;
  width: 9rem;
  height: 2.5rem;
  margin: 3rem 0;
  border-radius: 3.5rem;
  cursor: pointer;
  font-size: 1.3rem;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

export const Menu = styled(Link)`
  color: #ffc236;
`;
