import React from 'react'
import styled from 'styled-components';
import { IImage } from '../../types/Types';
interface Props {
  image: IImage;
}
function ListImageElement({ image }: Props) {
  return (
    <ListImageElementBox>     
    <img src={`data:image/jpeg;base64,${image.data}`} className='list-image-element-image'/>
      <div className='list-image-element-info'>
        <p className='list-image-element-info-author'>Author: {image.username}</p>
        <p className='list-image-element-info-description'>{image.description === "" ? image.description : "none description" }</p>
        <div className='list-image-element-info-other-info'>
          <p>Added: {image.date_added}</p>
          <p>AVG Rating: 4.75</p>
        </div>
      </div>
      <div className='list-image-element-actions'>
        <a className='list-image-element-actions-link'>Show Author Profile</a>
        <a className='list-image-element-actions-link'>Show Image</a>
      </div>
    </ListImageElementBox>
  )
}

export default ListImageElement

const ListImageElementBox = styled.div`
  height: fit-content;
  display: flex;
  width: 100%;
  margin: 1%;
  border: 3px solid rgba(1, 1, 1, 0.1);
  border-radius: 10px;
  padding: 1%;
  .list-image-element-image{
    width: 100px;
    height: 100px;
  }
  .list-image-element-info{
    width: 100%;
    max-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > p:first-of-type{
      font-size: 1.25em;
     }
     > p {
      
     }
    .list-image-element-info-author{
      text-align: left;
      margin-left: 1%;
    } 
    .list-image-element-info-description{
      font-size: 0.8em;
      overflow: hidden;
      max-height: 4em;
      border-radius: 5px;
      padding: 0% 2%;
      text-align: justify;

    }
    .list-image-element-info-other-info{
      display: flex;
      justify-content: space-between;
      font-size: 0.8em;
      color: gray;
      padding: 0% 1%;
    }  
  }
  .list-image-element-actions{
    height: fit-content;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
    text-align: center;
    font-size: 0.9em;
    > a{
      margin: 0px 5px;
      color: gray;
      :hover{
        cursor: pointer;
      }
    }
  }

  transition: 0.1s all;
  :hover{
    transform: scale(1.02);
  }

  .list-image-element-actions-link{
    :hover{ 
      transform: scale(1.2);
    }
  }
`
