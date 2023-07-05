import { createGlobalStyle } from "styled-components";
import "@fontsource/bebas-neue";
import "@fontsource-variable/open-sans";

export default createGlobalStyle`


*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Bebas Neue', sans-serif;
}

html {
  scroll-behavior: smooth;
  height: 100%;
  overflow-x: hidden;
  max-width: 100vw;
}



a {
  text-decoration: none;
}

ul {
  list-style: none;
}
`;
