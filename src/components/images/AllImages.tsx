import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
//redux toolkit
import { useSelector, useDispatch } from "react-redux";
import { setImages } from "../../store/slices/user_Slice";

//types
import { IImage } from "../../types/Types";
import ImageMiniature from "./ImageMiniature";
//react-router-dom
import { Link } from "react-router-dom";
import Loading from "../Loading";
import { RootState } from "../../store/store";

function AllImages() {
  //STATE
  let [loading, setLoading] = useState<boolean>(true);
  //STORE
  const dispatch = useDispatch();
  const user_id = useSelector((state: RootState) => state.user.ID);
  const images = useSelector((state: any) => state.user.images);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/photos/user/${user_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(setImages(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <AllImagesBox>
      {loading === true ? (
        <Loading />
      ) : (
        <>
          {images.length === 0 ? (
            <p className="none-images-p-class">You don't have any images.</p>
          ) : (
            <>
              {images?.map((item: IImage, index: number) => {
                return (
                  <ImageMiniature
                    item={item}
                    index={index}
                    key={`image-${index}`}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </AllImagesBox>
  );
}

export default AllImages;

const AllImagesBox = styled.div`
  width: 100%;
  min-height: 500px;
  padding: 50px;
  text-align: center;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  transition: 2s all;

  .none-images-p-class {
    margin-top: 50px;
    font-size: 20px;
    color: gray;
  }
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  transition: 1s all;
  display: inline-block;
  padding: 5px 0px;
  transition: 1s all;

  :hover {
    transform: translateY(-10px);
  }
`;
