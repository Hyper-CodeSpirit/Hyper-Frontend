import React, { useState } from 'react'
import "../authentication.scss"
import { GiF1Car } from "react-icons/gi";
import Banner from "../../../assets/images/register_banner.jpg";
import GoogleSignInBtn from '../../../components/google/GoogleSignInBtn';
import { AuthAPI } from '../../../api/auth/auth.api';

const LoginPage = () => {

      const authApi = new AuthAPI();

  const [formValues, setFormValues] = useState({
    email: "test@gmail.com",
    password: "123",
  }); 
  
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formValues);

      const response = await authApi.login(formValues);
      console.log(response);
      
    
  }
  
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

        <div className="alt-auths">
              <GoogleSignInBtn />
            </div>

            <div className="seperator">
            <div className="line"></div>
            <div className="text">Or</div>
            <div className="line"></div>

            </div>


            <div className="hyper-input-group">
            <input type="text" className='input-field' id="email" name='email' onChange={handleChange} value={formValues.email} required/>
            <label className='input-label' htmlFor='email'>Your email address<span>*</span></label>
            </div>

            <div className="hyper-input-group">
            <input type="password" className='input-field' id="password" name='passwrd' onChange={handleChange} value={formValues.password} required/>
            <label className='input-label' htmlFor='password'>Create Password<span>*</span></label>
            </div>

            <div className="hyper-checkbox-input">
            <button className='hyper-button mt-3' type='submit' onClick={handleSubmit}>Sign Up</button>
            </div>

          </div>


      </div>
      <div className="right-container">
        <img src={Banner} alt="login" className="auth-image"/>
      </div>
      </div>
  )
}

export default LoginPage