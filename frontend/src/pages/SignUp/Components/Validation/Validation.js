import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import DivStyled from "../SignIn/SignIn.style"
import motionAPI from "../../../../axios/motionAPI";
import { HomepagePurpleButton } from "../../../../styles/StyledComponents/Button.style";


const Validation = () => {

    // const params = useParams()
    const email = useOutletContext()[0]

    //// controlled form
    // code
    const [code, setCode] = useState("");

    const handleCodeChange = event => {
         setCode(event.target.value);
    };
    
    // username
    const [username, setUsername] = useState("");
    
    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    // first name
    const [firstName, setFirstName] = useState("");
    
    const handleFirstNameChange = event => {
        setFirstName(event.target.value);
    };

    // last name
    const [lastName, setLastName] = useState("");

    const handleLastNameChange = event => {
        setLastName(event.target.value);
    };

    // password
    const [password, setPassword] = useState("");

    const handlePasswordChange = event => {
        setPassword(event.target.value);
    };

    // password repeat
    const [passwordRepeat, setPasswordRepeat] = useState("");

    const handlePasswordRepeatChange = event => {
        setPasswordRepeat(event.target.value);
    };

    // set the username for the first time
    useEffect(() => setUsername(email.slice(0,email.search("@"))), [])

    //// handle the button complete
    let flagCheck = false
    const navigate = useNavigate()
    const handleComplete = async() => {


        // check form
        flagCheck = true


        if (    (code === "") 
            ||  (username === "") 
            ||  (firstName === "") 
            ||  (lastName === "") 
            ||  (password === "") 
            ||  (passwordRepeat === "") ) {
            window.alert("Form incomplete!")
            return
            }
        if ( password !== passwordRepeat) {
            window.alert("Passwords not matching!")
            return
        }

        // Prepare the request for login in and getting the token
        const myBody = JSON.stringify({
            // email: "rijipak673@v2ssr.com",
            // password: "password",
            email: email,
            username: username,
            code: code,
            password: password,
            password_repeat: passwordRepeat,
            first_name: firstName,
            last_name: lastName
        });
        
        const myConfig = {
            method: "patch",
            data: myBody,
        };
                
        // Fetch the data and save the token in the local storage
        try {
            const response = (await motionAPI("auth/registration/validation/", myConfig)).data;
            localStorage.setItem("token","")
            navigate("/")
            
        } catch (exception) {
            console.log(exception)
            let message = ""
            if (exception.response.data.code) {
                if (exception.response.data.code[0] === 'This code is not valid!') { message = 'This code is not valid!\n'}
                if (exception.response.data.code[0] === 'This code has already been used!') { message = 'This code has already been used!\n'}
            }
            if (exception.response.data.username) {
                if (exception.response.data.username[0]  === 'This username is taken') { message += 'This username is taken'}
            } 
            if  (message==="") { message = "unknown error"}

            window.alert(message)
        }
    }



    return (
        <DivStyled id="right" step="step3">
            <header className="homepage-header">
                <div className="logo-container"></div>
                <div className="sign-in-container">
                </div>
            </header>
    
            <div className="form">
                <form onSubmit={(event) => event.preventDefault()}>
                    <div className="form-inputs">
                        <div className="form-title">Verification</div>
                        <div className="input-container">
                            
                            <div className="val-width">
                                <input className="input-code" type="text" placeholder="Validation Code" value={code} onChange={handleCodeChange}/>
                            </div>
                            <div>
                                <label className="email-and-user" for="email">Email</label>
                                <input type="text" className="name-and-pass" value={email} disabled={"disabled"}/>
                            </div>

                            <div>
                                <label for="username" className="email-and-user">Username</label>
                                <input id="username" className="name-and-pass" type="text" placeholder={username} value={username} onChange={handleUsernameChange}/>
                            </div>

                            <input className="name-and-pass" id="firstName" type="text" placeholder="First name" value={firstName} onChange={handleFirstNameChange}/>
                            <input className="name-and-pass" id="lastName" type="text" placeholder="Last name" value={lastName} onChange={handleLastNameChange}/>
                            <input className="name-and-pass" id="password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                            <input className="name-and-pass" id="passwordRepeat" type="password" placeholder="Password repeat" value={passwordRepeat} onChange={handlePasswordRepeatChange}/>
                        
                        </div>
                    </div>
        
                    <HomepagePurpleButton className="form-btn" onClick={handleComplete}>
                    Complete
                    </HomepagePurpleButton>

                </form>
    
                <div className="step-container">
                    <div className="step step1"></div>
                    <div className="step step2"></div>
                    <div className="step step3"></div>
                </div>
            </div>
        </DivStyled>
    
    
    )

}


export default Validation