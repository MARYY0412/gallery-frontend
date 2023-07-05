import React, { useState } from "react";
import styled from "styled-components";
import { deleteImageByUser } from "../../utils/BackendMethods";

import { useNavigate } from "react-router-dom";
import Popup from "../Popup";
function Menu(props: { ID: string; filename: string }) {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // const deleteHandler = () => {
  //   deleteImageByUser(props.ID, props.filename)
  //     .then((data) => {
  //       console.log(data);
  //       setErrorMessage("");
  //       navigate("/");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setErrorMessage("cannot delete image, try again later!");
  //     });
  // };

  const show = () => {
    setShowPopup(true);
  };
  return (
    <MenuBox>
      {showPopup === true ? (
        <Popup
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          ID={props.ID}
          filename={props.filename}
          onDelete={deleteImageByUser}
        />
      ) : (
        <>
          <button className="form-delete-button" onClick={show}>
            delete
          </button>
          {/* <button className="form-button-class" onClick={updateHandler}>
        update
      </button> */}
        </>
      )}
    </MenuBox>
  );
}

export default Menu;

const MenuBox = styled.div`
  display: grid;
  grid-template:
    "a b"
    "c c";
  align-items: center;
  .form-error-p {
    text-align: center;
    grid-column: 1 / 3;
  }
`;
