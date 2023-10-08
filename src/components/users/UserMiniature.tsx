import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

interface Props {
    userId: string
}
function UserMiniature({userId}: Props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    useEffect(() => {
        axios.get(`http://127.0.0.1:3001/users/user-miniature-info/${userId}`).then((response:any) => {
            setUsername(response.data.username);
            setAvatar(response.data.avatar);
        })
        
    }, [])
    return (
        <UserMiniatureBox>
            <img className="user-miniature-avatar" src={`data:image/jpeg;base64,${avatar}`} alt="avatar"/>
            <div className='user-info'>
                <p>{username}</p>
                <p className='show-profile-link' onClick={() => {navigate(`/user/${userId}`)}}>click to show the profile</p>
            </div>
        </UserMiniatureBox>
    )
}

export default UserMiniature

const UserMiniatureBox = styled.div`
display: flex;
align-items: center;
margin-left: 30%;
width: 100%;
height: 150px;
.user-miniature-avatar{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 0px 20px;
}

.show-profile-link{
    font-size: 0.8em;
    margin-top: 5px;
    cursor: pointer;

    :hover{
        color: gray;
    }
}
`