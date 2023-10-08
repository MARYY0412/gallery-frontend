import React, { useState } from "react";
import styled from "styled-components";
//backend methods
import { registerMethod } from "../utils/BackendMethods";
//zod library
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IUserRegister } from "../types/Types";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [backendErr, setBackendErr] = useState<string>("");
  const [redirection, setRedirection] = useState<boolean>(false);
  const [maxDate, setMaxDate] = useState<string>(handleMaxDate());
  ///zod doesnt't handle avatar input, so we have to separate state and functions for it
  const schema: ZodType<IUserRegister> = z
    .object({
      username: z.string().min(8).max(30),
      password: z.string().min(8).max(30),
      password2: z.string().min(8).max(30),
      email: z.string().email(),
      dateOfBirth: z.string().nonempty(),
    })
    .refine((data) => data.password === data.password2, {
      message: "Password do not match",
      path: ["password2"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserRegister>({
    resolver: zodResolver(schema),
  });
  //musi być zwykła funkcja, bo przy strzałkowej będzie błąd, że
  //nie można wywołać funkcji przy ustalaniu state'u maxDate
  function handleMaxDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    setSelectedFile(file);
  };

  const submitData = async (data: IUserRegister) => {
    try {
      let response = await registerMethod(
        data.username,
        data.email,
        data.password,
        selectedFile,
        data.dateOfBirth
      );
      console.log(response);
      setRedirection(true);
    } catch (err) {
      console.log(err);
    }

    setRedirection(true);
  };

  return (
    <RegisterBox>
      <form
        action=""
        className="standard-form"
        onSubmit={handleSubmit(submitData)}
      >
        <h4 className="form-title-class">sign up</h4>
        <div>
          <p>username*</p>
          <input
            type="text"
            className="form-input-class-2"
            {...register("username")}
          />
          {errors.username && (
            <p className="form-error-p">{errors.username.message}</p>
          )}
        </div>
        <div>
          <p>email*</p>
          <input
            type="text"
            className="form-input-class-2"
            {...register("email")}
          />
          {errors.email && (
            <p className="form-error-p">{errors.email.message}</p>
          )}
        </div>
        <div>
          <p>password*</p>
          <input
            type="password"
            className="form-input-class-2"
            {...register("password")}
          />
          {errors.password && (
            <p className="form-error-p">{errors.password.message}</p>
          )}
        </div>
        <div>
          <p>repeat password*</p>
          <input
            type="password"
            className="form-input-class-2"
            {...register("password2")}
          />
          {errors.password2 && (
            <p className="form-error-p">{errors.password2.message}</p>
          )}
        </div>
        <div>
          <p>date of birth*</p>
          <input
            type="date"
            className="form-input-date-class"
            max={maxDate}
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && (
            <p className="form-error-p">{errors.dateOfBirth.message}</p>
          )}
        </div>
        <div>
          <p>avatar</p>
          <input
            lang="en"
            type="file"
            name="avatar"
            onChange={handleAvatar}
            accept="image/*"
            className="form-input-file-class"
          />
        </div>
        <p className="form-error-p">{backendErr}</p>
        <StyledLink to={`/login`}>click here to login</StyledLink>
        {redirection && (
          <Timer label="user registered successfully" placeToRedirect="login" />
        )}
        <button className="form-button-class-2">submit</button>
      </form>

    </RegisterBox>
  );
}

export default Register;

const RegisterBox = styled.div`
min-height: 100vh;
display: flex;
align-items: center;
  .form-error-p {
    height: 20px;
    font-size: 12px;
    color: red;
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
