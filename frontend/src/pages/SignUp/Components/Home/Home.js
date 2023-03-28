import { Outlet } from "react-router-dom";

import MainStyled from "./Home.style";

import motionLogo from "../../../../assets/images/logo_white.png"
import apple from "../../../../assets/svgs/apple.svg"
import google from "../../../../assets/svgs/google.svg"
import twitter from "../../../../assets/svgs/twitter_icon.svg"
import facebook from "../../../../assets/svgs/facebook_icon.svg"
import instagram from "../../../../assets/svgs/instagram_icon.svg"
import { useState } from "react";





const Home = () => {
    
    const [emailHome, setEmailHome] = useState("");
    
    return (
        <MainStyled>

            <div id="left">
                <div className="motion-container">
                    <div><img src={motionLogo} alt="Motion logo" /></div>
                    <div className="motion-logo">Motion</div>
                    <div className="motion-description">Connect with friends and the world around you with Motion </div>
                    <div className="motion-dl-btns">
                        <button>
                            <a href="https://www.apple.com/la/app-store/"> <img src={apple} alt="Apple Store logo" /></a>
                        </button>
                        <button>
                            <a href="https://play.google.com/store/games"><img src={google} alt="Google play logo" /></a>
                        </button>
                    </div>
                </div>
                <div className="motion-footer">
                    <div className="social-media">
                        <a href="https://twitter.com/"> <img src={twitter} alt="Twitter logo" /> </a>
                        <a href="https://www.facebook.com/"> <img src={facebook} alt="Facebook logo" /> </a>
                        <a href="https://www.instagram.com/"> <img src={instagram} alt="Instagram logo" /> </a>
                    </div>
                    <div className="copyright">© Motion 2018. All rights reserved</div>
                </div>
            </div>
            <Outlet context={[emailHome, setEmailHome]}/>

        </MainStyled>
    )
}

export default Home


