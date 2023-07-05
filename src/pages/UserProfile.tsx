import React, { useState, useEffect } from "react";
import { IUser } from "../types/Types";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProfileBox from "../components/users/ProfileBox";
import styled from "styled-components";
function UserProfile() {
  const navigate = useNavigate();
  //user ID from params
  const { userID } = useParams<{ userID: string }>();
  //user state
  const [user, setUser] = useState<IUser>({
    username: "",
    email: "",
    ID: "",
    date_of_birth: "",
    avatar: "",
    role: "",
  });

  useEffect(() => {
    axios
      .post(`http://127.0.0.1:3001/users/user/${userID}`)
      .then((data) => {
        setUser(data.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/notFound");
      });
  }, []);
  return (
    <ProfileBoxContainer>
      <ProfileBox user={user} />
    </ProfileBoxContainer>
  );
}

export default UserProfile;

const ProfileBoxContainer = styled.div`
  > div {
    margin-top: 150px;
  }
`;
