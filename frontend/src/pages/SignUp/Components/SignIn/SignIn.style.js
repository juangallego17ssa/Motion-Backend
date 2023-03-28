import styled from "styled-components"


const DivStyled = styled.div`

    width: 60%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;

    .homepage-header {

        .headerContainer {
            height: 40px;
            padding: 40px 40px 0 40px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;

            @media (min-width: 0px) and (max-width: 700px) {
                justify-content: space-between;
                align-items: flex-start;
                padding: 30px;
            }

            .sign-up-container, .sign-in-container {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: black;

                @media (min-width: 0px) and (max-width: 700px) {
                    flex-direction: column;
                    align-items: flex-end;
                    flex-wrap: wrap;
                }
            }
        }
    }

    .form{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    form {
        
        margin: 126px auto 0px;
        padding: 0 26px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    
            .form-inputs {
                display: flex;
                flex-direction: column;
                align-items: center;
                height: 400px;
        
                .form-title {
                    font-weight: 500;
                    font-size: 40px;
                
                    @media (min-width: 0px) and (max-width: 700px) {
                        font-size: 30px;
                    }
                }
        
                .input-password {
                    margin-bottom: 170px;
                
                    @media (min-width: 0px) and (max-width: 700px) {
                        margin-bottom: 80px;
                    }
                }

                .success-icon img{
                    height: 81px;
                    width: 81px;
                    margin: 60px

                }

                .success-message {
                    text-align: center;
                    width: 350 px;
                }
                

                .input-email,
                .input-password {
                    width: 288px;
                    height: 42px;
                    margin-top: 53px;
                    padding: 0px 0px 16px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.17);
                    display: flex;
                    flex-direction: row;
            
                    @media (max-width: 400px) {
                        width: 220px;
                    }


                    img{
                        object-fit:contain
                    }

            
                    ::placeholder {
                        color: black;
                    }
            
                    input {
                        border: none;
                        margin-left: 24px;
                        width: 100%;
                    }
            
                    input:focus {
                        outline: none;
                    }
                }

                .placeholder-password{
                    border:none;
                }
            }
        }
    

    .step-container {
        padding: 25px;
        display: flex;
        flex-direction: row;

        .step {
            width: 8px;
            height: 8px;
            border: 1px solid black;
            border-radius: 100%;
            margin: 8px;
        }
        .${props=>props.step} {
            background-color: black
        }


    }
          
    .footer-right {
        display: none;
        
        @media (min-width: 0px) and (max-width: 700px) {
            background-color: #9b7dfb;
            padding: 5px 20px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            color: white;
        }
        
        img {
            width: 20px;
            margin: 10px;
        }
    }


`


export default DivStyled