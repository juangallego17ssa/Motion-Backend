import styled from "styled-components";



export const PostsContainer = styled.div`
    position: absolute; top: 160px; left: 0; width:100%;
    background-color:#F2F2F2;
    border-top: 2px solid #ececec;
    display: flex;
    align-items: center;
    justify-content: center;

    .posts{
        max-width: 1152px;
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        
        height: 100%;
        width: 90%;
        background-color:#F2F2F2;

        .left{
            display: flex;
            flex-flow: column;

            .postNew{
                margin-bottom:30px;
            }
        }
        .right{
            display: flex;
            flex-flow: column;
        }
    
}

`

