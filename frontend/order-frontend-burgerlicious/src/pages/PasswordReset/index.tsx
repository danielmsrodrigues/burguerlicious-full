import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";

import { updatePassword } from "../../services/auth";

import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";

import {
  Button,
  CardLogin,
  Container,
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

import { ToastContainer, toast } from "react-toastify";

function PasswordReset() {
  const { isLoggedIn } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [, setError] = useState("");

  useEffect(() => {
    !isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const target = event.target as HTMLFormElement;
    const password = target.elements.namedItem(
      "user_password"
    ) as HTMLInputElement;

    try {
      await updatePassword(password.value);
      setLoading(false);
      toast.success("Password updated successfully!");
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <Container>
        <Wrapper>
          <Left>
            <CardLogin>
              <LeftTitle>Password</LeftTitle>
              <LeftSubTitle>For a safer account</LeftSubTitle>
              <Form method="post" onSubmit={handleSubmit}>
                <TextField>
                  <Label htmlFor="email">New Password</Label>
                  <Input
                    id="user_password"
                    name="user_password"
                    type="text"
                    placeholder="New password"
                    autoComplete="current-password"
                    minLength={5}
                    maxLength={20}
                    required
                  />
                </TextField>

                <div>
                  <Button type="submit">Submit{loading && <Loader />}</Button>
                </div>
              </Form>
            </CardLogin>
          </Left>
          <Right>
            <Image src="/assets/safe.svg" alt="animated" />
          </Right>
        </Wrapper>
      </Container>

      <ToastContainer />
    </>
  );
}

export default PasswordReset;
