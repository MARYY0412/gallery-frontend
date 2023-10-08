import React, { useState, useEffect } from "react";
import { IUser } from "../types/Types";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BsEnvelopeOpen } from "react-icons/bs";
import { TfiAlert } from "react-icons/tfi";
import styled from "styled-components";
import RandomImages from "../components/homepage/RandomImages";
// import icons8-instagram-96 from '../../public/socialMediaIconsFromIcons8/icons8-instagram-96.png';
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
      <div className="user-profile-header">
        <img className="user-profile-avatar" src={`data:image/jpeg;base64,${user.avatar}`} alt="avatar"/>
        <div className="user-profile-header-informations">
          <p className="user-profile-header-username">{user.username}</p>
          <p className="user-profile-email">{user.email}</p>
          <div className="user-profile-header-social-media">
            <img src={`${process.env.PUBLIC_URL}/socialMediaIconsFromIcons8/icons8-instagram-96.png`} /> 
            <img src={`${process.env.PUBLIC_URL}/socialMediaIconsFromIcons8/icons8-facebook-96.png`} /> 
            <img src={`${process.env.PUBLIC_URL}/socialMediaIconsFromIcons8/icons8-twitter-96.png`} /> 
            <img src={`${process.env.PUBLIC_URL}/socialMediaIconsFromIcons8/icons8-youtube-96.png`} /> 
          </div>
          <p>Icons by Icons8</p>
          <div className="user-profile-header-actions">
            <div><p className="user-profile-header-icon" ><BsEnvelopeOpen /></p>message</div>
            <div><p className="user-profile-header-icon" ><TfiAlert /></p>report</div>
          </div>
        </div>
      </div>
      <h3 className="profile-box-random-photos">Best user photos</h3>
      <RandomImages />
    </ProfileBoxContainer>
  );
}

export default UserProfile;

const ProfileBoxContainer = styled.div`
width: 100%;
margin-bottom: 50px;
  > p{
    margin: 10px;
  }
  .user-profile-header {
    padding: 50px 10%;  
    border-bottom: 1px solid black;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: rgba(217, 217, 214, 0.2);
  }
  .user-profile-header-informations{
    padding: 0px 10%;
    .user-profile-header-username{
      font-size: 2em;
    }
  }
  .user-profile-header-actions{
    display: flex;
    > div{
      display: flex;
      align-items: center;
      margin-right: 10px;
      margin-top: 10px;
      :hover{
        color: gray;
        cursor: pointer;
      }
    }
    .user-profile-header-icon{
      display: flex;
      margin: 0px 8px 0px 0px;
    }
  }
  .user-profile-avatar{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0px 20px;
  }
  .profile-box-random-photos{
    font-size: 2em;
    color: rgba(217, 217, 214, 0.8);
    padding: 50px 0% 50px 20%;
  }
  .user-profile-header-social-media{
      display: flex;
    > img {
      width: 30px;
      margin: 5px 15px 5px 0px;
      :hover{
        cursor: pointer;
      }
    }
  }
`;
