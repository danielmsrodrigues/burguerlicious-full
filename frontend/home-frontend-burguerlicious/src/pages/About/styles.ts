import styled from "styled-components";

export const Container = styled.div`
  height: calc(100vh - 5rem);
  width: 100%;
`;

export const Wrapper = styled.div`
  height: 100%;
  text-align: center;
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 0;
  text-align: center;
  position: relative;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-top: 2rem;
`;

export const Body = styled.p`
  font-size: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (width < 980px) {
    font-size: 1rem;
    margin: 0 1rem;
  }
`;

export const Image = styled.img`
  width: 100%;
  object-fit: cover;
  height: 12em;
  border-radius: 7.5rem;
`;

export const ImageWrapper = styled.div`
  padding: 2rem 0 0;
  margin: 0 auto;
  width: 60%;
`;
