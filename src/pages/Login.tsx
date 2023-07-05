import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
//backend methods
import { loginMethod } from "../utils/BackendMethods";
//redux toolkit
import { useDispatch } from "react-redux";
import { setUserInfo } from "../store/slices/user_Slice";
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
        <div>
          <p>USERNAME</p>
          <input
            type="text"
            name="username"
            onChange={handleInputs}
            value={loginData.username}
            className="form-input-class-2"
          />
        </div>
        <div>
          <p>PASSWORD</p>
          <input
            type="password"
            name="password"
            onChange={handleInputs}
            value={loginData.password}
            className="form-input-class-2"
          />
        </div>
        <button onClick={submit} className="form-button-class-2" type="submit">
          submit
        </button>
        <StyledLink to={`/forgot-password`}>Forgot Password?</StyledLink>
        <p className="form-error-p">{error}</p>
      </form>
    </LoginBox>
  );
}

export default Login;

const LoginBox = styled.div`
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
