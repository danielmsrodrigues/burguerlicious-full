import { FormEvent, useState, useEffect } from "react";
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
  RegisterLink,
  RegisterP,
  Right,
  TextField,
  Wrapper,
} from "./styles";

function Login() {
  const { isLoggedIn, attemptLogin } = useApp();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    isLoggedIn && navigate("/dashboard");
  }, [isLoggedIn]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(false);
    setLoading(true);

    const target = event.target as HTMLFormElement;
    const user_email = target.elements.namedItem(
      "user_email"
    ) as HTMLInputElement;
    const user_password = target.elements.namedItem(
      "user_password"
    ) as HTMLInputElement;

    attemptLogin(user_email.value, user_password.value)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((e) => {
        setError(true);
        console.log(e);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <CardLogin>
            <LeftTitle>Login</LeftTitle>
            <LeftSubTitle>Login to your account</LeftSubTitle>
            <Form method="post" action="/login" onSubmit={handleSubmit}>
              <TextField>
                <Label htmlFor="user_email">Email Address</Label>
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
                <Label htmlFor="user_password">Password</Label>
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
                <Button type="submit">Login {loading && <Loader />}</Button>
              </div>
            </Form>
            <RegisterP>
              Don't have an account?{" "}
              <RegisterLink to={"/register"}>Register</RegisterLink>
            </RegisterP>

            {error && <ErrorMessage>Invalid credentials</ErrorMessage>}
          </CardLogin>
        </Left>
        <Right>
          <Image src="/assets/admin-animate.svg" />
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Login;
