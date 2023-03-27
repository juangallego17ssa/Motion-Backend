import React from 'react';
import styled from 'styled-components';
import UserAvatar from '../UserAvatar';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeRequestData } from '../../redux/slices/request';
//  >>>>>> icon <<<<<<<
import { BiTimeFive} from 'react-icons/bi'
import axios from 'axios';
import request from '../../redux/slices/request';






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
export default function SentRequest(props) {
     const requests = useSelector(state=>state.request.requestsData)
     const dispatch = useDispatch()
   
    const deleteFriendRequest = async() => {
        const config={
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        try{
            await axios.delete(`https://motion.propulsion-home.ch/backend/api/social/friends/requests/${props.id}/`,config)
        }
        catch(error){console.log(error)}
    }

    const cancelRequest =()=>{
        deleteFriendRequest()
        // dispatch(removeRequestData(requests.results))
        // console.log(requests.results)
    }
    

  return (
             <Friend>
                <UserAvatar userData={props} isHeaderAvatar isSmallAvatar={true} />
                 {/* <img src={props.avatar}/> */}
                 <div className="friend-info">
                     <UserName>{props.first_name} {props.last_name}</UserName>
                     <UserLocation>{props.location?props.location:'unknown location'}</UserLocation>
                 </div>
                 <div className="button-container">
                     <BiTimeFive className="icon" onClick={cancelRequest}/>
                 </div>
             </Friend>   
  );
}
