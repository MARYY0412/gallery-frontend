import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AiOutlineStar } from "react-icons/ai";
import { IRating } from "../../types/Types";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../store/store";
interface Props {
  imageId: string;
  ratings: IRating[];
}
function RateImage(props: Props) {
  const userId = useSelector((state: RootState) => state.user.ID);

  const [ratingValue, setRating] = useState<string>("");

  const [active1, setActive1] = useState<boolean>(false);
  const [active2, setActive2] = useState<boolean>(false);
  const [active3, setActive3] = useState<boolean>(false);
  const [active4, setActive4] = useState<boolean>(false);
  const [active5, setActive5] = useState<boolean>(false);
  const handleMouseEnter = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setStarsActive(e.currentTarget.id);
  };

  const handleMouseOver = () => {
    console.log(ratingValue);
    setStarsActive(ratingValue);
  };

  const handleSubmitRating = (e: React.MouseEvent<SVGSVGElement>) => {
    let x = e.currentTarget.id;
    if (e.currentTarget) {
      ////send rating
      axios
        .post("http://127.0.0.1:3001/photos/rate-image", {
          imageId: props.imageId,
          userId: userId,
          value: e.currentTarget.id,
        })
        .then((data) => {
          console.log(data);
          setRating(x);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const setStarsActive = (value: string) => {
    switch (value) {
      case "":
        setActive1(false);
        setActive2(false);
        setActive3(false);
        setActive4(false);
        setActive5(false);
        break;
      case "1":
        setActive1(true);
        setActive2(false);
        setActive3(false);
        setActive4(false);
        setActive5(false);
        break;
      case "2":
        setActive1(true);
        setActive2(true);
        setActive3(false);
        setActive4(false);
        setActive5(false);
        break;
      case "3":
        setActive1(true);
        setActive2(true);
        setActive3(true);
        setActive4(false);
        setActive5(false);
        break;
      case "4":
        setActive1(true);
        setActive2(true);
        setActive3(true);
        setActive4(true);
        setActive5(false);
        break;
      case "5":
        setActive1(true);
        setActive2(true);
        setActive3(true);
        setActive4(true);
        setActive5(true);
        break;
      default:
        console.log("incorrect value!");
        break;
    }
  };

  useEffect(() => {
    let isRatedByUser = props.ratings.filter(
      (item) => userId === item.userId && props.imageId === item.imageId
    );
    if (isRatedByUser.length === 0) setStarsActive("0");
    else {
      setStarsActive(isRatedByUser[0].value.toString());
      setRating(isRatedByUser[0].value.toString());
    }
  }, []);

  return (
    <Box>
      <AiOutlineStar
        className={
          active1 === false
            ? "rating-image-icon"
            : "rating-image-icon active-icon"
        }
        id="1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseOver}
        onClick={handleSubmitRating}
      />

      <AiOutlineStar
        className={
          active2 === false
            ? "rating-image-icon"
            : "rating-image-icon active-icon"
        }
        id="2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseOver}
        onClick={handleSubmitRating}
      />

      <AiOutlineStar
        className={
          active3 === false
            ? "rating-image-icon"
            : "rating-image-icon active-icon"
        }
        id="3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseOver}
        onClick={handleSubmitRating}
      />

      <AiOutlineStar
        className={
          active4 === false
            ? "rating-image-icon"
            : "rating-image-icon active-icon"
        }
        id="4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseOver}
        onClick={handleSubmitRating}
      />

      <AiOutlineStar
        className={
          active5 === false
            ? "rating-image-icon"
            : "rating-image-icon active-icon"
        }
        id="5"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseOver}
        onClick={handleSubmitRating}
      />
    </Box>
  );
}

export default RateImage;

const Box = styled.div`
  .rating-image-icon {
    font-size: 30px;
    cursor: pointer;
  }
  .active-icon {
    color: yellow;
  }
`;
