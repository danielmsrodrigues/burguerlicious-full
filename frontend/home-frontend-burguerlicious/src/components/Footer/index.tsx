import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Contacts,
  Container,
  Email,
  Info,
  Logo,
  Navigate,
  Wrapper,
} from "./styles";

const Footer = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <Container>
      <Wrapper>
        <div>
          <Logo>Burgerlicious &trade;</Logo>
          <p>2023 &trade; Burgerlicious</p>
        </div>
        <Info>
          <Contacts>
            <div>
              <p>Rua Zeferino Hamburguino, N23</p>
              <p>2695-833 Lisboa</p>
            </div>
            <div>
              <p>+351 230 340 128</p>
              <Email href="mailto:burguerlicious@gmail.com">
                burguerliciousapp@gmail.com
              </Email>
            </div>
          </Contacts>
          <div>
            <ul>
              <li>
                <Navigate to={"/"}>Home</Navigate>
              </li>
              <li>
                <Navigate to={"/menu"}>Menu</Navigate>
              </li>
              <li>
                <Navigate to={"/about"}>About Us</Navigate>
              </li>
            </ul>
          </div>
        </Info>
      </Wrapper>
    </Container>
  );
};

export default Footer;
