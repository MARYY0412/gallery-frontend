import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  changeUsername,
  changeEmail,
  changeAvatar,
  fetchLoggedUserInfo,
} from "../../utils/BackendMethods";
import { setUserInfo } from "../../store/slices/user_Slice";
import { RootState } from "../../store/store";

function EditProfile() {
  const [newUsername, setNewUsername] = useState<string>("");
  const [errorUsername, setErrorUsername] = useState<string>("");
  const [infoUsername, setInfoUsername] = useState<string>("");
  //
  const [newEmail, setNewEmail] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [infoEmail, setInfoEmail] = useState<string>("");
  //
  const [newAvatar, setNewAvatar] = useState<File | undefined>();
  const [errorAvatar, setErrorAvatar] = useState<string>("");
  const [infoAvatar, setInfoAvatar] = useState<string>("");
  //
  const userState = useSelector((state: RootState) => state.user);
  //
  const dispatch = useDispatch();

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "newUsername") {
      setNewUsername(e.target.value);
    } else if (e.target.name === "newEmail") {
      setNewEmail(e.target.value);
    } else if (e.target.name === "newAvatar") {
      const file = (e.target as HTMLInputElement).files?.[0];
      setNewAvatar(file);
      console.log(file);
    }
  };
  //SUBMIT METHODS FOR EVERY FORM
  const submitUsername = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInfoUsername("");
    setErrorUsername("");
    if (newUsername === "") setErrorUsername("Input cannot be empty");
    else {
      ////////////////
      console.log(userState);
      let response = await changeUsername(userState.ID, newUsername);
      // console.log(response);
      // if (response.data.status === "ok") {
      // } else setErrorUsername(response.data.data);

      if ("error" in response) {
        console.log(response);
        setErrorUsername(response.error);
      } else {
        setInfoUsername(response.data);
        fetchUserDataAgain();
      }
    }
  };

  const submitEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInfoEmail("");
    setErrorEmail("");

    if (newEmail === "") setErrorEmail("input cannot be empty!");
    else {
      let data = await changeEmail(userState.ID, newEmail);
      console.log(data);
      if ("error" in data) {
        setErrorEmail(data.error);
      } else {
        setInfoEmail(data.data);
        fetchUserDataAgain();
      }
    }
  };

  const submitAvatar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInfoAvatar("");
    setErrorAvatar("");

    if (newAvatar !== undefined) {
      let response = await changeAvatar(userState.ID, newAvatar);
      // console.log(response.status);
      // if (response.status === 200) {
      // }
      if ("error" in response) {
        setErrorAvatar(response.error);
      } else {
        setInfoAvatar(response.data);
        fetchUserDataAgain();
      }
    } else {
      setErrorAvatar("choose file!");
    }
  };
  //WHEN DATA IS CHANGED,
  //WE TRIGGER THIS METHOD TO FETCH UPDATED DATA AND ACTUALIZE THE STORE
  const fetchUserDataAgain = () => {
    fetchLoggedUserInfo().then((data) => {
      if (data !== "not logged") {
        dispatch(
          setUserInfo({
            username: data.username,
            email: data.email,
            ID: data.id,
            date_of_birth: data.date_of_birth,
            avatar: data.avatar,
            role: data.role,
          })
        );
      }
    });
  };

  return (
    <ChangeProfileBox>
      <form action="post" className="standard-form">
        <h4 className="form-title-class">new username</h4>
        <div>
          <p>Username</p>
          <input
            type="text"
            name="newUsername"
            onChange={handleInputs}
            // value={username}
            className="form-input-class"
          />
        </div>
        <button onClick={submitUsername} className="form-button-class">
          change username
        </button>
        <p className="form-error-p">{errorUsername}</p>
        <p className="form-info-p">{infoUsername}</p>
      </form>
      <form action="post" className="standard-form">
        <h4 className="form-title-class">new email</h4>
        <div>
          <p>Email</p>
          <input
            type="text"
            name="newEmail"
            onChange={handleInputs}
            // value={email}
            className="form-input-class"
          />
        </div>
        <button onClick={submitEmail} className="form-button-class">
          change email
        </button>
        <p className="form-error-p">{errorEmail}</p>
        <p className="form-info-p">{infoEmail}</p>
      </form>
      <form action="post" className="standard-form">
        <h4 className="form-title-class">new avatar</h4>
        <div>
          <p>Avatar</p>
          <input
            lang="en"
            type="file"
            name="newAvatar"
            onChange={handleInputs}
            accept="image/*"
            className="form-input-file-class"
          />
        </div>
        <button onClick={submitAvatar} className="form-button-class">
          change avatar
        </button>
        <p className="form-error-p">{errorAvatar}</p>
        <p className="form-info-p">{infoAvatar}</p>
      </form>
    </ChangeProfileBox>
  );
}

export default EditProfile;

const ChangeProfileBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  > form {
    margin: 30px;
  }
`;
