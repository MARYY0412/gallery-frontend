import React, { useState } from "react";
import styled from "styled-components";
import {SlMagnifier} from "react-icons/sl";
import { Navigate, useNavigate } from "react-router-dom";
import { BiColor } from "react-icons/bi";
interface Props {
    setSearchingPhrase: React.Dispatch<React.SetStateAction<string>>,
}
function MainSearchingBar(props: Props) {
    const [phrase, setPhrase] = useState<string>("")
    const [error, setError] = useState<string>("")
    const navigate = useNavigate();
    const search = (text: String) => {
        // console.log(phrase);
    }
    return(
        <SearchingBarBox>
            <div>
                <input className="main-searching-bar-input" placeholder="Type to search..." onChange={(e) => {
                    setPhrase(e.target.value)
                }}/>
                <SlMagnifier className="main-searching-bar-icon" onClick={() => {
                    props.setSearchingPhrase(phrase)
                    if(phrase.length === 0){
                        setError("Searching input cannot be empty!")
                    } else{
                        navigate("/searching_bar_results")
                    } 

                }}/>
            </div>
            <p style={{color: "red", margin: "10px"}}>{error}</p>
        </SearchingBarBox>
    );
}
export default MainSearchingBar;

const SearchingBarBox = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(217, 217, 214, 0.8);
    /* background: rgb(2,0,36); */
    /* background: linear-gradient(0deg, rgba(217, 217, 214, 1) 50%, rgba(11, 10, 22, 0.1) 120%); */
    > div{
        width: 40%;
        /* border-bottom: 10px double rgba(217, 217, 214,1);
        border-top: 5px double rgba(217, 217, 214,1); */
        display: flex;
        padding: 10px;
        background-color: white;
        
        border-top-left-radius: 10px;
    }
    .main-searching-bar-input{
        width: 100%;
        outline: none;
        border: none;

    }
    .main-searching-bar-icon{
        font-size: 2em;
        height: 100%;
        cursor: pointer;
        color: rgba(217, 217, 214, 1);
    }
`