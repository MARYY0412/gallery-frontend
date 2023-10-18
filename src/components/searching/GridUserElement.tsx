import React, { useEffect } from 'react'
import styled from 'styled-components';
import { IUser } from '../../types/Types';
import Aos from 'aos';
import { useNavigate } from 'react-router-dom';
interface Props {
  user: IUser;
}
function GridUserElement({user}: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <GridUserElementBox data-aos="fade-up">
    <img src={`data:image/jpeg;base64,${user.avatar}`} alt='cannnot display avatar' className='grid-user-element-image'/>
      <div className='grid-user-element-info'>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.date_of_birth}</p>
        <p>{user.role}</p>
      </div>
      <div className='grid-user-element-actions'>
        <a className='grid-user-element-actions-link' onClick={() => {
          navigate(`/user/${user.ID}`)
        }}>SHOW PROFILE</a>
        <a className='grid-user-element-actions-link' >SEND MESSAGE (still in progress...)</a>
      </div>
    </GridUserElementBox>
  )
}

export default GridUserElement

const GridUserElementBox = styled.div`
  margin: 10px 15px;
  width: 300px;
  height: 300px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: none;
  .grid-user-element-image{
    width: 40%;
    height: 40%;
    object-fit: cover;
    object-position: center center;
  }
  .grid-user-element-info{
    width: 100%;
    > p:first-of-type{
      font-size: 1.2em;
     }
     > p{
      font-size: 0.8em;
      width: 100%;
      margin: 2% 0%;
     }
  }
  .grid-user-element-actions{
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .grid-user-element-actions-link{
    width: 100%;
    font-size: 0.8em;
    padding: 2%;
    background-color: rgba(250, 230, 110, 1);
    margin: 1%;
    text-align: center;

    :hover{
      background-color: rgba(250, 230, 110, 0.7);
      cursor: pointer;
    }
  }
`

