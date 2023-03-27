import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import motionAPI from '../../../axios/motionAPI'
import FriendsCard from "../../Friends/FriendsCard";

const Container = styled.div`
    padding: 34px 0;
    max-width: 1152px;
    display: flex;
    flex-wrap: wrap;
    gap:33px;

    @media (max-width: 1152px) {
    max-width: 800px;
    margin: auto;
    }
`;

const ProfileFriends = () => {
  const dispatch = useDispatch();
  const [friends, setFriends] = useState([]);

  const fetchFriends = () => {
    if (!localStorage.getItem('token')) {
      return;
    }

    const getFriends = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        };

        const response = await motionAPI.get("social/friends", config);
        setFriends(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    getFriends();
  }

  useEffect(fetchFriends, []);

  return (
    <Container>
      {
        friends
          ?
          friends.map((user) => {
            return <FriendsCard user={user} key={user.id} />
          })
          :
          null
      }
    </Container>
  )
}

export default ProfileFriends;