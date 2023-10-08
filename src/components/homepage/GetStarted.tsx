import React, { useEffect } from "react";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";

function GetStarted() {

    useEffect(() => {
        AOS.init();
      }, []);
    return(
        <GetStartedBox data-aos="zoom-in"
        data-aos-offset="300"
        data-aos-easing="linear">
            <button id="get-started-button-id" className="get-started-button">GET STARTED</button>
            <img className="get-started-image" src={`./getstarted/getstarted.jpg`}alt="getstartedimage"/>
        </GetStartedBox>
    );
}

export default GetStarted;

const GetStartedBox = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    position: relative;
    .get-started-button{
        position: absolute;
        top: 50%;
        border: 5px double gray;
        background-color: rgba(255,255,255,0.4);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 1.5;
        letter-spacing: 8px;
        padding: 20px 60px;
        transition: 2s all;
        :hover{
            cursor: pointer;
            background-color: rgba(255,255,255,0.8);
            transform: scale(1.05);
        }
    }
    .get-started-image{
        /* margin: 100px; */
        width: 100%;
        :hover{

        }
    }
`