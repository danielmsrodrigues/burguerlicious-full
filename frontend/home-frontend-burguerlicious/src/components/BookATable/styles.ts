import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
  align-items: center;
  margin: 0 auto;
  background-color: #c31e26;
  overflow: hidden;
`;

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 45vh;
  text-align: center;
  padding: 5rem 0;
  position: relative;
`;

export const Info = styled.div`
  color: #ffc236;
`;

export const Heading = styled.h4`
  font-size: 4rem;
  @media (width < 980px) {
    font-size: 3rem;
  }

  @media (width < 480px) {
    font-size: 2rem;
  }
`;

export const Sub = styled.p`
  font-size: 1.2rem;
`;

export const Button = styled.button`
  background-color: #ffc236;
  color: #c31e26;
  border: none;
  width: 9rem;
  height: 2.5rem;
  margin: 2rem 0 0;
  border-radius: 3.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.96);
  }
`;

export const CircleLeft = styled.div`
  position: absolute;
  bottom: -25rem;
  left: -40rem;
  width: 45rem;
  height: 45rem;
  border-radius: 50%;
  z-index: 0;
  background-color: #ca3429;
`;

export const CircleRight = styled.div`
  position: absolute;
  top: -25rem;
  right: -40rem;
  width: 45rem;
  height: 45rem;
  border-radius: 50%;
  z-index: 0;
  background-color: #ca3429;
`;
