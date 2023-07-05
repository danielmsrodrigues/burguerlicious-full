import styled, { createGlobalStyle } from "styled-components";
import "@fontsource/poppins";

export default createGlobalStyle`


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

html {
  scroll-behavior: smooth;
  height: 100%;
  overflow-x: hidden;
}

body {
  width: 100vw;
  height: 100vh;
  background-color: #f6f6f9
}

a {
  text-decoration: none;
  color: black
}

ul {
  list-style: none;
}


h1{
  font-weight: 800;
  font-size: 1.8rem;
}

h2{
  font-size: 1.4rem; 
}

h3{
  font-size: .87rem
}

h4{
  font-size: .8rem
}

h5{
  font-size: .77rem
}

small{
  font-size: .75rem
}
`;

export const DashboardContainer = styled.div`
  display: grid;
  width: 96%;
  margin: 0 auto;
  gap: 1.8rem;
  grid-template-columns: 14rem auto 23rem;

  @media (max-width: 1200px) {
    width: 94%;
    grid-template-columns: 7rem auto 23rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`;

export const Container = styled.div`
  display: grid;
  width: 96%;
  margin: 0 auto;
  gap: 1.8rem;
  grid-template-columns: 14rem auto;

  @media (max-width: 1200px) {
    width: 94%;
    grid-template-columns: 7rem auto;
  }

  @media (max-width: 768px) {
    width: 100%;
    grid-template-columns: 1fr;
  }
`;
