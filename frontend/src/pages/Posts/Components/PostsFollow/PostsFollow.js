import { PostsContainer } from "../Subcomponents/PostsContainer.style";
import Posts from "../Subcomponents/Posts";

import { useEffect, useState } from "react";
import motionAPI from "../../../../axios/motionAPI";

const PostsFollow = () => {
  const [postArray, setPostArray] = useState([]);
  const [myPostArray, setMyPostArray] = useState([]);
  const token = localStorage.getItem("token");

  //// on load, get postArray
  useEffect(() => {
    getArray();
  }, []);

  //// get postArray
  const getArray = async () => {
    const myConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "get",
    };

    // send axios request
    try {
      const response1 = await motionAPI("backend/api/social/posts/me/", myConfig);
      const response2 = await motionAPI("backend/api/social/posts/", myConfig);
      setMyPostArray(response1.data);
      setPostArray(response2.data);


    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <PostsContainer className="mainPostContainer">
        <Posts myPostArray={myPostArray} postArray={postArray} filter={"follow"} />
    </PostsContainer>
  );
};

export default PostsFollow;
