import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {HiOutlineViewGrid, HiOutlineViewList} from "react-icons/hi"
interface Props {
    searchingPhrase: string,
}
// const table = [
//     {
//         name: "eldoka"
//     },
//     {},
//     {},
//     {},
//     {},
// ]

function SearchingBarResults(props: Props) {

    const search = () => {
        console.log("searching in progress..")
    }
    const [viewType, setViewType] = useState<"list" | "grid">("grid")
    const [results, setResults] = useState<any[]>([])
    const [numberOfResults, setNumberOfResults] = useState<number>(0)
    const [activeFilter, setActiveFilter] = useState<"users" | "images" | "all">("all")
    return(
        <SearchingBarResultsBox>
            <div className="results-searching-bar">
                <input type="text" placeholder="Type to search..."/>
                <button onClick={() => {search()}}>FIND</button>
            </div>
            <h3 className="results-title">Results for "{props.searchingPhrase}" phrase ({numberOfResults})
                <div>
                    <HiOutlineViewGrid className={viewType === "grid" ? "view-active" : ""} onClick={() => setViewType("grid")}/>
                    <HiOutlineViewList className={viewType === "list" ? "view-active" : ""} onClick={() => setViewType("list")}/>
                </div>
            </h3>
            <div className="results-container">
                <div className="filters-wrapper">
                    <h3>Filters</h3>
                        <p className={activeFilter === "all" ? "active" : ""} onClick={() => {
                            setActiveFilter("all")
                        }}>all</p>
                        <p className={activeFilter === "users" ? "active" : ""} onClick={() => {
                            setActiveFilter("users")
                        }}>users</p>
                        <p className={activeFilter === "images" ? "active" : ""} onClick={() => {
                            setActiveFilter("images")
                        }}>images</p>
                        {activeFilter === "images" ? (                    
                        <div className="filters-categories">
                            <div>
                            <input type="checkbox" id="nature"/>
                            <label htmlFor="nature">nature</label>
                            </div>
                            <div>
                            <input type="checkbox" id="animals"/>
                            <label htmlFor="animals">animals</label>
                            </div>
                            <div>
                            <input type="checkbox" id="travel"/>
                            <label htmlFor="travel">travel</label>
                            </div>
                            <div>
                            <input type="checkbox" id="art"/>
                            <label htmlFor="art">art</label>
                            </div>
                            <div>
                            <input type="checkbox" id="others"/>
                            <label htmlFor="others">others</label>
                            </div>
                        </div>) : <></>}

                </div>
                <div className={viewType === "list" ? "results-div list-class" : "results-div grid-class"}>
                    <p>s</p>
                    <p>ssad</p>
                    <p>sads</p>
                    <p>sdas</p>
                    <p>s</p>
                    <p>ssad</p>
                    <p>sads</p>
                    <p>sdas</p>
                    <p>s</p>
                    <p>ssad</p>
                    <p>sads</p>
                    <p>sdas</p>
                    <p>s</p>
                    <p>ssad</p>
                    <p>sads</p>
                    <p>sdas</p>
                </div>
            </div>
        </SearchingBarResultsBox>
    );
}
 

export default SearchingBarResults;


const SearchingBarResultsBox = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 10%;
    display: flex;
    flex-direction: column;
    .results-searching-bar{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        > input[type="text"]{
            outline: none;
            width: 40%;
            font-size: 1.5em;
            padding: 5px;
        }
        > button {
            width: 20%;
            /* margin: 5%; */
            padding: 0.5%;
            font-size: 1.5em;
            color: gray;
            letter-spacing: 5px;
        }
    }
    .results-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5% 0%;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

        > div {
            display: flex;
            > * {
                font-size: 2em;
                margin: 0px 10px;
                cursor: pointer;
                border-radius: 5%;
            }
        }
        .view-active{
            background-color: rgba(1, 1, 1, 0.2);
        }
    }
    .results-container{
        width: 100%;
        display: flex;
    }
    .filters-wrapper{
        min-width: 200px;
        display: flex;
        flex-direction: column;
        > p{
            margin: 10px 0px;
            width: 100%;
            text-align: center;
            border-bottom: 1px solid transparent;
            cursor: pointer;
            :hover{
                border-bottom: 1px solid lightgray;
            }
        }

        .active{
                border-bottom: 1px solid lightgray;
                font-weight: 600;
            }
    }
    .filters-categories{
        > div {
            padding: 0px;
            margin: 0px;

            
            > input{
            margin: 20px 5px;
            }
        }


        
    }
    .results-div{
        width: 100%;
        height: auto;
        padding: 1%;
        }
        .list-class{
            > p {
                width: 100%;
                text-align: center;
                padding: 5%;
                background-color: lightgray;
                margin: 2% 0%;
            }
        }
        .grid-class{
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            > p {
                margin: 1%;
                width: 200px;
                height: 300px;
                border: 1px solid gray;
            }
        }
`
