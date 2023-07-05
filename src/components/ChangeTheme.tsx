import React, { useRef } from "react";
import styled from "styled-components";

type Props = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
};
function ChangeTheme(props: Props) {
  const refer = useRef();

  const changeTheme = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.theme === "light-theme") props.setTheme("dark-theme");
    else props.setTheme("light-theme");
  };

  return (
    <Container>
      <Toggle
        onClick={changeTheme}
        style={
          props.theme === "light-theme"
            ? {
                paddingLeft: "0px",
                backgroundColor: "rgba(11, 30, 72, 0.9)",
              }
            : {
                paddingLeft: "25px",
                backgroundColor: "#fff",
              }
        }
      >
        <Switch></Switch>
      </Toggle>
    </Container>
  );
}

export default ChangeTheme;

const Container = styled.div`
  margin: 0px 5px;
  width: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Toggle = styled.div`
  width: 50px;
  height: 20px;
  position: relative;
  margin-left: 0px;
  cursor: pointer;
  transition: 0.5s all;
`;

const Switch = styled.div`
  width: 25px;
  height: 20px;
  background-color: white;
  border: 1px solid black;
`;
