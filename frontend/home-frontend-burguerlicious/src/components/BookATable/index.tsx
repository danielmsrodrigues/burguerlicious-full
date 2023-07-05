import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";

import {
  Button,
  CircleLeft,
  CircleRight,
  Container,
  Heading,
  Info,
  Sub,
  Wrapper,
} from "./styles";

type Page = {
  path: string;
  name: string;
  auth?: boolean;
};

function BookATable() {
  const { isLoggedIn } = useApp();
  const navigate = useNavigate();

  const pages: Page[] = [
    {
      path: "/login",
      name: "Login",
    },
    {
      path: "/reservation",
      name: "Book a Table",
      auth: true,
    },
  ];

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate(pages[1].path);
    } else {
      navigate(pages[0].path);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Info>
            <Heading>Taste the extraordinary!</Heading>
            <Sub>Be fast, everyone wants to try it!</Sub>
            <Button onClick={handleButtonClick}>
              {isLoggedIn ? pages[1].name : pages[0].name}
            </Button>
          </Info>
          <CircleRight />
          <CircleLeft />
        </Wrapper>
      </Container>
    </>
  );
}

export default BookATable;
