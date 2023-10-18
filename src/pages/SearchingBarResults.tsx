import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {HiOutlineViewGrid, HiOutlineViewList} from "react-icons/hi"
import FiltersWrapper from "../components/searching/FiltersWrapper";
import ResultsWrapper from "../components/searching/ResultsWrapper";
import { SlMagnifier } from "react-icons/sl";
import { IImage, IUser } from "../types/Types";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
interface Props {
    searchingPhrase: string,
}

function SearchingBarResults(props: Props) {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const navigate = useNavigate();
 
    const fetchAll = async (phrase: string) => {
        setLoading(true);
        try{
            let results = await axios.get(`http://127.0.0.1:3001/search/all`, {
                params: {query: phrase}
            });
            setImages(results.data.images);     
            setUsers(results.data.users);
            setNumberOfResults(results.data.users.length+results.data.images.length)
            setError("")
            setLoading(false)
        }catch(err){
            setError("Cannot find any results")
            setLoading(false)
        }

    }
    const fetchImages = async (phrase:string) => {
        setLoading(true);
        try{
            let results = await axios.get(`http://127.0.0.1:3001/search/images`, {
                params: {query: phrase}
            });

            setImages(results.data.images);     
            setUsers([]);
            setNumberOfResults(results.data.images.length);
            setError("")
            setLoading(false)
        }catch(err){
            setError("Cannot load any images!!")
            setLoading(false)
        }

    }
    const fetchUsers = async (phrase:string) => {
        setLoading(true);
        try{
            let results = await axios.get(`http://127.0.0.1:3001/search/users`, {
                params: {query: phrase}
            });
            setNumberOfResults(results.data.users.length);
            setImages([]);  
            setUsers(results.data.users);
            setError("");
            setLoading(false);
        }catch(err){
            setError("Cannot load any images!!");
            setLoading(false)
        }

    }
    const [error, setError] = useState<string>("")
    const [phrase, setPhrase] = useState<string>((query !== null ? query : ""))
    const [viewType, setViewType] = useState<"list" | "grid">("grid")
    const [numberOfResults, setNumberOfResults] = useState<number>(0)
    const [activeFilter, setActiveFilter] = useState<"users" | "images" | "all">("all");
    const [loading, setLoading] = useState<boolean>(true);
    const [images, setImages] = useState<IImage[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);


    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/search/all`, {
                params: {query: phrase}
            }).then(results => {
                setImages(results.data.images);
                setUsers(results.data.users);
                setLoading(false)
                setError("")
            }).catch(err => {
                console.log("cannot fetch the data!")
                setLoading(false)
            })
    }, [])
    return(
        <SearchingBarResultsBox>
            <div className="results-searching-bar">
            <div>
                <input className="main-searching-bar-input" placeholder="Type to search..." onChange={(e) => {
                    setPhrase(e.target.value)
                }}/>
                <SlMagnifier className="main-searching-bar-icon" onClick={() => {
                        fetchAll(phrase)
                        setActiveFilter("all")
                        navigate(`/searching_bar_results?query=${phrase}`)
                }}/>
            </div>
            </div>
            <h3 className="results-title">Number of results({numberOfResults})
                <div>
                    <HiOutlineViewGrid className={viewType === "grid" ? "view-active" : ""} onClick={() => setViewType("grid")}/>
                    <HiOutlineViewList className={viewType === "list" ? "view-active" : ""} onClick={() => setViewType("list")}/>
                </div>
            </h3>
            <div className="results-container">
                    <FiltersWrapper activeFilter={activeFilter} setActiveFilter={setActiveFilter} fetchImages={fetchImages} fetchUsers={fetchUsers} fetchAll={fetchAll} phrase={phrase}/>
                    {error.length !== 0 ? 
                    <ErrorBox><p>{error}</p></ErrorBox> 
                    : 
                    <ResultsWrapper viewType={viewType} loading={loading} images={images} users={users}/>
                    }
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

    > div{
        width: 40%;
        display: flex;
        padding: 10px;
        background-color: white;
        border-top-left-radius: 10px;
    }
    .main-searching-bar-input{
        width: 100%;
        outline: none;
        border: none;
        border-bottom: 1px solid rgba(1, 1, 1, 0.1);
        padding-left: 5px;
    }
    .main-searching-bar-icon{
        font-size: 2em;
        height: 100%;
        cursor: pointer;
        color: rgba(217, 217, 214, 1);
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
        text-align: center;
        @media screen and (max-width: 768px){
            display: flex;
            flex-direction: column;
        }
    }
    //classes for displaying data
    .results-div {
        width: 100%;
        padding: 0% 1%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: center;
    }
`

const ErrorBox = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > p {
        font-size: 3em;
    }
`
