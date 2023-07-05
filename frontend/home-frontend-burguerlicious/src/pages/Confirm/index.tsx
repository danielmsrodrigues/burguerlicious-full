import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { confirmAccount } from "../../services/auth";

import { Text, Wrapper } from "./styles";

function Confirm() {
  const { user_id } = useParams<{ user_id?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (user_id) {
        try {
          await confirmAccount(user_id);
          console.log("Account confirmed!");

          setTimeout(() => {
            navigate("/");
          }, 1000);
        } catch (error) {
          console.error("Confirmation failed:", error);
        }
      }
    };

    fetchData();
  }, [user_id, navigate]);

  return (
    <Wrapper>
      <Text>
        <p>Account verified successfully!</p>
      </Text>
    </Wrapper>
  );
}

export default Confirm;
