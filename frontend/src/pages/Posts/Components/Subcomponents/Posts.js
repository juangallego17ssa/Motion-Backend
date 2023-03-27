import MyPost from "./MyPost"
import { v4 as uuid } from "uuid";
import CreatePost from "./CreatePost";
import { useState } from "react";
import styled from "styled-components";


const Posts = (props)=>{


    const myPostArray = props.myPostArray
    const postArray = props.postArray

    const [showPicture, setShowPicture] = useState(false)
    const [showedPictureURL, setShowedPictureURL] = useState("")
        
    const handlePictureClick = () =>{
        setShowPicture(false)

    }
    const ShowPicture = styled.div`
        background-color: rgba(0,0,0,0.8);
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: -162px;
        left: -0px;
        display:${props=>props.showPicture?"flex":"none"};
        align-items: center;
        justify-content: center;        

        img{
            height: 450px;
        }
    `


    return (
        <div className="posts">
            {showPicture ?      <ShowPicture className='showpicture' showPicture={showPicture}>
                                    <img src={showedPictureURL} onClick={handlePictureClick}/>
                                </ShowPicture> : "" }
            <div className="left">
            <CreatePost className="postNew post" filter={props.filter} />
                {myPostArray.length ? myPostArray.map((post) => <MyPost key={uuid()} post={post} isMine={true} setShowPicture={setShowPicture} setShowedPictureURL={setShowedPictureURL}/>) : ""}
            </div>
            <div className="right">
                {postArray.length ? postArray.map((post) => <MyPost key={uuid()} post={post} isMine={false} setShowPicture={setShowPicture} setShowedPictureURL={setShowedPictureURL}/>) : ""}
            </div>
        </div>
    )
}


export default Posts