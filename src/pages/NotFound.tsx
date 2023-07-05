import { Link } from "react-router-dom";
import styled from "styled-components";
import { RxCross1 } from "react-icons/rx";
type Props = {
  theme: string;
};
function NotFound(props: Props) {
  return (
    <NotFoundBox>
      <p>
        <RxCross1 className="not-found-icon" />
        <p>
          Cannot find URL,&nbsp;
          <StyledLink
            to={"/"}
            style={props.theme === "dark-theme" ? { color: "#FFF" } : {}}
          >
            click here
          </StyledLink>
          &nbsp;to back to hemapage!
        </p>
      </p>
    </NotFoundBox>
  );
}

export default NotFound;
const NotFoundBox = styled.div`
  margin-top: 150px;
  min-height: 80vh;
  > p {
    padding: 10px 30px;
    width: 800px;
    border-radius: 20px;
    border: 1px solid lightgray;

    display: grid;
    grid-template-columns: 20% 80%;
    align-items: center;

    > p {
      text-align: center;
    }
    @media (max-width: 1000px) {
      font-size: 14px;
      width: 500px;
    }
    @media (max-width: 600px) {
      font-size: 14px;
      width: 400px;
    }
  }
  .not-found-icon {
    display: block;
    font-size: 80px;
    color: darkgray;
    //animation
    animation: icon-animation;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-direction: alternate;

    //media
    @media (max-width: 800px) {
      font-size: 60px;
    }
  }

  @keyframes icon-animation {
    0% {
      opacity: 1;
    }
    10% {
      opacity: 0.9;
    }
    20% {
      opacity: 0.8;
    }
    20% {
      opacity: 0.7;
    }
    40% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.5;
    }
    60% {
      opacity: 0.6;
    }
    70% {
      opacity: 0.7;
    }
    80% {
      opacity: 0.8;
    }
    90% {
      opacity: 0.9;
    }
    100% {
      opacity: 1;
    }
  }
`;
const StyledLink = styled(Link)`
  font-weight: 600;
  transition: 1s all;
  display: inline-block;
  padding: 5px 0px;
  transition: 1s all;

  :hover {
    transform: translateY(-10px);
  }
`;
