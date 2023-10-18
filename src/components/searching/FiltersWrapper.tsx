import React, { useState } from 'react'
import styled from 'styled-components'
interface Props{
    activeFilter: string;
    setActiveFilter: React.Dispatch<React.SetStateAction<"users" | "images" | "all">>;
    fetchUsers: (phrase: string) => void;
    fetchImages: (phrase: string) => void;
    fetchAll: (phrase: string) => void;
    phrase: string,
}
function FiltersWrapper({activeFilter, setActiveFilter, phrase, fetchAll, fetchImages, fetchUsers}: Props) {
  return (
    <FiltersWrapperBox>
                    <h3>Filters</h3>
                        <p className={activeFilter === "all" ? "active" : ""} onClick={() => {
                            setActiveFilter("all");
                            fetchAll(phrase);
                        }}>all</p>
                        <p className={activeFilter === "users" ? "active" : ""} onClick={() => {
                            setActiveFilter("users")
                            fetchUsers(phrase)
                        }}>users</p>
                        <p className={activeFilter === "images" ? "active" : ""} onClick={() => {
                            setActiveFilter("images")
                            fetchImages(phrase)
                        }}>images</p>
                        {activeFilter === "images" ? (                    
                        <div className="filters-categories">
                            <div>
                            <input disabled={true} type="checkbox" id="nature"/>
                            <label htmlFor="nature">nature</label>
                            </div>
                            <div>
                            <input disabled={true} type="checkbox" id="animals"/>
                            <label htmlFor="animals">animals</label>
                            </div>
                            <div>
                            <input disabled={true} type="checkbox" id="travel"/>
                            <label htmlFor="travel">travel</label>
                            </div>
                            <div>
                            <input disabled={true} type="checkbox" id="art"/>
                            <label htmlFor="art">art</label>
                            </div>
                            <div>
                            <input disabled={true} type="checkbox" id="others"/>
                            <label htmlFor="others">others</label>
                            </div>

                            <button className='apply-filters-button'>APPLY (still in progress...)</button>
                        </div>) : <></>}
                </FiltersWrapperBox>
  )
}

export default FiltersWrapper


const FiltersWrapperBox = styled.div`
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
        .filters-categories{
        > div {
            padding: 0px;
            margin: 0px;
            display: flex;
            align-items: center;
            > input{
                display: block;
                margin: 20px 5px;
            }
        }


        
        }
        .apply-filters-button{
            background-color: rgba(250, 230, 110, 1);
            border: none;
            width: 100%;
            padding: 2% 10%;
            margin: 5% 0%;
            cursor: pointer;
            :hover{
                background-color: rgba(250, 230, 110, 0.7);
            }
        }

`