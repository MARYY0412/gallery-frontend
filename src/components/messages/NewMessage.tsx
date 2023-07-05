import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import axios from "axios";
function NewMessage() {
  const user = useSelector((state: RootState) => state.user);
  const [recipent, setRecipent] = useState<string>("");
  const [recipentErr, setRecipentErr] = useState<string>("");
  const [recipentInfo, setRecipentInfo] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [content, setContent] = useState<string>("");
  //inputs handle
  const handleTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
  const handleRecipent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipent(e.target.value);
  };
  //submit button handle
  const handleSendMessButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    checkRecipentsInput();

    axios
      .post("http://127.0.0.1:3001/messages/send")
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .post("http://127.0.0.1:3001/messages/check-recipents", {
        data: recipent,
      })
      .then((data) => {
        const incorrectRecipents = data.data.filter(
          (item: { username: string; flag: boolean }) => item.flag === false
        );
        if (incorrectRecipents.length !== 0) {
          setRecipentErr(
            `these recipents are incorrect ${incorrectRecipents.map(
              (item: { username: string; flag: boolean }) => item.username
            )}`
          );
          setRecipentInfo("");
        } else {
          setRecipentInfo("Recipents OK");
          setRecipentErr("");

          axios
            .post("http://127.0.0.1:3001/messages/send")
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setRecipentErr("something went wrong, check recipents");
        setRecipentInfo("");
      });
  };
  const handleBlurRecipent = () => {
    // checkRecipentsInput().then((data) => {
    //   // if (data.status) {
    //   // }
    // });
    // console.log(check);
    axios
      .post("http://127.0.0.1:3001/messages/check-recipents", {
        data: recipent,
      })
      .then((data) => {
        const incorrectRecipents = data.data.filter(
          (item: { username: string; flag: boolean }) => item.flag === false
        );
        if (incorrectRecipents.length !== 0) {
          setRecipentErr(
            `some recipents are incorrect ${incorrectRecipents.map(
              (item: { username: string; flag: boolean }) => item.username
            )}`
          );
          setRecipentInfo("");
        } else {
          setRecipentInfo("Recipents OK");
          setRecipentErr("");
        }
      })
      .catch((err) => {
        console.log(err);
        setRecipentErr("something went wrong, check recipents");
        setRecipentInfo("");
      });
  };
  const checkRecipentsInput = async () => {
    await axios
      .post("http://127.0.0.1:3001/messages/check-recipents", {
        data: recipent,
      })
      .then((data) => {
        const incorrectRecipents = data.data.filter(
          (item: { username: string; flag: boolean }) => item.flag === false
        );
        if (incorrectRecipents.length === 0) return { status: true, data: [] };
        else return { status: false, data: incorrectRecipents };
      })
      .catch((err) => {
        console.log(err);
        return { status: false, data: [] };
      });
  };
  return (
    <Box>
      <p className="label-p">From: {user.username}</p>
      <input
        type="text"
        value={recipent}
        onChange={handleRecipent}
        onBlur={handleBlurRecipent}
        className="recipent-input"
        placeholder="recipents"
      />
      <p>You can add many recipents. Example: recipent1, recipent2 ....</p>
      <p className="recipent-error-p">{recipentErr}</p>
      <p className="recipent-info-p">{recipentInfo}</p>
      <input
        type="text"
        value={theme}
        onChange={handleTheme}
        className="recipent-input"
        placeholder="theme"
      />

      <textarea
        className="content-textarea"
        name=""
        id=""
        onChange={handleTextarea}
        value={content}
        maxLength={255}
      ></textarea>
      <button
        className={
          recipentErr.length === 0
            ? "form-button-class-2"
            : "form-button-class-2 button-disabled"
        }
        onClick={handleSendMessButton}
        disabled={recipentErr.length === 0 ? false : true}
      >
        SEND
      </button>
      <p className="length-textarea-p">
        {content.length}/{255}
      </p>
    </Box>
  );
}

export default NewMessage;

const Box = styled.div`
  max-width: 400px;

  > * {
    margin: 5px 0px;
    outline: none;
  }
  .recipent-input {
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    text-align: left;
    font-size: 15px;
    outline: none;
    width: 100%;
    padding: 5px 15px;
  }
  .recipent-error-p {
    color: red;
  }
  .recipent-info-p {
    color: green;
  }
  .content-textarea {
    font-size: 18px;
    padding: 15px;
    width: 100%;
    min-height: 300px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    resize: none;
  }

  .length-textarea-p {
    text-align: right;
  }
`;
