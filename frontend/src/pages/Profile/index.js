import styled from "styled-components";
import profileBackground from '../../assets/images/profile-background-img.jpg'
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import User from "./User";
import { Outlet } from "react-router-dom";

//--------Style---------
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F2F2F2;
`;

const Background = styled.div`
    background-image: url(${props => props.userDataBanner || profileBackground});
    background-position: center;
    width: 100%;
    height: 240px;
`;

const Main = styled.div`
    max-width: 1152px;
    width: 100%;
    margin-top: 120px;
    margin-bottom: 100px;
    border-radius: 4px;
    position: absolute;
`;

//--------Profile Page---------
const Profile = () => {
    const userData = useSelector(state => state.user.userData);
    console.log(userData)
    return (
        userData
            ?
            <>
                <Header />
                <Container>
                    <Background userDataBanner={userData.banner} />
                    <Main>
                        <User userData={userData} />
                        <Outlet />
                    </Main>
                </Container>
            </>
            :
            <p>No user data </p>
    );
}

export default Profile;
