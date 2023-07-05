import { useApp } from "../../hooks/useApp";
import { FormEvent, useState } from "react";

import Navbar from "../../components/Navbar";
import Loader from "../../components/Loader";

import {
  Button,
  ButtonField,
  Container,
  Form,
  Icon,
  Input,
  InputField,
  InputGroup,
  Login,
  LoginLink,
  Title,
  Wrapper,
} from "./styles";

import {
  AiOutlineIdcard,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";

function Register() {
  const { attemptRegister } = useApp();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
    const profile_firstName = target.elements.namedItem(
      "profile_firstName"
    ) as HTMLInputElement;
    const profile_lastName = target.elements.namedItem(
      "profile_lastName"
    ) as HTMLInputElement;
    const profile_phone = target.elements.namedItem(
      "profile_phone"
    ) as HTMLInputElement;

    attemptRegister({
      user_email: user_email.value,
      user_password: user_password.value,
      profile_firstName: profile_firstName.value,
      profile_lastName: profile_lastName.value,
      profile_phone: parseInt(profile_phone.value),
    })
      .then(() => {
        toast.info("Check your email to verify your account.");
        target.reset();
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
            <Title>Register</Title>
            <form method="post" onSubmit={handleSubmit}>
              <InputGroup>
                <InputField>
                  <Icon>
                    <AiOutlineIdcard />
                  </Icon>
                  <Input
                    id="profile_firstName"
                    name="profile_firstName"
                    type="text"
                    placeholder="First Name"
                    autoComplete="profile_firstName"
                    required
                    disabled={loading}
                  />
                </InputField>

                <InputField>
                  <Icon>
                    <AiOutlineIdcard />
                  </Icon>
                  <Input
                    id="profile_lastName"
                    name="profile_lastName"
                    type="text"
                    placeholder="Last Name"
                    autoComplete="profile_lastName"
                    required
                    disabled={loading}
                  />
                </InputField>

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

                <InputField>
                  <Icon>
                    <AiOutlinePhone />
                  </Icon>
                  <Input
                    id="profile_phone"
                    name="profile_phone"
                    type="tel"
                    placeholder="Phone (9 digits)"
                    autoComplete="profile_phone"
                    required
                    disabled={loading}
                    pattern="^(\+351)?[96][0-9]{8}$"
                    minLength={9}
                    maxLength={9}
                  />
                </InputField>
                <InputField></InputField>
              </InputGroup>
              <ButtonField>
                <Button type="submit">Register {loading && <Loader />}</Button>
              </ButtonField>
            </form>

            <Login>
              Already a member? <LoginLink to="/login">Login</LoginLink>
            </Login>
            {error && <p>Ocorreu um erro no processo de registo</p>}
          </Form>
        </Wrapper>
      </Container>

      <ToastContainer />
    </>
  );
}

export default Register;
