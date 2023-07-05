import styled from "styled-components";

export const Container = styled.div`
  background-color: #c31e26;
  align-items: center;
  width: 100%;
`;

export const Wrapper = styled.div`
  text-align: center;
  padding-top: 2rem;
  height: 90vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  z-index: 2;
  position: relative;
  color: #ffc236;
  line-height: 12rem;

  @media (width < 736px) {
    line-height: 10rem;
  }

  @media (width < 600px) {
    line-height: 9rem;
  }

  @media (width < 480px) {
    line-height: 6rem;
  }
`;

export const Title = styled.h1`
  font-size: 14rem;

  @media (width < 1280px) {
    font-size: 11rem;
  }

  @media (width < 980px) {
    font-size: 9rem;
  }

  @media (width < 736px) {
    font-size: 7rem;
  }

  @media (width < 600px) {
    font-size: 6rem;
  }

  @media (width < 480px) {
    font-size: 4.5rem;
  }
`;

export const SubTitle = styled.h3`
  font-size: 9.2rem;

  @media (width < 736px) {
    font-size: 7rem;
  }

  @media (width < 600px) {
    font-size: 6rem;
  }

  @media (width < 480px) {
    font-size: 4rem;
  }
`;

export const Image = styled.img`
  top: -23rem;
  width: 70%;
  height: auto;
  z-index: 999;
  position: relative;

  @media (width < 1280px) {
    width: 64%;
    top: -14rem;
  }

  @media (width < 736px) {
    top: -10rem;
  }

  @media (width < 600px) {
    width: 90%;
  }

  @media (width < 480px) {
    top: -6rem;
  }
`;
