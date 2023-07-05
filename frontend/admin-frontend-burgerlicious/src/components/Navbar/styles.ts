import { Link } from "react-router-dom";
import styled from "styled-components";

export const Aside = styled.aside`
  height: 100vh;

  .close {
    display: none;
  }

  @media (max-width: 768px) {
    position: fixed;
    right: 0;
    width: 9rem;
    z-index: 3;
    box-shadow: 0 2rem 3rem rgba(132, 139, 200, 0.18);
    height: 100vh;
    display: none;
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.4rem;
`;

export const Sidebar = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 86vh;
  position: relative;
  top: 3rem;

  @media (max-width: 768px) {
    height: 100vh;
  }
`;

export const Nav = styled(Link)`
  display: flex;
  color: #7d8da1;
  margin-left: 2rem;
  gap: 1rem;
  align-items: center;
  position: relative;
  height: 3.7rem;
  transition: all 300 ease;

  :hover {
    color: #7380ec;
  }

  h3 {
    @media (max-width: 1200px) {
      display: none;
    }
  }

  @media (max-width: 1550px) {
    height: 3rem;
  }
`;

export const Icon = styled.span`
  font-size: 1.6rem;
  transition: all 300 ease;

  :last-child {
    position: absolute;
    bottom: 2rem;
    width: 100%;
  }
`;

export const Logout = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;
  margin-left: 2rem;
  color: #7d8da1;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;

  :hover {
    color: #7380ec;
  }
`;

export const Logo = styled.div`
  @media (max-width: 1200px) {
    display: none;
  }
`;
