import React, { useEffect } from "react";
import styled from "styled-components";
import homepage from "../components/homepage";
//aos
import AOS from "aos";
import "aos/dist/aos.css";
function Home() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <Content>
      <homepage.Slider />
      <homepage.TitleLabel title="Random user's photos...." />
      <homepage.RandomImages />
      <homepage.TitleLabel title="Best Rated Images" />
      <homepage.BestRatedPhotos />
      <homepage.TitleLabel title="Why should you choose our website?" />
      <homepage.WhyWe />
      <homepage.Subscribe />
    </Content>
  );
}

export default Home;

const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
