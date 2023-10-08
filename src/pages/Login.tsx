import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//backend methods
import { loginMethod } from "../utils/BackendMethods";
//redux toolkit
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/slices/user_Slice";
import {FiUser} from 'react-icons/fi';
import {HiOutlineHashtag} from 'react-icons/hi2';
function Login() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  let [error, setError] = useState<string>("");

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "username":
        setLoginData({ ...loginData, username: e.target.value });
        break;
      case "password":
        setLoginData({ ...loginData, password: e.target.value });
        break;
      default:
        break;
    }
  };
  const submit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let isValid: boolean = false;
    if (loginData.username === "" || loginData.password === "")
      setError("fill in the blanks!");
    else {
      setError("");
      isValid = true;
    }

    if (isValid) {
      let data = await loginMethod(loginData.username, loginData.password);
      if ("message" in data) setError(data.message);
      else {
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: data.token,
            ID: data.ID,
          })
        );
        dispatch(
          setUserInfo({
            username: data.username,
            email: data.email,
            ID: data.ID,
            date_of_birth: data.date_of_birth,
            avatar: data.avatar,
            role: data.role,
            // token: data.token,
          })
        );
        navigate("/");
      }
    }
  };

  return (
    <LoginBox>
      <form action="post" className="standard-form">
        <h4 className="form-title-class">sign in</h4>
        <p className="login-p">USERNAME</p>
        <div className="login-input-div">
        <FiUser className="login-input-icon"/>
          <input
            type="text"
            name="username"
            onChange={handleInputs}
            value={loginData.username}
            className="form-input-class-2 login-input"
          />
        </div>
        <p className="login-p">PASSWORD</p>
        <div className="login-input-div">
        <HiOutlineHashtag className="login-input-icon"/>
          <input
            type="password"
            name="password"
            onChange={handleInputs}
            value={loginData.password}
            className="form-input-class-2 login-input"
          />
        </div>
        <div className="login-remember-me">
        <input type="checkbox" id="remember-me-input"/>
        <label htmlFor="remember-me-input">remember me</label>
        </div>
        <button onClick={submit} className="form-button-class-2" type="submit">
          submit
        </button>
        <StyledLink to={`/forgot-password`}>Forgot Password?</StyledLink>
        <StyledLink to={`/register`}>click here to register new account</StyledLink>
        <p className="form-error-p">{error}</p>
      </form>
    </LoginBox>
  );
}

export default Login;

const LoginBox = styled.div`
min-height: 100vh;
display: flex;
align-items: center;
  .login-p{
    width: 100%;
    padding: 5%;
    text-align: left;
  }
  .login-input-div{
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: row;
    background-color: aliceblue;
    align-items: center;
  }
  .login-input{
    width: 100%;
    border: none;
  }
  .login-input-icon{
    stroke-width: 0.5;
    display: block;
    height: 100%;
    font-size: 2em;
    margin: 1%;
    color: green;
  }
  .login-remember-me{
    display: flex;
    align-items: center;
    #remember-me-input{
      margin: 0px 10px;
    }
    label{

    }
  }
  .form-button-class-2 {
    margin: 30px 0px;
  }
`;

const StyledLink = styled(Link)`
  text-align: left;
  letter-spacing: 1px;
  font-size: 14px;
  margin: 5px;
  padding: 10px;
  color: inherit;
  transition: 1s all;

  :hover {
    color: gray;
  }
`;
