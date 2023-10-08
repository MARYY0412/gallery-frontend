import React, { useEffect, useState } from "react";
import styled from "styled-components";
//components
import LoggedUserProfileBox from "../components/users/ProfileBox";
//backend Methods
import ChangePassword from "../components/users/ChangePassword";
import EditProfile from "../components/users/EditProfile";
//react-icons
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUserAdd, AiOutlineEdit } from "react-icons/ai";
//react-redux-toolkit
import { useSelector } from "react-redux";
//get params from url
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";

function LoggedUserProfile() {
  const userState = useSelector((state: RootState) => state.user);
  const [activeComponent, setActiveComponent] = useState<
    "profile" | "edit-profile" | "change-password"
  >("profile");

  return (
    <Container>
      <div className="render-nav">
        <div
          className={
            activeComponent === "profile"
              ? "render-nav-link active-link"
              : "render-nav-link"
          }
          onClick={() => setActiveComponent("profile")}
        >
          <p>Profile</p>
          <AiOutlineUserAdd className="render-nav-link-icon" />
        </div>
        <div
          className={
            activeComponent === "edit-profile"
              ? "render-nav-link active-link"
              : "render-nav-link"
          }
          onClick={() => setActiveComponent("edit-profile")}
        >
          <p>Edit Profile</p>
          <AiOutlineEdit className="render-nav-link-icon" />
        </div>
        <div
          className={
            activeComponent === "change-password"
              ? "render-nav-link active-link"
              : "render-nav-link"
          }
          onClick={() => setActiveComponent("change-password")}
        >
          <p> Change Password</p>
          <RiLockPasswordLine className="render-nav-link-icon" />
        </div>
      </div>

      {activeComponent === "profile" && <LoggedUserProfileBox user={userState} />}
      {activeComponent === "edit-profile" && <EditProfile />}
      {activeComponent === "change-password" && <ChangePassword />}
    </Container>
  );
}

export default LoggedUserProfile;
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
