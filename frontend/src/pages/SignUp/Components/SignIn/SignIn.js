// import the parent styled component
import DivStyled from "./SignIn.style"

// import default components
import { HomepageWhiteButton } from "../../../../styles/StyledComponents/Button.style"
import { HomepagePurpleButton } from "../../../../styles/StyledComponents/Button.style"

// import the axios instance to fetch the token
import motionAPI from "../../../../axios/motionAPI"


// import the images used
import avatarIcon from "../../../../assets/svgs/avatar.svg"
import passwordIcon from "../../../../assets/svgs/password.svg"


// import useState to create controlled form
import { useState } from "react"

// import useNavigate to handle the button signUp
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateUserData } from "../../../../redux/slices/user"


const SignIn = () => {


    const dispatch = useDispatch()


    //// controlled form
    // email input
    const [email, setEmail] = useState("");

    const handleEmailChange = event => {
         setEmail(event.target.value);
    };

    // password
    const [password, setPassword] = useState("");

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    //// handle the button sign up
    const navigate = useNavigate()
    const handleSignUp = () => {
        navigate("/home/signup")
    }

    //// handle the button sign in
    const handleSingIn = async() => {


        // Check the form
        if (    (email === "") 
        ||  (password === "") ) {
        window.alert("Email and/or Password missing!")
        return
        }

        // Prepare the request for login in and getting the token
        const myBody = JSON.stringify({
            // email: "rijipak673@v2ssr.com",
            // password: "password",
            email: email,
            password: password,
        });
        
        const myConfig = {
            method: "post",
            data: myBody,
        };
                
        // Fetch the data and save the token in the local storage
        try {
            await console.log(motionAPI("token/",myConfig))
            const response = (await motionAPI(myConfig)).data;
            console.log(response)
            const token = response.access;
            const user = response.user
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(updateUserData(JSON.stringify(user)))
            navigate("/")
            
        } catch (exception) {
            window.alert("Invalid credentials!")
        }
    }



    return(

        <DivStyled id="right">
                
            <header className="homepage-header">
                <div className="headerContainer">
                    <div className="sign-up-container">
                        <p> Don't have an account? </p>
                        <HomepageWhiteButton onClick={handleSignUp}>Sign up</HomepageWhiteButton>
                    </div>
                </div>
            </header>


            <div className="form">
                
                <form onSubmit={(event)=>event.preventDefault()}>

                    <div className="form-inputs">
                        <div className="form-title">Sign In</div>
                        <div className="input-email">
                            <img src={avatarIcon} alt="avatar icon" />
                            <input type="text" placeholder="Email" value={email} onChange={handleEmailChange}/>
                        </div>

                        <div className="input-password">
                            <img src={passwordIcon} alt="Lock icon" />
                            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                        </div>

                    </div>

                    <HomepagePurpleButton className="form-btn" onClick={handleSingIn}>Sign in</HomepagePurpleButton>
                
                </form>
                
            </div>
            
      </DivStyled>
    )
}

export default SignIn