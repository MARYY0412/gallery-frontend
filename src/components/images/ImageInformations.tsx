import React from "react";
import styled from "styled-components";
interface Props {
  username: string;
  name: string;
  description: string;
  date_added: string;
  AVGRating: number;
}
function ImageInformations({
  username,
  name,
  description,
  date_added,
  AVGRating,
}: Props) {
  return (
    <Informations>
      <div>
        <p>username</p> <p>{username}</p>
      </div>
      <div>
        <p>name of file </p>
        <p> {name}</p>
      </div>
      <div>
        <p> description </p>
        <p> {description === null ? "no description" : description}</p>
      </div>
      <div>
        <p> date added </p>
        <p> {date_added}</p>
      </div>
      <div>
        <p> AVG rating </p>
        <p> {AVGRating === null ? "not rated yet" : AVGRating}</p>
      </div>
    </Informations>
  );
}

export default ImageInformations;

const Informations = styled.div`
  padding: 10px;
  width: 400px;
  > div > p {
    width: 100%;
  }
  > div > p:first-child {
    font-size: 14px;
    text-align: left;
    padding-left: 20px;
    font-weight: 600;
  }

  > div > p:nth-child(2) {
    font-size: 12px;
    text-align: center;
    padding: 5px 5px 5px 50px;
    color: darkgray;
  }
`;
