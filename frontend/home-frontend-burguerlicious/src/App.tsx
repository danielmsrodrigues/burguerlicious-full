import { Outlet } from "react-router-dom";
import GlobalStyle from "./styles/styles";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
