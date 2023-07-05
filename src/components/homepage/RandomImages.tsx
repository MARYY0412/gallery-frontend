import React, { useEffect, useState } from "react";
import styled from "styled-components";
//components
import ImageMiniature from "../images/ImageMiniature";
//backend methods
import { IImage } from "../../types/Types";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import Loading from "../Loading";

function RandomImages() {
  const [randomImages, setRandomImages] = useState<IImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3001/photos/random/3`)
      .then((data) => {
        setRandomImages(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Random>
      {isLoading === true ? (
        <Loading />
      ) : (
        <>
          {randomImages.length === 0 ? (
            <p>no random images</p>
          ) : (
            <>
              {randomImages?.map((item, index) => {
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
    </Random>
  );
}

export default RandomImages;

const Random = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
