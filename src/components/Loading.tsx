import React from "react";
import styled from "styled-components";
import { Oval } from "react-loader-spinner";
function Loading() {
  return (
    <LoadingPanelBox>
      <Oval
        height={100}
        width={100}
        color="black"
        secondaryColor="white"
        ariaLabel="ball-triangle-loading"
        visible={true}
      />
      <p>loading...</p>
    </LoadingPanelBox>
  );
}

export default Loading;

const LoadingPanelBox = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .loading-panel {
    * {
      margin: 50px;
    }
  }
`;
