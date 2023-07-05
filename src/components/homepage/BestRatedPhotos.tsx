import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
//components
import ImageMiniature from "../images/ImageMiniature";
import { IImage } from "../../types/Types";
import { GiTrophyCup } from "react-icons/gi";
import Loading from "../Loading";
function BestRatedPhotos() {
  const [bestRatedImages, setBestRatedImages] = useState<IImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/photos/best-rated")
      .then((data) => {
        setBestRatedImages(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <BestRatedBox>
      {isLoading === true ? (
        <Loading />
      ) : (
        <>
          {bestRatedImages.length === 0 ? (
            <p>no best rated images</p>
          ) : (
            <>
              {bestRatedImages?.map((item: IImage, index) => {
                return (
                  <>
                    {index === 0 && (
                      <BestRatedImageBox key={`image-${index}`}>
                        <GiTrophyCup className="best-rated-icon first-class" />
                        <ImageMiniature item={item} index={index} />
                      </BestRatedImageBox>
                    )}
                    {index === 1 && (
                      <BestRatedImageBox key={`image-${index}`}>
                        <GiTrophyCup className="best-rated-icon second-class" />
                        <ImageMiniature item={item} index={index} />
                      </BestRatedImageBox>
                    )}
                    {index === 2 && (
                      <BestRatedImageBox key={`image-${index}`}>
                        <GiTrophyCup className="best-rated-icon third-class" />
                        <ImageMiniature item={item} index={index} />
                      </BestRatedImageBox>
                    )}
                  </>
                );
              })}
            </>
          )}
        </>
      )}
    </BestRatedBox>
  );
}

export default BestRatedPhotos;

const BestRatedBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const BestRatedImageBox = styled.div`
  text-align: center;
  /* min-height: 100%; */
  .best-rated-icon {
    display: block;
    margin: auto;
    height: 80px;
  }
  .first-class {
    color: gold;
    font-size: 60px;
  }
  .second-class {
    color: silver;
    font-size: 45px;
  }
  .third-class {
    color: burlywood;
    font-size: 30px;
  }
`;
