import React, { useState } from "react";
import styled from "styled-components";
import AllImages from "../components/images/AllImages";
import AddImage from "../components/images/AddImage";
import AddImages from "../components/images/AddImages";

import { BiSelectMultiple, BiShow } from "react-icons/bi";
import { AiOutlinePicture } from "react-icons/ai";
function YourGallery() {
  const [activeComponent, setActiveComponent] = useState<
    "add-image" | "add-images" | "all-images"
  >("add-images");

  return (
    <YourGalleryComponent>
      <div className="render-nav">
        <p
          className={
            activeComponent === "add-image"
              ? "render-nav-link active-link"
              : "render-nav-link"
          }
          onClick={() => setActiveComponent("add-image")}
        >
          <AiOutlinePicture className="render-nav-link-icon" />
          <p>Add image</p>
        </p>
        <p
          className={
            activeComponent === "all-images"
              ? "render-nav-link active-link"
              : "render-nav-link"
          }
          onClick={() => setActiveComponent("all-images")}
        >
          <BiShow className="render-nav-link-icon" />
          <p>All images</p>
        </p>
        <p
          className={
            activeComponent === "add-images"
              ? "render-nav-link active-link"
              : "render-nav-link"
          }
          onClick={() => setActiveComponent("add-images")}
        >
          <BiSelectMultiple className="render-nav-link-icon" />
          <p>Add multiple images</p>
        </p>
      </div>
      <div className="render-nav-content">
        {activeComponent === "add-image" && <AddImage />}
        {activeComponent === "all-images" && <AllImages />}
        {activeComponent === "add-images" && <AddImages />}
      </div>
    </YourGalleryComponent>
  );
}

export default YourGallery;

const YourGalleryComponent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
