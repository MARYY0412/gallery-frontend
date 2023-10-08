import React, {useState} from "react";
import styled from "styled-components";
interface Props {
    searchingPhrase: string,
    setSearchingPhrase: React.Dispatch<React.SetStateAction<string>>,
}

function AdminSearchingBar (props: Props) {
    return(
        <SearchingBarBox>
            <p>Filtering data</p>
            <input className="admin-searching-bar-input" placeholder="Type to search..." onChange={(e) => {
                props.setSearchingPhrase(e.target.value)
            }}/>
        </SearchingBarBox>
    )
}

export default AdminSearchingBar;


const SearchingBarBox = styled.div`
    width: 100%;    
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 30px;
    > p{
        font-size: 1.5em;
    }
    .admin-searching-bar-input{
        min-width: 200px;
        width: 30%;
        min-width: 100px;
        background-color: rgba(217, 217, 214, 0.3);
        border: none;
        outline: none;
        /* text-align: center; */
        font-size: 1.5em;
        padding: 10px;
        transition: 1s all;
        :focus{
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
        }
    }
`