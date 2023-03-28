import { NavLink, useNavigate } from "react-router-dom"
import motionAPI from "../../../../axios/motionAPI"
import { DivMainTop, SearchLogo } from "./MainTop.style"


const MainTop = () => {

    const navigate = useNavigate()
    const sendfriendRequest = async () =>{


            // declare config file
            const myConfig = {
            headers: {
                "Authorization":`Bearer ${localStorage.getItem("token")}`,
            },
            method: "post",
        };
                
        // Fetch the data and save the token in the local storage

        // follow someone /social/followers/toggle-follow/{user_id}/
        // friend request /social/friends/request/{user_id}/

        try {
            const response = (await motionAPI(`/social/friends/request/2318/`, myConfig)).data;
            // window.alert("sent")
        } catch (exception) {
            console.log(exception)
        }

    }


    const gotoPingPong = () => {
        navigate()
    }





    return (
        <DivMainTop className="mainTop">
            <div className="navigation">
                <div className="leftNav">
                    <div className="searchLogo" onDoubleClick={gotoPingPong}>
                    <SearchLogo />
                    </div>
                    <div className="searchText" onClick={sendfriendRequest}>Search posts...</div>
                </div>
                <div className="rightNav">
                    <div className="liked NavLinkContainer">
                        <NavLink className={"NavLink"} to={"/posts/liked"}>Liked</NavLink>
                    </div>
                    <div className="friends NavLinkContainer">
                        <NavLink className={"NavLink"} to={"/posts/friends"}>Friends</NavLink>
                    </div>
                    <div className="follows NavLinkContainer">
                        <NavLink className={"NavLink"} to={"/posts/follow"}>Follow</NavLink>
                    </div>
                </div>
            </div>
        </DivMainTop>
    )
}

export default MainTop