import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";

import Loader from "../../components/Loader";

import {
  Button,
  CardLogin,
  Container,
  ErrorMessage,
  Form,
  Image,
  Input,
  Label,
  Left,
  LeftSubTitle,
  LeftTitle,
  Right,
  TextField,
  Wrapper,
} from "./styles";

function Login() {
  const { isLoggedIn, attemptLogin } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    isLoggedIn && navigate("/orders");
  }, [isLoggedIn]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const target = event.target as HTMLFormElement;
    const email = target.elements.namedItem("user_email") as HTMLInputElement;
    const password = target.elements.namedItem(
      "user_password"
    ) as HTMLInputElement;

    attemptLogin(email.value, password.value)
      .then(() => {
        navigate("/orders");
      })
      .catch((e) => {
        setError(e.message);
        console.log(e);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <CardLogin>
              <LeftTitle>Welcome</LeftTitle>
              <LeftSubTitle>Login to your account</LeftSubTitle>
              <Form method="post" action="/login" onSubmit={handleSubmit}>
                <TextField>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="user_email"
                    name="user_email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    required
                  />
                </TextField>
                <TextField>
                  <Label htmlFor="email">Password</Label>
                  <Input
                    id="user_password"
                    name="user_password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    minLength={5}
                    maxLength={20}
                    required
                  />
                </TextField>

                <div>
                  <Button type="submit">Sign In {loading && <Loader />}</Button>
                </div>
              </Form>
              {error && <ErrorMessage>Invalid credentials</ErrorMessage>}
            </CardLogin>
          </Left>
          <Right>
            <Image src="/assets/order-animate.svg" alt="animated" />
          </Right>
        </Wrapper>
      </Container>
    </>
  );
}

export default Login;
