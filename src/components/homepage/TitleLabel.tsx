import React from "react";
import styled from "styled-components";
interface Props {
  title: string;
}

function TitleLabel(props: Props) {
  return (
    <Lab>
      <h3 className="form-title-class">{props.title}</h3>
    </Lab>
  );
}

export default TitleLabel;

const Lab = styled.div`
  width: 100%;
  .form-title-class {
    font-size: 24px;
    margin: 50px 0px;
  }
`;
