import React, { useState } from "react";
import styled from "styled-components";
import Popup from "../Popup";
import { deleteAccount } from "../../utils/BackendMethods";
interface Props {
  user: {
    username: string;
    ID: string;
    email: string;
    date_of_birth: string;
    avatar: string;
  };
}
function ProfileBox(props: Props) {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const show = () => {
    setShowPopup(!showPopup);
  };
  return (
    <Container>
      {showPopup === true ? (
        <Popup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          ID={props.user.ID}
          onDelete={deleteAccount}
        />
      ) : (
        <>
          <div className="avatar-profile-div">
            <img
              className="avatar"
              src={`data:image/jpeg;base64,${props.user.avatar}`}
              alt="avatar"
            ></img>
            <p>{props.user.username}</p>
          </div>
          <div className="info-profile-div">
            <div>
              <p>user id</p>
              <p>{props.user.ID}</p>
            </div>
            <div>
              <p>username</p> <p>{props.user.username}</p>
            </div>
            <div>
              <p>email</p> <p>{props.user.email}</p>
            </div>
            <div>
              <p>date of birth</p> <p>{props.user.date_of_birth}</p>
            </div>
          </div>
          <button className="form-delete-button" onClick={show}>
            delete account
          </button>
        </>
      )}
    </Container>
  );
}

export default ProfileBox;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 300px;
  height: 400px;
  border: 1px solid rgba(5, 5, 5, 0.4);
  border-radius: 10px;

  .avatar-profile-div {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 10px;

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    p {
      font-size: 24px;
    }
  }
  .info-profile-div {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-evenly;
    div {
      border-radius: 10px;
      padding: 15px;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100%;

      p:first-of-type {
        width: 50%;
      }
      p:nth-of-type(2) {
        width: 50%;
        text-align: center;
      }
    }

    div:nth-of-type(odd) {
      background-color: rgba(5, 5, 5, 0.3);
    }
  }
  .form-delete-button {
    margin: auto;
  }
`;
