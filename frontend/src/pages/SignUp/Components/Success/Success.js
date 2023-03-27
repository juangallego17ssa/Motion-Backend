import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { HomepagePurpleButton } from "../../../../styles/StyledComponents/Button.style"
import DivStyled from "../SignIn/SignIn.style"
import successIcon from "../../../../assets/images/successIcon.png"

const Success = () => {

    // const params = useParams()
    const email = useOutletContext()[0]

    const navigate = useNavigate()

    const handleContinue = () => {
        navigate(`/home/validation/`)
    //  navigate(`/home/validation/${params.email}`)
    }

    return (


        <DivStyled id="right" step="step2">
        <header className="homepage-header">
          <div className="headerContainer">
            <div className="logo-container"></div>
            <div className="sign-in-container"></div>
          </div>
        </header>
  
        <div className="form">
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="form-inputs">
              <div className="form-title">Congratulations</div>
              <div className="success-icon"><img src={successIcon} alt="check icon" /></div>
              <div className="success-message">
                <span>We’ve sent a confirmation code to your email {email}</span>
              </div>
            </div>
  
            <HomepagePurpleButton className="form-btn" onClick={handleContinue}>Continue</HomepagePurpleButton>
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


export default Success