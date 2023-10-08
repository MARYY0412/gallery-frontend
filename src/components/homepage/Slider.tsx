import React, { useState, useEffect } from "react";
import styled from "styled-components";
function Slider() {
  const [slideX, setSlideX] = useState<string>("0px");
  useEffect(() => {
    const interwał = setInterval(() => {
      setSlideX((slideX) => {
        if (slideX === "0px") return "-100%";
        else if (slideX === "-100%") return "-200%";
        else if (slideX === "-200%") return "0px";
        else return slideX; // Dodatkowy warunek, aby zwrócić poprzedni stan, jeśli nie spełnione żadne warunki
      });
    }, 5000);

    return () => {
      clearInterval(interwał);
    };
  }, []);

  return (
    <SliderBox>
      <div
        className="slides-box"
        style={{ transform: `translateX(${slideX})` }}
      >
        <img className="slider-img" src={`./photosSlider/image1.jpg`} alt="#" />
        <img className="slider-img" src={`./photosSlider/image2.jpg`} alt="#" />
        <img className="slider-img" src={`./photosSlider/image3.jpg`} alt="#" />
      </div>
      <AboutUs>
        <p className="form-title-class">Welcome!</p>
        <p className="form-description-class">
          Do you want show off your photos? Maybe you wanna find something to
          download? Do what you want, find your favourites pictures and enjoy
          using the website.
        </p>
      </AboutUs>
    </SliderBox>
  );
}

export default Slider;

const SliderBox = styled.div`
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .slides-box {
    display: flex;
    transition: 1s all;
  }
  .slider-img {
    height: auto;
    width: 100%;
  }

  position: relative;
`;

const AboutUs = styled.div`
  width: 100%;
  height: 200px;
  position: absolute;
  top: 0px;
  background-color: rgba(217, 217, 214, 0.8);
  backdrop-filter: blur(5px);
  padding: 5px 5px 5px 55px;
  text-align: center;
  .form-title-class {
    font-size: 24px;
  }
  .form-description-class {
    color: black;
    font-size: 20px;
    letter-spacing: 1px;
    padding: 20px;
  }

  @media (max-width: 600px) {
    height: 100px;
    .form-title-class {
      font-size: 18px;
    }
    /* padding: 5px 50px; */
    .form-description-class {
      color: black;
      font-size: 12px;
      letter-spacing: 1px;
      padding: 0px;
    }
  }
`;
