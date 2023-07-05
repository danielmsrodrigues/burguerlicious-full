import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";

import { Button, Container, Nav, StyledNavLink } from "./styles";

type Page = {
  path: string;
  name: string;
  auth?: boolean;
};

function Navbar() {
  const { isLoggedIn, logout } = useApp();
  const navigate = useNavigate();

  const pages: Page[] = [
    {
      path: "/orders",
      name: "Orders",
      auth: true,
    },
    {
      path: "/bill",
      name: "Bill",
      auth: true,
    },
    {
      path: "/profile",
      name: "Profile",
      auth: true,
    },
  ];

  function handleAuth() {
    if (isLoggedIn) {
      logout();
    }

    navigate(isLoggedIn ? "/" : "/login");
  }

  return (
    <>
      <Container>
        <Nav>
          <div>
            {pages.map(
              ({ path, name, auth }) =>
                (!auth || isLoggedIn) && (
                  <StyledNavLink key={path} to={path}>
                    {name}
                  </StyledNavLink>
                )
            )}
          </div>
          <div>
            <Button onClick={handleAuth}>
              {isLoggedIn ? "LOGOUT" : "LOGIN"}
            </Button>
          </div>
        </Nav>
      </Container>
    </>
  );
}

export default Navbar;
