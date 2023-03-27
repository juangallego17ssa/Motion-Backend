import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import motionAPI from '../../../axios/motionAPI'
import MyPost from "../../Posts/Components/Subcomponents/MyPost";

const Container = styled.div`
  max-width: 1152px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row dense;
  gap: 30px;

  @media (max-width: 1152px) {
    padding-top: 30px;
    max-width: 700px;
  }
`;

const ProfileLikes = () => {
  const [likedPosts, setLikedPosts] = useState([]);

  const fetchLikes = () => {
    if (!localStorage.getItem('token')) {
      return;
    }

    const getLikedPosts = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        };

        const response = await motionAPI.get("social/posts/likes/", config);
        setLikedPosts(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    getLikedPosts();
  }

  useEffect(fetchLikes, []);

  return (
    <Container>
      {
        likedPosts
          ?
          likedPosts.map((post) => {
            return <MyPost post={post} />
          })
          :
          null
      }
    </Container>
  )
}

export default ProfileLikes;