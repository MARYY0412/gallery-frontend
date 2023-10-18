import React from 'react'
import styled from 'styled-components'
import { IUser } from '../../types/Types';
interface Props {
  user: IUser;
}
function ListUserElement({user}: Props) {
  console.log(user)
  return (
    <ListUserElementBox>
      <img src={`data:image/jpeg;base64,${user.avatar}`} className="list-user-element-image"/>
      <div className='list-user-element-info'>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.date_of_birth}</p>
        <p>{user.role}</p>
      </div>
      <div className='list-user-element-actions'>
        <a className='list-user-element-actions-link'>show user profile</a>
        <a className='list-user-element-actions-link'>send message</a>
      </div>
    </ListUserElementBox>
  )
}

export default ListUserElement

const ListUserElementBox = styled.div`
  display: flex;
  width: 100%;
  margin: 1%;
  border: 3px solid rgba(1, 1, 1, 0.1);
  border-radius: 10px;
  padding: 1%;
  .list-user-element-image{
    width: 100px;
    height: 100px;
  }
  .list-user-element-info{
    width: 100%;
    margin-left: 1%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    > p:first-of-type{
      font-size: 1.25em;
     }
    > p {
      text-align: left;
      font-size: 0.9em;
    } 
  }
  .list-user-element-actions{
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

  .list-user-element-actions-link{
    :hover{ 
      transform: scale(1.2);
    }
  }
`