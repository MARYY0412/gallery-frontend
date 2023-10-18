import React, { useState } from 'react'
import styled from 'styled-components';
import ListImageElement from './ListImageElement';
import ListUserElement from './ListUserElement';
import GridUserElement from './GridUserElement';
import ImageMiniature from "../images/ImageMiniature";
import Loading from '../Loading';
import { IImage, IUser } from '../../types/Types';
interface Props {
    images: IImage[];
    users: IUser[];
    viewType: "grid" | "list";
    loading: boolean;
}
function ResultsWrapper({viewType, loading, images, users} : Props) {

  return (
<div className="results-div">                       
    
    {loading === true ? <Loading /> : 
    <>
    {viewType === "grid" ? 
    <>
        {users?.map((item: IUser) => {
            return <GridUserElement user={item}/>
        })}
        {images?.map((item) => {
            return <ImageMiniature item={item} index={1}/>
        })}
    </> : <>
        {users?.map((item: IUser) => {
            return <ListUserElement user={item}/>
        })}
        {images?.map((item: IImage) => {
            return <ListImageElement image={item}/>
        })}
    </>}
    </>
    }


</div>
)}

export default ResultsWrapper;


const LoadingBox = styled.div`
    width: 100%;
`
