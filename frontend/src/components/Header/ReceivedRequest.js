import React from 'react';
import styled from 'styled-components';
import UserAvatar from '../UserAvatar';
import axios from 'axios';

//  >>>>>> icon <<<<<<<
import { RxCross2,RxCheck } from 'react-icons/rx'






//------------- Styling -------------// 

const Friend = styled.div`
    position: relative;
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    align-items: center;
   
    .button-container{
        display: flex;
        justify-content: flex-end;
        .icon{
            background-color:#F2F2F2 ;
            padding: 3px;
            border-radius: 30px;
            margin-left:25px ;
            /* scale: calc(1); */
            opacity: 0.5;
            :hover{
                opacity: 1;
            }
        }
    }
  
`;
const UserName = styled.p`
    font-weight: 500;
    position: absolute;
    top: 5%;

`
const UserLocation = styled.p`
    position: absolute;
    top: 40%;
    opacity: 0.5;
`


//------------- Component -------------// 
export default function ReceivedRequest(props) {

    const acceptFriendRequest = async()=>{
        var data = JSON.stringify({
            "status": "A"
          });  
          var config = {
            method: 'patch',
          maxBodyLength: Infinity,
            url: ((process.env.NODE_ENV==="development") ? "http://localhost:8001/" : "http://motion-t3.propulsion-learn.ch/") + `backend/api/social/friends/requests/${props.id}/`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data : data
          };
          axios(config)
          .catch(function (error) {
            console.log(error);
          });
    }

    const rejectFriendRequest = async()=>{
        var data = JSON.stringify({
            "status": "R"
          });  
          var config = {
            method: 'patch',
          maxBodyLength: Infinity,
            url: ((process.env.NODE_ENV==="development") ? "http://localhost:8001/" : "http://motion-t3.propulsion-learn.ch/") + `backend/api/social/friends/requests/${props.id}/`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            data : data
          };
          axios(config)
          .catch(function (error) {
            console.log(error);
          });
    }




    
    console.log(props)
  return (
             <Friend>
                <UserAvatar userData={props} isHeaderAvatar isSmallAvatar={true} />
                 <div className="friend-info">
                     <UserName>{props.first_name} {props.last_name}</UserName>
                     <UserLocation>{props.location?props.location:'unknown location'}</UserLocation>
                 </div>
                 <div className="button-container">
                     <RxCheck className="icon" onClick={acceptFriendRequest()}/>
                     <RxCross2 className="icon" onClick={rejectFriendRequest()}/>
                 </div>
             </Friend>   
  );
}
