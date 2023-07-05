import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
//types
import { IImage } from "../types/Types";
//REACT LOADER SPINNER
import { Oval } from "react-loader-spinner";
import Menu from "../components/images/Menu";
//redux toolkit
import { useSelector } from "react-redux";
import RateImage from "../components/images/RateImage";
import { RootState } from "../store/store";
import { Loading } from "../components";
import ImageInformations from "../components/images/ImageInformations";
function ImagePage() {
  const navigate = useNavigate();
  let { imageID } = useParams();
  const username = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.ID);
  const [image, setImage] = useState<IImage>({
    ID: "",
    data: "",
    name: "",
    user_id: "",
    description: "",
    date_added: "",
    username: "",
    AVGRating: 0,
    ratings: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/photos/photo/${imageID}`)
      .then((res) => {
        setLoading(false);
        setImage(res.data.data);
      })
      .catch((err) => {
        navigate("/notFound");
      });
  }, []);
  return (
    <Container>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          <img src={`data:image/jpeg;base64,${image.data}`} alt="#" />
          <ImageInformations
            username={image.username}
            name={image.name}
            date_added={image.date_added}
            description={image.description}
            AVGRating={image.AVGRating}
          />
          {userId !== image.user_id && (
            <div>
              <p> Rate image </p>{" "}
              <RateImage imageId={image.ID} ratings={image.ratings} />
            </div>
          )}
          {image.username === username && (
            <Menu ID={image.ID} filename={image.name} />
          )}
        </>
      )}
    </Container>
  );
}

export default ImagePage;

const Container = styled.div`
  .loading-panel {
    margin-top: 150px;
  }
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    max-width: 80vw;
    width: auto;
    height: auto;
    cursor: grab;

    /* @media (max-width: 820px) {
      max-width: 600px;
    } */
    /* @media (max-width: 700px) {
      max-width: 400px;
    } */
    /* @media (max-width: 1400px) {
      max-width: 600px;
    } */
  }
`;
