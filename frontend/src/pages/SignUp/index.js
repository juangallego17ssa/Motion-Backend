import { Navigate } from "react-router-dom";

const Root = () => {
  
  // Check if there is a token in the local storage
  const token = localStorage.getItem("token")
  
  // If there is a token, redirect to /post, if there is no token return the home with a nested route
  return (
    token ? <Navigate to="/posts/follow"/> : <Navigate to="/home/signin" />
  )
  }
export default Root;
