import { useNavigate } from "react-router-dom";
import { Button, Location, Name, NavLinkItem, Number, Tag, TagContainer, Text, TextAbout, UserAbout, UserContactDetails, UserContainer, UserDetails, UserContact, UserInfo, UserInfoLeft, UserInfoRight, UserLeftContainer, UserNumbers, UserRightContainer } from "./User.styles";
import UserAvatar from "../../components/UserAvatar";

const User = ({ userData }) => {
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate("/edit");
  }

  return (
    <UserContainer>
      <UserLeftContainer>
        <UserDetails>
          <UserAvatar userData={userData} />
          <div>
            <Name>{userData.first_name} {userData.last_name}</Name>
            <Location>{userData.location}</Location>
          </div>
        </UserDetails>
        <Button onClick={handleEditClick}>Edit profile</Button>
      </UserLeftContainer>
      <UserRightContainer>
        <UserInfo>
          <UserInfoLeft>
            <UserAbout>
              <Text>About</Text>
              <TextAbout>{userData.about_me}</TextAbout>
            </UserAbout>
            <UserContactDetails>
              <UserContact>
                <Text>Email</Text>
                <Text>{userData.email}</Text>
              </UserContact>
              <UserContact>
                <Text>Phone</Text>
                <Text>{userData.phone_number}</Text>
              </UserContact>
            </UserContactDetails>
          </UserInfoLeft>
          <UserInfoRight>
            <Text>Things I like</Text>
            <TagContainer>
              {userData.things_user_likes
                ? userData.things_user_likes.map((thing, idx) => {
                  return <Tag key={idx}>{thing}</Tag>
                })
                : null
              }
            </TagContainer>
          </UserInfoRight>
        </UserInfo>
        <UserNumbers>
          <NavLinkItem to="posts">
            <Number>{userData.amount_of_posts}</Number>
            <p>Posts</p>
          </NavLinkItem>
          <NavLinkItem to="likes">
            <Number>{userData.amount_of_likes}</Number>
            <p>Likes</p>
          </NavLinkItem>
          <NavLinkItem to="friends">
            <Number>{userData.amount_of_friends}</Number>
            <p>Friends</p>
          </NavLinkItem>
          <NavLinkItem to="followers">
            <Number>{userData.amount_of_followers}</Number>
            <p>Followers</p>
          </NavLinkItem>
          <NavLinkItem to="following">
            <Number>{userData.amount_following}</Number>
            <p>Following</p>
          </NavLinkItem>
        </UserNumbers>
      </UserRightContainer>
    </UserContainer>
  );
}

export default User;