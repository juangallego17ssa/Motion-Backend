import styled from "styled-components";
import Header from "../../components/Header";
import FriendsCard from "./FriendsCard";
import { useEffect,useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";


//-------STYLE--------->
const StyledFriends = styled.div`
  padding: 120px 7vw;

  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #F2F2F2;
  gap: 30px;
 
`;
const Spinner = styled.div`
  border: .5rem solid #F2F2F2; /* Background*/
  border-top: .5rem solid #C468FF;/*Spinner*/
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  @keyframes spin {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg);  border-top: .5rem solid #6E91F6; }
  100% { transform: rotate(360deg); }
  }
`;



//-------COMPONENT--------->
const Friends = () => {
 const [users, setUsers] = useState([]);
 const [isLoading, setIsLoading] = useState(false);

//  >>>>>>>   get user data from store   <<<<<<< //
const userData = useSelector(state => state.user.userData);
// console.log(userData)

 
  // console.log(localStorage.getItem('token'))

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await axios.get(((process.env.NODE_ENV==="development") ? "http://localhost:8001/" : "https://motion-t3.propulsion-learn.ch/") + `backend/api/users/?limit=50`, config);
            const results = (response.data.results)
            setUsers(results.filter((user)=>user.first_name !== ''))
            setIsLoading(false)
            // console.log(results.filter((user)=>user.first_name !== ''& user.about_me !== ''))
        } catch (error) {
            console.log(error);
        }
    }
    getUser();
}, []);
//>>>>>>>>>> get request list <<<<<<<<<<<
useEffect(()=>{
  const getRequests = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    };
    try {
      const res = await axios.get(((process.env.NODE_ENV==="development") ? "http://localhost:8001/" : "https://motion-t3.propulsion-learn.ch/") + `backend/api/social/friends/requests/`, config);
      // console.log(res.data)
  
    } catch (error) {
      console.log(error);
    }
  };

getRequests()
},[])




  return (
    <>
      <Header />
    <StyledFriends>
      {isLoading?<Spinner/>:users.map(user => <FriendsCard key={user.id} user={user}/>)}
        {/* {users.map(user => <FriendsCard key={user.id} user={user}/>)} */}
  
    </StyledFriends>
    </>
  )
}

export default Friends;



