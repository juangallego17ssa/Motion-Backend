// import { StyledHeader } from "./Header.style"
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { updateRequestData } from "../../redux/slices/request";
import { useState , useEffect } from "react";
import axios from "axios";

//  >>>>>> Component <<<<<<<
import ReceivedRequest from "./ReceivedRequest";
import SentRequest from "./SentRequest";
//  >>>>>> icon <<<<<<<
import { BiUser, BiDotsVerticalRounded } from 'react-icons/bi'
import { IoMdLogOut, IoMdNotifications } from 'react-icons/io'


//  >>>>>> img <<<<<<<
import logo from '../../assets/images/logo.png'
import post from '../../assets/svgs/posts_logo.svg'
import post_inactive from '../../assets/svgs/posts_logo_inactive.svg'
import friends from '../../assets/svgs/icon-friends.svg'
import friends_active from '../../assets/svgs/icon-friends_active.svg'
import UserAvatar from "../UserAvatar";


//--------Style---------

const StyledHeader = styled.header`
    z-index: 1;
    box-sizing: border-box;
    height: 80px;
    width: 100vw;
    position: sticky; top: 0; left: 0;
    box-shadow: 0 0 10px rgba(0,0,0,.3);
    padding: 2rem;
    gap: 5em;
    color: black;
    background-color: #FFF;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .icon{
        cursor: pointer;
        transform: scale(1.8);
        opacity: 0.3;
        :hover{
            opacity: 0.5;
        }
    }
`;
const LogoDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    h1{
        font-size: 22px; font-weight: 400;
    }
`;
const NavDiv = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    gap: 3em;
   
    .NavLink{
        display: flex;
        height: 80px;
        align-items: center;
        gap: 5px;
        text-decoration: none;
        color: black;
        &.active{
            border-bottom:3px solid #AD73FD ;
            
        }

    }
    
`;
const UserDiv = styled.div`
    position: absolute;
    top: 1.1rem;
    right: 2rem;
    align-items: center;
    display: flex;
    gap: 2em;
    img{
        width: 40px;
        height: 40px;
    }
    .notification{
      position: relative;
      display: flex;
      .notification_num{
        position: relative; top: -1rem; left:3px;
        width: 20px;
        height: 20px;
        background: linear-gradient(132.96deg, #C468FF 3.32%, #6E91F6 100%);
        border-radius: 20px;
        span{
            position: absolute; top:13%; left: 28%;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            color: #fff; font-size: 14px;
        }
      }
    }  
`;

const ProfileBox = styled.div`
    z-index: 1;
    /* box-sizing: border-box; */
    padding:0.5rem 0 ;
    position: absolute; 
    right:5%; top: 100%;
    width: 180px;
    border-radius: 4px;
    background-color: #FFF;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
    .link{
        /* border: 1px solid green; */
        justify-content: center;
        align-items: center;
        padding: .8rem 2rem;
        display:grid;
        grid-template-columns: 1fr 3fr;
        text-align: center;
        text-decoration: none;
        opacity:0.5;
        color: black;
        :hover{
            cursor: pointer;
            background-color: #F2F2F2;
            opacity: 1;
        }
    }
    .icon{
        opacity: 0.9;
        transform: scale(1.5);

    }
`;
const NotificationBox = styled.div`
    /* border: 1px solid blue; */
    border-radius:4px;
    z-index: 1;
    position :absolute; right: 10%; top: 190%;
    width: 300px;
    padding:30px ;
    background-color: #FFF;
    display: flex;
    flex-direction: column;
    gap: 40px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
`;

const Header = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const requestsData = useSelector(state => state.request.requestsData)
    
    const userData = useSelector(state => state.user.userData);
    const [ShowNotification, setShowNotification] = useState(false);
    const [ShowProfile, setShowProfile] = useState(false);
    const [requests, setRequests] = useState('');
    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem('token', '')
        navigate('/')
    }

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
        const res = await axios.get(((process.env.NODE_ENV==="development") ? "http://localhost:8001/" : "http://motion-t3.propulsion-learn.ch/") + `backend/api/social/friends/requests/`, config);
        setRequests(res.data)
        dispatch(updateRequestData(res.data))
      } catch (error) {
        console.log(error);
      }
    };
  
  getRequests()
  },[])

const requestsToUser = requestsData.results?.filter(result => {
    if(result.receiver.id === userData.id && result.status === 'P'){return result.requester;} 
});

const requestsFromUser = requestsData.results?.filter(result => {
    if(result.receiver.id !== userData.id && result.status === 'P'){return result.receiver;} 
})

  
const totalNotification = requestsToUser?.length+requestsFromUser?.length



    return (
        <StyledHeader>
            <LogoDiv>
                <img src={logo} />
                <h1>Motion</h1>
            </LogoDiv>
            <NavDiv>
                <NavLink className="NavLink" to={'/posts/follow'}>
                   {location.pathname === '/posts/follow'?<img src={post}/>:<img src={post_inactive}/>}
                  
                    <span>Posts</span>
                </NavLink>
                <NavLink className="NavLink" to={'/friends'}>
                {location.pathname === '/friends'?
                    <img src={friends_active} />:
                    <img src={friends} />
                }
                    <span>Find Friends</span>
                </NavLink>

            </NavDiv>

  {/*   ========= Notification drop-down box =========  */}
            <UserDiv>
                <div className="notification">
                    <IoMdNotifications className="icon" onClick={() => {setShowNotification(!ShowNotification);setShowProfile(false)}} />

                    <div className="notification_num">
                        {requests? <span >{totalNotification}</span>:''}
                       
                    </div>
                    {ShowNotification && (
                        <NotificationBox>
                            <h2>Received request</h2>
                            {requestsToUser?.map(request => 
                             <ReceivedRequest key={request.id}
                             id={request.id}
                             first_name={request.requester.first_name}
                             last_name={request.requester.last_name}
                             location = {request.requester.location}
                             avatar = {request.requester.avatar}
                             className='notice' 
                             requests={requests}
                             
                             />
                                )}
                
                            <h2>Sent request</h2>
                            {requestsFromUser?.map(request=>
                                 <SentRequest key={request.id} 
                                 id={request.id}
                                 first_name={request.receiver.first_name}
                                 last_name={request.receiver.last_name}
                                 location = {request.receiver.location}
                                 avatar = {request.receiver.avatar}
                                 requests = {requestsFromUser}
                                 />)}

                        </NotificationBox>
                    )}
                </div>


 {/*   ========= if user dont set up avatar show first letter in capital =========  */}
                <div>
                    <UserAvatar userData={userData} isSmallAvatar />

 {/*   ========= profile dropdown box =========  */}
                    {ShowProfile && (
                        <ProfileBox>
                            <Link className="link" to={'/profile'}><BiUser className="icon" />Profile</Link>
                            <div className="link" onClick={logout}><IoMdLogOut className="icon" onClick={logout} />Logout</div>

                        </ProfileBox>
                    )}

                </div>
                <BiDotsVerticalRounded className="icon" onClick={()=>{setShowProfile(!ShowProfile);setShowNotification(false)}}/>
            </UserDiv>
        </StyledHeader >
    )
}

export default Header;