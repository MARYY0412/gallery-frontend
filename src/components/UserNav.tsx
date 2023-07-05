import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//store
import { useDispatch } from "react-redux";
import { reset } from "../store/slices/user_Slice";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type Props = {
  theme: string;
  username: string;
};
function UserNav(props: Props) {
  const { ID, role } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(reset());
    navigate("/home");
  };

  return (
    <Content>
      {props.username === "" ? (
        <>
          <StyledLink
            style={
              props.theme === "dark-theme"
                ? { color: "#fff" }
                : { color: "black" }
            }
            to="/login"
          >
            login
          </StyledLink>
          <StyledLink
            style={
              props.theme === "dark-theme"
                ? { color: "#fff" }
                : { color: "black" }
            }
            to="/register"
          >
            register
          </StyledLink>
        </>
      ) : (
        <>
          {role === "admin" && (
            <StyledLink
              style={
                props.theme === "dark-theme"
                  ? { color: "#fff" }
                  : { color: "black" }
              }
              to="/admin-panel"
            >
              MANAGE
            </StyledLink>
          )}

          <StyledLink
            style={
              props.theme === "dark-theme"
                ? { color: "#fff" }
                : { color: "black" }
            }
            to="/yourGallery"
          >
            GALLERY
          </StyledLink>
          <StyledLink
            style={
              props.theme === "dark-theme"
                ? { color: "#fff" }
                : { color: "black" }
            }
            to={`/loggedUserProfile`}
          >
            PROFILE
          </StyledLink>
          <StyledLink
            style={
              props.theme === "dark-theme"
                ? { color: "#fff" }
                : { color: "black" }
            }
            to="/login"
            onClick={logout}
          >
            LOGOUT
          </StyledLink>
        </>
      )}
    </Content>
  );
}

export default UserNav;
const Content = styled.div`
  display: flex;
  height: 30px;

  /* @media (max-width: 800px) {
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-gap: 10px;
  } */
`;

const StyledLink = styled(Link)`
  font-family: "Dosis", sans-serif;
  text-align: center;
  letter-spacing: 1px;
  color: #fff;
  text-decoration: none;
  padding: 0px 5px;
  margin: 0px 10px;
  border-radius: 15px;
  position: relative;
  transition: 1s all;

  display: flex;
  align-items: center;
  @media (max-width: 800px) {
    font-size: 12px;
  }
  @media (max-width: 600px) {
    font-size: 10px;
  }
  :hover {
    opacity: 0.6;
  }
  ::before {
    background-color: lightgray;
    position: absolute;
    content: "";
    width: 0%;
    height: 3px;
    bottom: 0px;
    left: 0;
    margin: auto;

    transition: 1s all;
  }
  :hover::before {
    width: 100%;
  }
`;
