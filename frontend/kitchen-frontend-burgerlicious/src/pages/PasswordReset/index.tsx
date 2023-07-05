import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";
import { updatePassword } from "../../services/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar";

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
      toast.error("Failed to update password. Please try again.");
    }
  }

  return (
    <>
      <Navbar />

      <Container>
        <ToastContainer />

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
    </>
  );
}

export default PasswordReset;
