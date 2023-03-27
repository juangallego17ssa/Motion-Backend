import { CreatePostStyled, MiniImage, MyCloseImage, MylinkIcon, UserAvatarMediumSize } from './CreatePost.style'
import sendButton from '../../../../assets/images/send_button.png'
import addPictureIcon from '../../../../assets/images/add_picture.png'
import { useState } from "react"
import motionAPI from '../../../../axios/motionAPI'
import { useNavigate } from 'react-router'
import { v4 as uuid } from "uuid";
import { useSelector } from 'react-redux'
import UserAvatar from '../../../../components/UserAvatar'



const CreatePost = (props) => {

    //////// Visual components

    //// Shows the create post view
    const handleCreatePost = () => {
        setShowCreatePost(true)
        setDraftPost("")
        setMyPostImages([])
    }

    //// Hide the create post view
    const handleHideCreatePost = (event) => {
        return (event.target.className === "darkBackground") ? setShowCreatePost(false) : ""
    }



    //////// Create post

    //// Controled post
    const [draftPost, setDraftPost] = useState("")

    const handleDraftPostChange = event => {
        setDraftPost(event.target.value);
    };
    const [showCreatePost, setShowCreatePost] = useState(false)


    //// Prepare the images to be uploaded
    const [myPostImages, setMyPostImages] = useState([])

    // add images
    const handleUploadImage = e => {
        if (myPostImages.length === 4) { return window.alert("Maximum 4 pictures per post!") }
        const myNewImage = {
            file: e.target.files[0],
            url: URL.createObjectURL(e.target.files[0]),
        }
        const imgs = [...myPostImages, myNewImage]
        setMyPostImages(imgs)
    }

    // delete images
    const handleDeleteImage = (event) => {
        let imgs = [...myPostImages]
        const index = +event.target.getAttribute("index")
        imgs.splice(index, 1)
        setMyPostImages(imgs)
    }

    //// Send the post
    const navigate = useNavigate()
    const sendPost = async () => {
        // declare variables
        const user = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        const content = draftPost
        // const images = myPostImages.map(imageObject => {return {posts: imageObject.file}})

        // declare formData
        const formData = new FormData();
        formData.append("user", user)
        formData.append("content", content)
        for (let myPostImage of myPostImages) {
            formData.append("images", myPostImage.file)
        }

        // declare config file
        const myConfig = {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
            method: "post",
            data: formData,
        };

        // Fetch the data and save the token in the local storage
        try {
            const response = (await motionAPI("/social/posts/", myConfig)).data;
            setDraftPost("")
            setMyPostImages([])
            setShowCreatePost(false)
            navigate("/")
        } catch (exception) {
            console.log(exception)
        }

    }

    const userData = useSelector((state) => state.user.userData)
    const firstName = useSelector((state) => state.user.userData.first_name)
    const avatar = useSelector((state) => state.user.userData.avatar)



    return (
        <>
            <CreatePostStyled showCreatePost={showCreatePost} isImages={myPostImages.length > 0} >

                <div className="createPostElementContainer">
                    <div className="createPostElementLeft">
                        <UserAvatar userData={userData} isMediumAvatar />
                        <span className="createPostInput" onClick={handleCreatePost} >What’s on your mind, {firstName}?</span>
                    </div>
                    <div className="createPostElementRight">
                        <img src={sendButton} alt="send_button" />
                    </div>
                </div>

                <div className="darkBackground" onClick={(event) => handleHideCreatePost(event)}></div>

                <div className="createPostElement">
                    <div className="createPostElementContainer">
                        <div className="createPostElementLeft">
                            <UserAvatar userData={userData} isSmallAvatar />
                            <textarea type="text" className="createPostInput" placeholder={`What’s on your mind, ${firstName}?`} value={draftPost} onChange={handleDraftPostChange} />
                        </div>
                    </div>

                    <div className='pictureUpload'>
                        {myPostImages.map((image, index) => <MiniImage key={uuid()} image={image}>
                            <MyCloseImage />
                            <div className="closingContainer" index={index} onClick={handleDeleteImage}></div>
                        </MiniImage>)}
                    </div>

                    <div className="attachAndSend">
                        <div className="createPostAttachIcons">
                            <label>
                                <img src={addPictureIcon} alt="add picture" />
                                <input type="file" className="uploadInput" accept="image/*" onChange={handleUploadImage}></input>
                            </label>
                            <MylinkIcon />
                            {/* <img src={addLinkIcon} alt="add link" /> */}
                        </div>
                        <div className="createPostElementRight" onClick={sendPost}>
                            <img src={sendButton} alt="send button" />
                        </div>
                    </div>
                </div>

            </CreatePostStyled>
        </>
    )

}

export default CreatePost
