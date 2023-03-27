import styled from "styled-components"
import {AiOutlineSearch} from "react-icons/ai"


export const SearchLogo = styled(AiOutlineSearch)`
    color: black;
    height:20px;
    width: 20px;

`

export const DivMainTop = styled.div`

    position: absolute; top: 80px; left: 0;
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #ececec;
    background-color:#F2F2F2;

    .navigation {
        height: 100%;
        width: 90%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .leftNav {
            height: 100%;
            width: 20%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;


            .searchLogo{
                height: 100%;
                width: 20%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
            
            }

            .searchText{
                height: 100%;
                width: 80%;
                display: flex;
                flex-direction: row;
                align-items: center;
                color: rgb(124, 124, 125);
                justify-content: space-between;
            }

        }

        .rightNav {
            height: 100%;
            width: 30%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            @include grayText;

            .NavLinkContainer {
                justify-content: space-between;
                display: flex;
                flex-direction: row;
                align-items: center;
                height: 100%;
            

                .NavLink {
                        height:100%;
                        color: rgb(124, 124, 125);
                        text-decoration: none;
                        display: flex;
                        flex-direction:column;
                        justify-content:center;
                    }

                .NavLink.active {
                    height:100%;
                    color: black;
                    text-decoration: none;
                    display: flex;
                    flex-direction:column;
                    justify-content:center;
                    border-bottom: 2px solid black;
                }
            }

        }

    }

`