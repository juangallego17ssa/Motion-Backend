import styled from "styled-components";
import backgroundImage from "../../../../assets/images/background_image.png"


const MainStyled = styled.main`
    
    width: 100%;
    height: 100%;
    display: flex;

    #left {
        width: 40%;
        height: 100%;
        color: #FFFFFF;
        background-image: url(${backgroundImage}), linear-gradient(132.96deg, #9a00f9 3.32%, #4e79fb 100%);
        background-size: cover;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;


        .motion-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            
            .motion-logo {
                font-size: 30px;
                text-align: center;
                letter-spacing: 0.75px;
                margin-top: 10px;
                font-weight: 500;
            }

            .motion-description {
                font-size: 16px;
                text-align: center;
                color: #FFFFFF;
                mix-blend-mode: normal;
                opacity: 0.6;
                margin: 30px 0;
                max-width: 260px;
            }

            .motion-dl-btns {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                gap: 12px;

                button {
                background-color: transparent;
                padding: 10px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 30px;
                }
            }
        }
    
    
            .motion-footer {
            margin-top: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .social-media {
                width: 100%;
                display: flex;
                flex-direction: row;

                    img {
                        width: 40px;
                        height: 40px;
                        margin-left: 16px;
                    }
                }

            .copyright {
                padding: 40px 0;
                font-weight: 400;
                font-size: 12px;
                text-align: center;
            }
        }
    
    }


    

`
export default MainStyled