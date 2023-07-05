import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
interface Props {
  item: {
    data: string;
    ID: string;
    user_id: string;
    description: string;
    date_added: string;
    username: string;
  };
}
function ImageInfo(props: Props) {
  return (
    <ImageInfoBox>
      <Link to={`/image/${props.item.ID}`}>
        <button className="button-show-picture">
          click here to show the picture
        </button>
      </Link>
      <div className="image-info-div">
        {" "}
        <p>added: {props.item.date_added}</p>
        <p>author: {props.item.username}</p>
      </div>
    </ImageInfoBox>
  );
}

export default ImageInfo;

const ImageInfoBox = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 5px 10px;

  .button-show-picture {
    color: white;
    padding: 8px 10px;
    background-color: rgba(62, 150, 233, 1);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 1s all;
    :hover {
      background-color: rgba(62, 150, 150, 1);
    }
  }

  .image-info-div {
    width: 100%;
    color: gray;
    padding: 1px;
    display: flex;
    justify-content: space-between;

    > p {
      margin: auto;
      font-size: 12px;
    }
  }
`;
