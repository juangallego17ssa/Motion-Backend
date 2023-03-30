import { useState } from "react"
import styled from "styled-components"
import menu from '../../../../assets/svgs/menu.svg'
import { MdDelete } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import motionAPI from "../../../../axios/motionAPI"
import { FcLike, FcLikePlaceholder } from "react-icons/fc"
import UserAvatar from "../../../../components/UserAvatar"


const MyPostStyled = styled.div`
    background-color: white;
    width: 560px;
    border-radius: 3px;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
    padding: 10px 0;
    margin-bottom: 30px;

    .headerPost{
        margin: 30px;
        height: 42px;
        display: flex;
        justify-content:space-between;
        align-items: center;


        .headerLeft{
            display: flex;

            .avatarDiv{

                height: 40px;
                width: 40px;
                overflow: hidden;
                border-radius: 50%;

                img{
                    height: 40px;
                    width: 40px;
                    /* border: 1px solid purple; */
                    border-radius: 50%;
                    object-fit: cover;
                }
            }

            .nameAndDate{
                display:flex;
                flex-direction:column;
                margin-left: 25px;
                font-size: 14px;
                color: #7d7d7d;
                align-items:flex-start; 
                justify-content: center;


                .userFullName{
                    color:black;
                    font-weight:400;
                    margin-bottom:7px;
                }

            }



        }

        .headerRight{
            display:flex;
            height:100%;
            align-items:flex-start;
            justify-content: center;

            img{
                cursor: pointer;
            }
        }


    }

    .textPost{

        margin: 30px;
        display: flex;
        justify-content:space-between;
        align-items: center;


    }

    .imagePost{
        background-color: white;
        margin: 30px;
        display: flex;
        justify-content:flex-start;
        align-items: center;

        img{
            height: 80px;
            margin-right: 8px;
        }
    }

    .footerPost{
        height: 100 px;
        width: 100%;
        background-color: white;
        display: flex;
        align-items:center;
        justify-content: space-between;

        .like{
            margin:15px 30px;
            display: flex;
            align-items: center;

            span{
                margin-left:15px;
            }
        }

        .amountLikes{
            margin-right:50px;
            font-size: 14px;
            color: rgb(120,120,120)
        }
    }
    
`
const ProfileBox = styled.div`
    z-index: 1;
    /* box-sizing: border-box; */
    padding:0.5rem 0 ;
    position: absolute;
    margin: 50px 0px 0px 350px;
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
        cursor: pointer;
        :hover{
            background-color: #F2F2F2;
            opacity: 1;
        }
    }
    .icon{
        opacity: 0.9;
        transform: scale(1.5);
        cursor: pointer;
        
    }
`

const LikeIcon = styled(FcLike)`
    height:30px;
    width: 30px;
    color: rgb(180,180,180);
    cursor: pointer;
`
const NotLikeIcon = styled(FcLikePlaceholder)`
    height:30px;
    width: 30px;
    color: rgb(180,180,180);
    cursor: pointer;
`





const MyPost = (props) => {


    console.log(props.post)
    const [ShowProfile, setShowPofile] = useState(false)
    const firstName = props.post.created_by.first_name
    const lastName = props.post.created_by.last_name
    // const avatar = props.post.created_by.avatar
    const created = new Date(props.post.created)
    // const image1 = props.post.images[0] ? props.post.images[0].image : ""
    // const image2 = props.post.images[1] ? props.post.images[1].image : ""
    // const image3 = props.post.images[2] ? props.post.images[2].image : ""
    // const image4 = props.post.images[3] ? props.post.images[3].image : ""
    // const [userLiked, setUserLiked] = useState(props.post.logged_in_user_liked)
    const postId = props.post.id
    const [likes, setLikes] = useState(props.post.like_count)
    const now = new Date()
    const minutesAgo = Math.abs(now - created) / 1000 / 60
    const hoursAgo = minutesAgo / 60
    const daysAgo = hoursAgo / 24
    const getTimeAgo = () => {
        if (minutesAgo <= 5) {
            return "just now"
        } else if (minutesAgo < 60) {
            return Math.floor(minutesAgo) + " minutes ago"
        } else if (hoursAgo < 24) {
            return Math.floor(hoursAgo) + " hours ago"
        } else if (daysAgo < 4) {
            return Math.floor(daysAgo) + " day ago"
        } else {
            return created.getDate
        }
    }
    const timeAgo = getTimeAgo()
    const content = props.post.content



    const navigate = useNavigate()
    const deletePost = async () => {


        // declare config file
        const myConfig = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            method: "delete",
        };

        // Fetch the data and save the token in the local storage
        try {
            const response = (await motionAPI(`/backend/api/social/posts/${props.id}`, myConfig)).data;
            navigate("/")
        } catch (exception) {
            console.log(exception)
        }

    }


    const handleLike = async () => {


        // declare config file
        const myConfig = {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            method: "post",
        };

        try {
            // const response = (await motionAPI(`/social/posts/toggle-like/${postId}/`, myConfig)).data;
            // if (userLiked) { setLikes(likes - 1) } else { setLikes(likes + 1) }
            // setUserLiked(!userLiked)
        } catch (exception) {
            console.log(exception)
        }

    }

    const onPictureClick = (pictureURL) => {

        props.setShowedPictureURL(pictureURL)
        props.setShowPicture(true)
    }



    return (
        <MyPostStyled>
            {ShowProfile && (
                <ProfileBox>
                    {/*<Link className="link" to={'/profile'}><BiUser className="icon" />Profile</Link>*/}
                    <div className="link" onClick={deletePost}><MdDelete className="icon" onClick={deletePost} />Delete</div>
                </ProfileBox>
            )}
            <div className="post1 post">
                <div className="headerPost">
                    <div className="headerLeft">
                        <UserAvatar userData={props.user} isSmallAvatar />
                         {/*<div className="avatarDiv"><img src={avatar} alt="user-avatar" /></div>*/}
                        <div className="nameAndDate">
                            <span className="userFullName">{firstName + " " + lastName}</span>
                            <span className="datePost">{timeAgo}</span>
                        </div>
                    </div>

                    <div className="headerRight">
                        {props.isMine ? <img src={menu} alt="menu icon" onClick={() => setShowPofile(!ShowProfile)} /> : ""}
                    </div>

                </div>
                <div className="textPost">
                    {content}
                </div>
                {/*{image1 ? <div className="imagePost">*/}
                {/*    <img src={image1} onClick={(e) => onPictureClick(image1)} />*/}
                {/*    <img src={image2} onClick={(e) => onPictureClick(image2)} />*/}
                {/*    <img src={image3} onClick={(e) => onPictureClick(image3)} />*/}
                {/*    <img src={image4} onClick={(e) => onPictureClick(image4)} />*/}
                {/*</div>*/}
                {/*    : ""*/}
                {/*}*/}
                <div className="picturesPost"></div>
                <div className="repost post"></div>
                <div className="footerPost">
                    <div className="like">
                        {/*{!props.isMine ?*/}
                        {/*    <>*/}
                        {/*        {userLiked ? <LikeIcon onClick={handleLike} /> : <NotLikeIcon onClick={handleLike} />}*/}
                        {/*        <span>Like</span>*/}
                        {/*    </>*/}
                        {/*    : ""}*/}
                    </div>
                    <div className="amountLikes">{likes + ((likes === 1) ? " like" : "  likes")}</div>
                </div>
            </div>

        </MyPostStyled>
    )

}

export default MyPost




