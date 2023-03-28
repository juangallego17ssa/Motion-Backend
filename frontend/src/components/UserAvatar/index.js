import styled from "styled-components";

const Avatar = styled.div`
  width: ${props => props.isSmallAvatar ? "40px" : props.isMediumAvatar ? "70px" : "100px"};
  height: ${props => props.isSmallAvatar ? "40px" : props.isMediumAvatar ? "70px" : "100px"};
  font-size: ${props => props.isSmallAvatar ? "20px" : "40px"};
  border: ${props => props.noAvatar ? "1px solid black" : "none"};
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-image: url(${props => props.avatarURL});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const UserAvatar = ({ userData, isSmallAvatar, isMediumAvatar }) => {
  return (
    userData
      ?
      (
        userData.avatar
          ?
          <Avatar avatarURL={userData.avatar} isSmallAvatar={isSmallAvatar} isMediumAvatar={isMediumAvatar} />
          :
          <Avatar noAvatar isSmallAvatar={isSmallAvatar} isMediumAvatar={isMediumAvatar} >{userData.first_name?.charAt(0).toUpperCase()}</Avatar>
      )
      :
      null
  )
}

export default UserAvatar;