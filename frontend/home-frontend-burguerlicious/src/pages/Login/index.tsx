import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";

import {
  Button,
  ButtonField,
  Container,
  Form,
  Icon,
  Input,
  InputField,
  InputGroup,
  Register,
  RegisterLink,
  Title,
  Wrapper,
} from "./styles";

import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

function Login() {
  const { isLoggedIn, attemptLogin } = useApp();
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

    attemptLogin(user_email.value, user_password.value)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        setError(true);
        console.log(e);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Navbar />

      <Container>
        <Wrapper>
          <Form>
            <Title>Login</Title>
            <form method="post" action="/login" onSubmit={handleSubmit}>
              <InputGroup>
                <InputField>
                  <Icon>
                    <AiOutlineMail />
                  </Icon>
                  <Input
                    id="user_email"
                    name="user_email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    required
                    disabled={loading}
                  />
                </InputField>

                <InputField>
                  <Icon>
                    <AiOutlineLock />
                  </Icon>
                  <Input
                    id="user_password"
                    name="user_password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    minLength={5}
                    maxLength={20}
                    required
                    disabled={loading}
                  />
                </InputField>
              </InputGroup>
              <ButtonField>
                <Button type="submit">Login {loading && <Loader />}</Button>
              </ButtonField>
            </form>

            <Register>
              Not a member? <RegisterLink to="/register">Register</RegisterLink>
            </Register>
            {error && <p>Invalid email or password</p>}
          </Form>
        </Wrapper>
      </Container>
    </>
  );
}

export default Login;
