import { Outlet } from "react-router-dom";
import GlobalStyle from "./styles/styles";

function App() {
  return (
    <>
      <Outlet />
      <GlobalStyle />
    </>
  );
}

export default App;
