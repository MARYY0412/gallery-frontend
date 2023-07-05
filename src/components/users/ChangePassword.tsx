import React, { useState } from "react";
import styled from "styled-components";
import { changeUserPassword } from "../../utils/BackendMethods";

function ChangePassword() {
  const [originalPass, setOriginalPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [newPass2, setNewPass2] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "originalPass") {
      setOriginalPass(e.target.value);
    } else if (e.target.name === "newPass") {
      setNewPass(e.target.value);
    } else if (e.target.name === "newPass2") {
      setNewPass2(e.target.value);
    }
  };

  const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newPass === "" || newPass2 === "" || originalPass === "")
      setError("Fill the blanks!!");
    else if (newPass !== newPass2) setError("Passwords must be the same");
    else if (newPass === originalPass)
      setError("The new password and the old one must be different!");
    else {
      changeUserPassword(originalPass, newPass)
        .then((data) => {
          console.log(data);
          setError("");
          setInfo("Password changed");
        })
        .catch((err) => {
          console.log(err);
          setInfo("");
          setError(
            err.response.data !== undefined
              ? err.response.data
              : "An unknown error occurred"
          );
        });
    }
  };

  return (
    <ChangePasswordBox>
      <form action="post" className="standard-form">
        <h4 className="form-title-class">Change pass</h4>
        <div>
          <p>Old password</p>
          <input
            type="password"
            name="originalPass"
            onChange={handleInputs}
            value={originalPass}
            className="form-input-class"
          />
        </div>
        <div>
          <p>New password</p>
          <input
            type="password"
            name="newPass"
            onChange={handleInputs}
            value={newPass}
            className="form-input-class"
          />
        </div>
        <div>
          <p>Repeat new password</p>
          <input
            type="password"
            name="newPass2"
            onChange={handleInputs}
            value={newPass2}
            className="form-input-class"
          />
        </div>
        <button onClick={submit} className="form-button-class">
          submit
        </button>
        <p className="form-error-p">{error}</p>
        <p className="form-info-p">{info}</p>
      </form>
    </ChangePasswordBox>
  );
}

export default ChangePassword;
const ChangePasswordBox = styled.div``;
