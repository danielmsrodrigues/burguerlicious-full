import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 100%;
  max-width: 100%;
  background-color: white;
  z-index: 1;
  bottom: 1;
`;

export const Wrapper = styled.div`
  position: relative;
  max-width: 1500px;
  padding: 4rem 0;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  z-index: 1;
  margin: 0 1rem;
`;

export const Logo = styled.h3`
  font-size: 2rem;
`;

export const Info = styled.div`
  width: 70%;
  display: grid;
  margin-left: auto;
  grid-template-columns: auto auto auto;
  column-gap: 3rem;
  justify-content: right;
  letter-spacing: 1px;

  @media (width < 1280px) {
    width: 50%;
  }

  @media (width < 980px) {
    grid-template-columns: auto auto;

    ul {
      text-align: right;
    }
  }
`;

export const Contacts = styled.div`
  @media (width < 980px) {
    display: none;
  }
`;

export const Navigate = styled(Link)`
  text-decoration: underline;
  color: black;
`;

export const Email = styled.a`
  text-decoration: underline;
  color: black;
`;
