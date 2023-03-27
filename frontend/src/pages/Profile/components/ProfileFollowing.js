import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import motionAPI from '../../../axios/motionAPI'
import { updateFollowingNumber } from "../../../redux/slices/user";
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

const ProfileFollowing = () => {
  const dispatch = useDispatch();
  const [following, setFollowing] = useState([]);
  const fetchFollowing = () => {
    if (!localStorage.getItem('token')) {
      return;
    }
    // console.log('aqui')
    const getFolling = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        };

        const response = await motionAPI.get("social/followers/following", config);
        setFollowing(response.data.results);
        dispatch(updateFollowingNumber(response.data.results.length));
      } catch (error) {
        console.log(error);
      }
    }

    getFolling();
  }

  useEffect(fetchFollowing, []);

  return (
    <Container>
      {
        following
          ?
          following.map((user) => {
            return <FriendsCard user={user} key={user.id} onFetchFollowing={fetchFollowing} />
          })
          :
          null
      }
    </Container>
  )
}

export default ProfileFollowing;