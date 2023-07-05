import { NavLink } from "react-router-dom";
import "@fontsource/bebas-neue";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 7rem;
  background-color: #2f2841;
  font-family: "Bebas Neue", sans-serif;
`;

export const StyledNavLink = styled(NavLink)`
  color: white;
  font-size: 1.5rem;
  letter-spacing: 1px;
  margin: 0 1rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    background-color: #ff725e;
    height: 4px;
    width: 100%;
    left: 0;
    bottom: -2px;
    transition: 0.2s ease;
    transform: scaleX(0);
  }

  &:hover::after {
    transform: scaleX(1);
  }

  @media (max-width: 1023px) {
    font-size: 1.2rem;
  }
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 2;
  position: relative;
  height: 100%;

  @media (max-width: 1023px) {
    margin: 0 1rem;
  }
`;

export const Button = styled.button`
  background-color: #ff725e;
  font-family: "Bebas Neue", sans-serif;
  color: #fff;
  border: none;
  width: 9rem;
  height: 2.5rem;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 10px 40px -12px rgb(255, 114, 94);
  }

  &:active {
    transform: scale(0.96);
  }

  @media (max-width: 1023px) {
    font-size: 1.2rem;
    width: 7rem;
  }
`;
