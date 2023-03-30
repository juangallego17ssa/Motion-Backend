import { Navigate } from "react-router-dom";
import {useEffect} from "react";
import motionAPI from "../../axios/motionAPI";
import {updateUserData} from "../../redux/slices/user";
import {useDispatch} from "react-redux";

const Root = () => {
  
  // Check if there is a token in the local storage
  const token = localStorage.getItem("token")
  const dispatch = useDispatch();

  useEffect(() => {
  if (!token) {
    return;
  }

  const getMe = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      };

      const response = await motionAPI.get("backend/api/users/me", config);
      console.log(response.data)
      dispatch(updateUserData(response.data));
    } catch (error) {
      console.log(error);
    }
  }

  getMe();
}, []);





  
  // If there is a token, redirect to /post, if there is no token return the home with a nested route
  return (
    token ? <Navigate to="/posts/follow"/> : <Navigate to="/home/signin" />
  )
  }
export default Root;
