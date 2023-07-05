import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useApp } from "../../hooks/useApp";

import { User } from "../../models/user";
import { profile } from "../../services/auth";

import Navbar from "../../components/Navbar";

import { Card, Container, Content, Line, Loading, Reset } from "./styles";

import { RotatingLines } from "react-loader-spinner";

function Profile() {
  const { isLoggedIn } = useApp();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<User>();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await profile();
        setUserProfile(user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        {userProfile ? (
          <Card className="card">
            <div className="tools">
              <div className="circle">
                <span className="red box"></span>
              </div>
              <div className="circle">
                <span className="yellow box"></span>
              </div>
              <div className="circle">
                <span className="green box"></span>
              </div>
            </div>
            <Content className="content">
              <Line>
                <span>Email</span>
                <p>{userProfile.user_email}</p>
              </Line>

              <Line>
                <span>Phone number</span>
                <p>{userProfile.profile.profile_phone}</p>
              </Line>

              <Line>
                <span>Date of birth</span>
                <p>
                  {userProfile.profile.profile_birthday?.toString() ||
                    "Information not available"}
                </p>
              </Line>

              <Line>
                <span>Address</span>
                <p>
                  {userProfile.profile.profile_address ||
                    "Information not available"}
                </p>
              </Line>

              {userProfile.employee && (
                <Line>
                  <span>Salary</span>
                  <p>{userProfile.employee.employee_salary}€</p>
                </Line>
              )}

              <Line>
                <Reset to="/reset">Reset Password</Reset>
              </Line>
            </Content>
          </Card>
        ) : (
          <Loading>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          </Loading>
        )}
      </Container>
    </>
  );
}

export default Profile;
