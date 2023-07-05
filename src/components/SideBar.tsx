import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TfiMenu } from "react-icons/tfi";
import { Link } from "react-router-dom";
type Props = {
  theme: string;
};
const SideBar = (props: Props) => {
  const [visibility, setVisibility] = useState(false);

  const toggleMenu = () => {
    setVisibility(!visibility);
  };
  //nowy komentarz
  // useEffect(() => {
  //   console.log(props.theme);
  // }, [visibility]);
  return (
    <Menu
      className={`${visibility === true ? `visible-menu` : `hide-menu`}`}
      style={
        props.theme === "light-theme"
          ? { backgroundColor: "rgba(11, 33, 72, 1)" }
          : { backgroundColor: "white" }
      }
    >
      <TfiMenu
        className="menu-icon"
        onClick={toggleMenu}
        style={
          props.theme === "light-theme"
            ? { color: "white" }
            : { color: "black" }
        }
      />
      <div className="nav-box">
        <StyledLink
          to="/"
          style={
            props.theme === "light-theme"
              ? { color: "#fff" }
              : { color: "black" }
          }
        >
          Home
        </StyledLink>
        <StyledLink
          to="/contact"
          style={
            props.theme === "light-theme"
              ? { color: "#fff" }
              : { color: "black" }
          }
        >
          Contact
        </StyledLink>
      </div>
    </Menu>
  );
};

export default SideBar;

const Menu = styled.div`
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  position: fixed;
  width: 250px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 80px;
  transition: 2s all;

  z-index: 2;

  .menu-icon {
    margin: 15px;
    font-size: 25px;
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0px;
  }
`;

const StyledLink = styled(Link)`
  width: 200px;
  height: 40px;
  color: black;

  display: flex;

  align-items: center;
  justify-content: space-around;
  padding: 5px;

  position: relative;
  transition: 2s all ease;
  cursor: pointer;

  :after {
    position: absolute;
    content: "";

    width: 2px;
    height: 40px;
    right: 0px;
    background-color: lightgray;
    transition: 2s all ease;
  }

  :hover::after {
    border-radius: 0%;
    width: 100%;
    opacity: 0.2;
    height: 40px;
  }
`;
