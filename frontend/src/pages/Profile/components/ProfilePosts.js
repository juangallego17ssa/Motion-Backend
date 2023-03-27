import { useEffect, useState } from "react";
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

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return;
    }

    const getPosts = async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        };

        const response = await motionAPI.get("social/posts/me", config);
        setPosts(response.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    getPosts();
  }, []);

  return (
    <Container>
      {
        posts
          ?
          posts.map((post) => {
            // console.log(post)
            return (
              <div>
                <MyPost post={post} />
              </div>
            )
          })
          :
          null
      }
    </Container>
  )
}

export default ProfilePosts;