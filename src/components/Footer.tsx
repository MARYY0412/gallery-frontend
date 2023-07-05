import React from "react";
import styled from "styled-components";

//react-icons
import { BsInstagram, BsYoutube, BsTwitter, BsFacebook } from "react-icons/bs";
function Footer() {
  return (
    <MyFooter>
      <div className="icons-box">
        <BsFacebook className="footer-icon" />
        <BsInstagram className="footer-icon" />
        <BsYoutube className="footer-icon" />
        <BsTwitter className="footer-icon" />
      </div>
      <p className="created-by-class-p">site created by: MR</p>
    </MyFooter>
  );
}

export default Footer;

const MyFooter = styled.div`
  margin-top: 10px;
  background-color: rgba(217, 217, 214, 0.2);

  .icons-box {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .footer-icon {
    width: 60px;
    height: 60px;
    padding: 10px;
    margin: 15px;
    cursor: pointer;
    border-radius: 10px;
    transition: 1s all;
    :hover {
      background-color: rgba(59, 157, 56, 1);
      color: #fff;
    }
  }
  .created-by-class-p {
    text-align: center;
    padding: 5px;
  }
`;
