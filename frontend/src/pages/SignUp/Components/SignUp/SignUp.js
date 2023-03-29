// import the parent styled component
import DivStyled from "../SignIn/SignIn.style";

// import the axios instance to fetch the token
import motionAPI from "../../../../axios/motionAPI";

// import the images used
import mailIcon from "../../../../assets/images/mail-icon.jpg"

// import useState to create controlled form
import { useState } from "react";

// import useNavigate to handle the button signUp
import { useNavigate, useOutletContext } from "react-router-dom";
import { HomepagePurpleButton, HomepageWhiteButton } from "../../../../styles/StyledComponents/Button.style";

const SignUp = () => {
  
  // see Home.js. Basically it return a set function (setEmailHome) associated to a state variable (emailHome)
  // it is used to pass the email to the next page in the process
  const setEmailHome = useOutletContext()[1];


  //// controlled form
  // email input
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  //// handle the button sign in
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/");
  };

  //// handle the button sign up
  const handleSingUp = async () => {
    // Prepare the request for login in and getting the token
    const myBody = JSON.stringify({
      email: email,
    });

    const myConfig = {
      method: "post",
      data: myBody,
    };

    // Fetch the data and save the token in the local storage
    try {
      setError("");
      const response = await motionAPI("backend/api/auth/registration/", myConfig);
      console.log(response)
      if (response.status === 201) {
        setEmailHome(email)
        navigate("/home/success/")
      }
    } catch (exception) {
      if (exception.response.data.email[0] === "This email is taken") {
        window.alert("This email is taken!");
      } else {
        setError("Error!");
      }
    }
  };


  return (
    <DivStyled id="right" step="step1">

      <header className="homepage-header">
        <div className="headerContainer">
          <div className="sign-in-container">
            <p> Already have an account? </p>
            <HomepageWhiteButton onClick={handleSignIn}>Sign in</HomepageWhiteButton>
          </div>
        </div>
      </header>


      <div className="form">
        <form onSubmit={(event) => event.preventDefault()}>
          <div className="form-inputs">
            <div className="form-title">Sign Up</div>
            <div className="input-email">
              <img src={mailIcon} alt="email icon" />
              <input type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
            </div>
          </div>

          <HomepagePurpleButton className="form-btn" onClick={handleSingUp}>Sign up</HomepagePurpleButton>
        </form>
        <span>{error}</span>

        <div className="step-container">
          <div className="step step1"></div>
          <div className="step step2"></div>
          <div className="step step3"></div>
        </div>
      </div>
    </DivStyled>
  );
};


export default SignUp;
