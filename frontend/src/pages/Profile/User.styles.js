import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const UserContainer = styled.div`
  background-color: #FFFFFF;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 34px;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);

  @media (max-width: 1152px) {
    max-width: 700px;
    margin: auto;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.05);
  }
`;

export const UserLeftContainer = styled.div`
  border-right: 2px solid #f2f2f2;
  max-width: 320px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;

  @media (max-width: 1152px) {
    max-width: 600px;
    border: none;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px 40px 0 40px;
  }
`;

export const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1152px) {
    padding: 20px 20px 0 20px;
    flex-direction: row;
    gap: 20px
  }
`;

export const Name = styled.p`
  font-size: 24px;
  padding-bottom: 8px;
`;

export const Location = styled.p`
  font-size: 14px;
`;

export const Button = styled.button`
  padding: 16px 38px;
  mix-blend-mode: normal;
  border: 1px solid #f2f2f2;
  border-radius: 30px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.07);
  background-color: white;
  color: #000000;
  text-transform: uppercase;
  font-size: 10px;

  &:hover {
    cursor: pointer;
    background-color: grey;
}
`;

export const UserRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 1152px) {
    max-width: 800px;
    border: none;
  }
`;

export const UserInfo = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 40px 60px;
  display: grid;
  grid-template-columns: 3fr 2fr;

  @media (max-width: 1152px) {
    display: flex;
    flex-direction: column;
    gap: 38px;
  }
`;

export const UserInfoLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;
`;

export const UserAbout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;

export const TextAbout = styled.p`
  width: 320px;
  min-height: 30px;
  font-size: 16px;

  @media (max-width: 1152px) {
    width: auto;
  }
`;

export const UserContactDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
`;

export const UserContact = styled.div`
  display: flex;
  flex-direction: column;
  
  p:first-child{
    padding-bottom: 10px;
  }
`;

export const UserInfoRight = styled.div`
`;

export const TagContainer = styled.div`
  padding-top: 22px;
`;

export const Tag = styled.p`
  width: max-content;
  text-align: center;
  padding: 9px 16px;
  background: #f2f2f2;
  mix-blend-mode: normal;
  border-radius: 18px;
  color: black;
  float: left;
  margin: 0 8px 16px 0;
`;

export const UserNumbers = styled.div`
  padding: 0 60px;
  border-top: 2px solid #f2f2f2;
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 78px;

  @media (max-width: 1152px) {
    gap: 40px;
  }
`;

export const NavLinkItem = styled(NavLink)`
  width: max-content;
  text-decoration: none;
  padding: 40px 0;

  &.active {
    border-bottom: 3px solid #AD73FD;
;

    p:last-child {
      color: black;
    }
  }

  p:last-child{
    color: grey;
  }
`;

export const Number = styled.p`
  font-size: 24px;
  padding-bottom: 7px;
  color: black;
`;

export const Text = styled.p`
  font-size: 16px;
`;