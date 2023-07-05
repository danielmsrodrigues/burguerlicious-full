import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  background-color: #c31e26;
`;

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 2;
  position: relative;
  height: 10rem;

  @media screen and (max-width: 768px) {
    margin: 0 2rem;
  }
`;

export const Logo = styled(NavLink)`
  color: #ffc236;
  font-size: 1.5rem;
  position: relative;
`;

export const StyledNavLinkContainer = styled.div<{ isMobileMenuOpen: boolean }>`
  display: flex;
  margin-right: 2rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const StyledNavLink = styled(NavLink)`
  color: #ffc236;
  font-size: 1.5rem;
  margin: 0 1rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    background-color: #ffc236;
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
`;

export const HamburgerButton = styled.button`
  display: none;
  color: #ffc236;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const CloseButton = styled.span`
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const MobileNav = styled.div`
  display: none;
  background-color: #c31e26;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 50%;
  height: 100%;
  padding: 1rem;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 3;
  position: fixed;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const MobileNavLink = styled(NavLink)`
  color: #ffc236;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: #ffc236;
  color: #c31e26;
  border: none;
  width: 9rem;
  height: 2.5rem;
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

export const ButtonContainer = styled.div`
  margin-left: 2rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const MobileNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  padding: 10rem 0 0;
`;

export const MobileNavLogout = styled.button`
  background-color: #ffc236;
  color: #c31e26;
  border: none;
  width: 9rem;
  height: 2.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.2s ease;
  position: absolute;
  bottom: 2rem;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.96);
  }
`;
