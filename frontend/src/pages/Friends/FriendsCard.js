import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { BiCheck } from "react-icons/bi";
import UserAvatar from '../../components/UserAvatar'
//-------STYLE--------->

const StyledFriendCard = styled.div`
    box-sizing: border-box;
    padding: 30px;
    display: flex;  flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 489px; 
   
    width: 362px;
    border-radius: 5px;
    background-color: #FFF;
    gap: 30px;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
  
`;

const Tag = styled.p`
        margin: 3px;
        background-color: #F2F2F2;
        padding: 0.8rem 1.2rem;
        border-radius: 30px;
        border: none;
        font-size: 1rem; font-weight: 400; 
`;

const FlexDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: .3rem;
   img{
    position: relative;
    width: 90px;
    height: 90px;
    border-radius: 50px;
    :hover{
      transform: scale(1.1);
    }
   }
   .name{
    font-size: 22px;
   }
`;

const HobbiesBox = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
    position: relative; top:0px;
    display: flex;
    gap: 6px;
`;

const Button = styled.button`
    position: relative;
    box-shadow: 0 0 2px rgba(0,0,0,.3);
    width: 120px; height: 40px;
    border-radius: 30px;
    border: none;
    font-size: 0.8rem; font-weight: 500;  
    background-color: #fff;
    &.pending{
      background-color: #F2F2F2;
    }
    &.false{
      background-color: #fff;
    }
    &.true{
      background: linear-gradient(132.96deg, #C468FF 3.32%, #6E91F6 100%);
      color: #FFF;font-weight:bolder;border:none;
    }
    
        :hover{
        cursor: pointer;
        background: linear-gradient(132.96deg, #C468FF 3.32%, #6E91F6 100%);
        border: none;
        color: #FFF;
        font-weight: 600;
        } 
`;

const Img = styled.div`
  clip-path: circle(90px at 80% 65%);
  background-color: #F2F2F2 ;
`;

const User = styled.p`
  display: flex; justify-content: center; align-items: center;
  width: 90px; height: 90px; border-radius: 50px;
  background-color: #F2F2F2;
  font-size: 1.5rem; font-weight: 600;
  :hover{
    transform: scale(1.1);
    cursor:default;
  }
`
//-------Component--------->
export default function FriendsCard({ user, onFetchFollowing, onFetchFriends }) {
  const dispatch = useDispatch()

  const userData = useSelector(state => state.user.userData);
  const [isFollowing, setIsFollowing] = useState(user.logged_in_user_is_following);
  const [isFriend, setIsFriend] = useState(user.logged_in_user_sent_fr);

  //>>>>>>>>>> Post Following <<<<<<<<<<<
  const postUser = async () => {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      method: 'post',
      maxBodyLength: Infinity,
      url: `((process.env.NODE_ENV==="development") ? "http://localhost:8001/" : "http://motion-t3.propulsion-learn.ch/") + \`backend/api/social/followers/toggle-follow/${user.id}/`,

    };

    axios(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const followHandler = async () => {
    setIsFollowing(!isFollowing)
    await postUser()
    // console.log(user)
    if (onFetchFollowing) {
      onFetchFollowing();
    }
  }

  //>>>>>>>>>> Send friend request <<<<<<<<<<<
  const sendFriendRequest = async () => {
    var data = JSON.stringify({
      "logged_in_user_sent_fr": true
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: ((process.env.NODE_ENV==="development") ? "http://localhost:8001/" : "http://motion-t3.propulsion-learn.ch/") + `backend/api/social/friends/request/${user.id}/`,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(user)
  }

  // const deleteFriend = async()=>{
  //   var data = '';
  //   var config = {
  //   method: 'delete',
  //   url: `https://motion-t3.propulsion-learn.ch/backend/api/social/friends/requests/${user.id}/`,
  //   headers: { 
  //     'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc3ODU4MjM3LCJqdGkiOiI3YThkMzUzZjU3MTY0MTBmYmVjYzhmNGZkMjRlMjE4OCIsInVzZXJfaWQiOjIyNDV9.A1NVzg1BtEIGPVCQcxzbRK385oIdIDvPFJqfukQ0GdA'
  //   },
  //   data : data
  // };

  // axios(config)
  // .then(function (response) {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  // }

  const handleAddFriend = () => {
    sendFriendRequest()
    setIsFriend(!isFriend)
    if (onFetchFriends) {
      onFetchFriends();
    }
  };

  const handleDeleteFriend = () => {
    if (onFetchFriends) {
      onFetchFriends();
    }
  }

  return (
    <StyledFriendCard >
      <FlexDiv>
        <UserAvatar userData={user} />
        <p className='name'>{user.first_name} {user.last_name}</p>
        <p className='country'>{user.location}</p>
      </FlexDiv>
      <ButtonContainer>
        {isFollowing ?
          <Button className='true' onClick={followHandler} check={user.logged_in_user_is_following} >FOLLOWING</Button> :
          <Button className='false' onClick={followHandler}>FOLLOW</Button>}
        {/* <Button onClick={followHandler}>{isFollowing?`FOLLOWING`:`FOLLOW`}</Button> */}
        {user.logged_in_user_is_friends ?
          <Button onClick={handleDeleteFriend}><BiCheck />FRIEND</Button> :
          user.logged_in_user_sent_fr ?
            <Button className='pending'>PENDING</Button> :
            <Button onClick={handleAddFriend}>ADD FRIEND</Button>}
      </ButtonContainer>
      <FlexDiv>
        <p>{user.about_me}</p>
      </FlexDiv>
      <HobbiesBox>
        {user.things_user_likes.map((thing, index) => <Tag key={index}>{thing}</Tag>)}
      </HobbiesBox>
    </StyledFriendCard>
  );
}
