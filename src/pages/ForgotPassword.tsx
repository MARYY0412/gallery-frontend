import axios from "axios";
import React, { useState } from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
function ForgotPassword() {
  //   const [username, setUsername] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [requestErr, setRequestErr] = useState<string>("");
  const schema: ZodType<{ username: string }> = z.object({
    username: z.string().min(8).max(30),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ username: string }>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: { username: string }) => {
    axios
      .post("http://127.0.0.1:3001/users/forgot-password", {
        username: data.username,
      })
      .then((data) => {
        console.log(data);
        setInfo("check your email!");
        setRequestErr("");
      })
      .catch((err) => {
        console.log(err);
        setRequestErr(err.response.data);
        setInfo("");
      });
  };
  return (
    <ForgotPassBox>
      <form
        action="post"
        className="standard-form forgot-password-form"
        onSubmit={handleSubmit(submitData)}
      >
        <h4 className="form-title-class">FORGOT PASSWORD</h4>
        <div>
          <p>username</p>
          <input
            type="text"
            {...register("username")}
            className="form-input-class"
            placeholder="your username"
          ></input>
          {errors.username && (
            <p className="form-error-p">{errors.username.message}</p>
          )}
        </div>
        <button className="form-button-class">submit</button>
        <p className="form-info-p">{info}</p>
        <p className="form-error-p">{requestErr}</p>
      </form>
    </ForgotPassBox>
  );
}

const ForgotPassBox = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .forgot-password-form{
      width: fit-content;
      height: fit-content;
    }
  .form-error-p {
    color: red;
    text-align: center;
  }
`;

export default ForgotPassword;
