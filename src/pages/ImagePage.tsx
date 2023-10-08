import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {FcShare} from "react-icons/fc";
import {FcDownload} from "react-icons/fc";

import Subscribe from "../components/homepage/Subscribe";
import styled from "styled-components";
//types
import { IImage } from "../types/Types";
//REACT LOADER SPINNER
import Menu from "../components/images/Menu";
//redux toolkit
import { useSelector } from "react-redux";
import RateImage from "../components/images/RateImage";
import { RootState } from "../store/store";
import { Loading } from "../components";
import UserMiniature from "../components/users/UserMiniature";
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
        <UserMiniature userId={image.user_id}/>
        <div className="image-page-actions">
          <span className="actions-icon" title="Share"><FcShare title="Share"/></span>
          <span className="actions-icon" title="Download"><FcDownload title="Download"/></span>
        </div>
          <img src={`data:image/jpeg;base64,${image.data}`} alt="#" />
     
            <div className="image-page-rate">
              <p className="average-rating">4.75 average rating</p>
              {userId !== image.user_id && (
              <RateImage imageId={image.ID} ratings={image.ratings} />
              )}
            </div>
         
          {image.username === username && (
            <Menu ID={image.ID} filename={image.name} />
          )}
        </>
      )}
    <Subscribe />
    </Container>
  );
}

export default ImagePage;

const Container = styled.div`
  width: 90vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .loading-panel {
    margin-top: 150px;
  }
  img {
    width: 100%;
    height: auto;
    cursor: grab;
  }
  //actions div
  .image-page-actions{
    /* width: 100%; */
    width: 80vw;
    font-size: 2em;
    text-align: right;
    /* display: flex; */
  }
  .actions-icon{
    cursor: pointer;
    margin: 0px 20px;

    :hover{
      opacity: 0.8;
    }
  }
  //image ratings div
  .image-page-rate{
    font-size: 1em;
    padding: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .average-rating{
    color: gray;
  }
  
`;
