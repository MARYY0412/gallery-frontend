import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Timer from "./Timer";

interface Props {
  showPopup: boolean;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
  ID: string;
  filename?: string;
  onDelete: Function;
  // logout?: boolean;
}

function Popup(props: Props) {
  const [redirecting, setRedirecting] = useState<boolean>(false);
  const noClick = () => {
    props.setShowPopup(!props.showPopup);
  };

  const yesClick = () => {
    if (props.filename === undefined) {
      props
        .onDelete(props.ID)
        .then((data: any) => {
          setRedirecting(true);
          console.log(data);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      props
        .onDelete(props.ID, props.filename)
        .then((data: any) => {
          setRedirecting(true);
          console.log(data);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };
  return (
    <PopupBox>
      {redirecting === true ? (
        <Timer label="success" placeToRedirect="yourGallery" />
      ) : (
        <>
          {" "}
          <h4 className="form-title-class">Are you sure?</h4>
          <button className="form-delete-button" onClick={yesClick}>
            yes
          </button>
          <button className="form-button-class" onClick={noClick}>
            no, back!
          </button>
        </>
      )}
    </PopupBox>
  );
}

export default Popup;

const PopupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
