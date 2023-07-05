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
  Right,
  SignIn,
  SignInLink,
  TextField,
  Wrapper,
} from "./styles";

function Register() {
  const { isLoggedIn, attemptRegister } = useApp();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    isLoggedIn && navigate("/");
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

    attemptRegister({
      user_email: user_email.value,
      user_password: user_password.value,
    })
      .then(() => {
        navigate("/employee");
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
            <LeftTitle>Register</LeftTitle>
            <LeftSubTitle>Create a new account</LeftSubTitle>
            <Form method="post" onSubmit={handleSubmit}>
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
                <Button type="submit">Register {loading && <Loader />}</Button>
              </div>
            </Form>
            <SignIn>
              Have an account? <SignInLink to={"/"}>Sign in</SignInLink>
            </SignIn>
            {error && <ErrorMessage>An error ocurred</ErrorMessage>}
          </CardLogin>
        </Left>
        <Right>
          <Image src="/assets/admin-animate.svg" />
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Register;
