import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { RxDoubleArrowUp } from "react-icons/rx";
import ImageInfo from "./ImageMiniatureInfo";
import AOS from "aos";
import "aos/dist/aos.css";

interface Props {
  item: {
    data: string;
    ID: string;
    user_id: string;
    description: string;
    date_added: string;
    username: string;
    AVGRating: number;
  };
  index: number;
}
function Image(props: Props) {
  const imageLabel = useRef<HTMLDivElement>(null);
  const icon = useRef<HTMLParagraphElement>(null);

  const showLabel = () => {
    imageLabel.current?.classList.add("image-label-active");
    if (icon.current) {
      icon.current.classList.add("arrow-rotated");
    }
  };

  const hideLabel = () => {
    imageLabel.current?.classList.remove("image-label-active");
    if (icon.current) {
      icon.current.classList.remove("arrow-rotated");
    }
  };
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <ImageBox data-aos="fade-up">
      <img
        src={`data:image/jpeg;base64,${props.item.data}`}
        alt="#"
        onMouseEnter={showLabel}
        onMouseLeave={hideLabel}
      />
      <div
        ref={imageLabel}
        className="image-label"
        onMouseEnter={showLabel}
        onMouseLeave={hideLabel}
      >
        <p ref={icon} className="arrow-p">
          <RxDoubleArrowUp style={{ fontSize: "12px", color: "gray" }} />
        </p>
        <ImageInfo item={props.item} />
      </div>
    </ImageBox>
  );
}

export default Image;

const ImageBox = styled.div`
  margin: 10px 15px;
  width: 300px;
  height: 300px;
  transition: 1s all;
  position: relative;
  overflow: hidden;
  img {
    width: 300px;
    height: 300px;
    cursor: pointer;
    transition: 1s all;
    border-radius: 5px;
  }

  img:hover {
    opacity: 0.8;
    transform: scale(1.04);
  }

  .image-label {
    cursor: pointer;
    position: absolute;
    width: 100%;
    height: 100px;
    bottom: -80px;
    background-color: white;

    transition: 1s all;
    overflow: hidden;
  }

  .image-label-active {
    bottom: 20px;
  }
  .arrow-p {
    transition: 1s all;
    height: 5px;
    text-align: center;
  }
  .arrow-rotated {
    transform: rotate(180deg);
    transition: 1s all;
  }
`;
