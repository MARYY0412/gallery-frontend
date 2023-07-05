import React, { useEffect, useState } from "react";
import styled from "styled-components";
//components
import UserNav from "./UserNav";
import ChangeTheme from "./ChangeTheme";
//redux-toolkit
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
//react-icons
import { BsEnvelopeOpen } from "react-icons/bs";
import { Link } from "react-router-dom";
type Props = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
};
function Title(props: Props) {
  const { username, avatar } = useSelector((state: RootState) => state.user);

  return (
    <TitleBox>
      <HeyUserAnimation className="title-class">
        {avatar && (
          <img
            src={`data:image/jpeg;base64,${avatar}`}
            alt="#"
            className="title-avatar"
          />
        )}
        <p>{username === "" ? "Hello on our website" : `Hello ${username}`}</p>
      </HeyUserAnimation>
      <div className="titlebox-div">
        <UserNav theme={props.theme} username={username} />
        <ChangeTheme theme={props.theme} setTheme={props.setTheme} />
        {username && (
          <Link
            className="titlebox-envelope"
            style={
              props.theme === "dark-theme"
                ? { color: "#fff" }
                : { color: "black" }
            }
            to="/user-messages"
          >
            <BsEnvelopeOpen />
          </Link>
        )}
      </div>
    </TitleBox>
  );
}

export default Title;

const TitleBox = styled.div`
  font-family: "Dosis", sans-serif;
  font-weight: 600;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  border-bottom: 1px solid white;
  .titlebox-div {
    display: flex;
    align-items: center;
    padding: 10px;
    @media (max-width: 1000px) {
      width: 100%;
      justify-content: space-evenly;
    }
  }

  .titlebox-envelope {
    font-size: 25px;
    padding: 20px;
    border-radius: 50%;
    transition: 1s all;
  }

  .titlebox-envelope:hover {
    animation: hover-envelope-animation;
    animation-duration: 1s;
  }

  @keyframes hover-envelope-animation {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const HeyUserAnimation = styled.h1`
  display: flex;
  align-items: center;
  min-width: 250px;
  animation: title-text-animation;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  .title-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0px 20px;
  }
  @media (max-width: 1000px) {
    display: none;
  }
  @keyframes title-text-animation {
    0% {
      letter-spacing: 1px;
    }
    50% {
      letter-spacing: 3px;
    }
    100% {
      letter-spacing: 3px;
    }
  }
`;
