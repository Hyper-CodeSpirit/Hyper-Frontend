import React from 'react'
import "../authentication.scss"
import { GiF1Car } from "react-icons/gi";
import Banner from "../../../assets/images/register_banner.jpg";
import GoogleIcon from "../../../assets/icons/google.png";

const RegisterPage = () => {
  return (
    <div className='container auth-container'>
      <div className="left-container">
        <div className="header">
          <GiF1Car className="header-icon" />
          <div className='header-text'>AutoShop</div>
        </div>

        <div className="sub-header">
          <div className="title">Register your account</div>
          <div className="sub-title">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam?</div>
        </div>

        <div className="form-group register-form">
        <div className="hyper-input-group">
            <input type="text" className='input-field' id="name" autoFocus required/>
            <label className='input-label' htmlFor='name'>Name<span>*</span></label>
            </div>

            <div className="hyper-input-group">
            <input type="text" className='input-field' id="email" required/>
            <label className='input-label' htmlFor='email'>Your email address<span>*</span></label>
            </div>

            <div className="hyper-input-group">
            <input type="text" className='input-field' id="password" required/>
            <label className='input-label' htmlFor='password'>Create Password<span>*</span></label>
            </div>

            <div className="hyper-input-group">
            <input type="text" className='input-field' id="confirm-password" required/>
            <label className='input-label' htmlFor='confirm-password'>Re-Enter Password<span>*</span></label>
            </div>

            <div className="hyper-checkbox-input">
            <input type="checkbox" className='agreement-input-field' id="confirm-password" required/>
            <label className='agreement-input-label' htmlFor='confirm-password'>I agree to all terms, and privacy policy</label>
            </div>

            <div className="hyper-checkbox-input">
            <button className='hyper-button mt-3'>Sign Up</button>
            </div>

            <div className="seperator">
            <div className="line"></div>
            <div className="text">Or</div>
            <div className="line"></div>

            </div>

            <div className="alt-auths">
              <div className="alt-auth">
                <img src={GoogleIcon} alt="google-logo"/>
                <div className="text">Sign up with Google</div>
              </div>
            </div>
          </div>


      </div>
      <div className="right-container">
        <img src={Banner} alt="register" className="auth-image"/>
      </div>
      </div>
  )
}

export default RegisterPage