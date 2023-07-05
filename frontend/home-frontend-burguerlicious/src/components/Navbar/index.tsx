import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";

import {
  Button,
  Container,
  Logo,
  NavBar,
  MobileNav,
  StyledNavLinkContainer,
  HamburgerButton,
  ButtonContainer,
  MobileNavLink,
  StyledNavLink,
  CloseButton,
  MobileNavWrapper,
  MobileNavLogout,
} from "./styles";

import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";

type Page = {
  path: string;
  name: string;
  auth?: boolean;
};

function Navbar() {
  const { isLoggedIn, logout } = useApp();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pages: Page[] = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/menu",
      name: "Menu",
    },
    {
      path: "/about",
      name: "About Us",
    },
    {
      path: "/reservation",
      name: "Book a Table!",
      auth: true,
    },
  ];

  function handleAuth() {
    if (isLoggedIn) {
      logout();
    }
    navigate(isLoggedIn ? "/" : "/login");
  }

  function toggleMobileMenu() {
    setMobileMenuOpen((prevState) => !prevState);
  }

  return (
    <Container>
      <NavBar>
        <Logo to="/">Burgerlicious &trade;</Logo>

        <nav>
          <StyledNavLinkContainer isMobileMenuOpen={isMobileMenuOpen}>
            {pages.map(
              ({ path, name, auth }) =>
                (!auth || isLoggedIn) && (
                  <StyledNavLink key={path} to={path}>
                    {name}
                  </StyledNavLink>
                )
            )}
          </StyledNavLinkContainer>
          <HamburgerButton onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <GrClose /> : <GiHamburgerMenu />}
          </HamburgerButton>
        </nav>

        <ButtonContainer>
          <Button onClick={handleAuth}>
            {isLoggedIn ? "LOGOUT" : "LOGIN"}
          </Button>
        </ButtonContainer>
      </NavBar>

      {isMobileMenuOpen && (
        <MobileNav>
          <CloseButton onClick={toggleMobileMenu}>
            <GrClose color="yellow" />
          </CloseButton>
          <MobileNavWrapper>
            {pages.map(
              ({ path, name, auth }) =>
                (!auth || isLoggedIn) && (
                  <MobileNavLink
                    key={path}
                    to={path}
                    onClick={toggleMobileMenu}
                  >
                    {name}
                  </MobileNavLink>
                )
            )}
            <MobileNavLogout onClick={handleAuth}>
              {isLoggedIn ? "LOGOUT" : "LOGIN"}
            </MobileNavLogout>
          </MobileNavWrapper>
        </MobileNav>
      )}
    </Container>
  );
}

export default Navbar;
